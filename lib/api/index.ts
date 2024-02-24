import axios, { AxiosError, AxiosResponse } from 'axios';
import https from 'https';
import {
  ICreateSynchronizationPayload,
  IJnataQuery,
  IJnataQueryCreatePayload,
  IProviderWithStatus,
  ISynchronization,
  ITemplate,
  IView,
  IViewCreatePayload,
  SynchronizationsOverview
} from '../types';
import { customLog } from '@/actions/customLog.action';

axios.defaults.baseURL = process.env.BACKEND_URL!;
if (process.env.NODE_ENV === 'development') {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false
  });
  axios.defaults.httpsAgent = httpsAgent;
}

type AxiosUserCredentials = {
  id: string;
  type: string;
};

axios.interceptors.request.use((config) => {
  config.headers.serviceKey = process.env.SERVICE_KEY!;
  customLog.info('Axios request', {
    type: 'axios',
    path: config.url,
    method: config.method,
    userId: config.headers.id
  });
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    customLog.info('Axios response', {
      type: 'axios',
      path: response.config.url,
      method: response.config.method,
      status: response.status,
      userId: response.config.headers.id
    });
    return response;
  },
  (error: AxiosError) => {
    customLog.error('Axios error', {
      type: 'axios',
      path: error.config?.url,
      method: error.config?.method,
      message: error.message,
      status: error.response?.status,
      userId: error.config?.headers.id
    });
    const { data, status, config } = error.response as AxiosResponse;
    return Promise.reject({
      status,
      message: data.message
    });
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, user: AxiosUserCredentials) =>
    axios
      .get<T>(url, {
        headers: {
          id: user.id,
          type: user.type
        }
      })
      .then(responseBody),
  post: <T>(url: string, user: AxiosUserCredentials, body: any) =>
    axios
      .post<T>(
        url,
        {
          ...body
        },
        {
          headers: {
            id: user.id,
            type: user.type
          }
        }
      )
      .then(responseBody),
  put: <T>(url: string, user: AxiosUserCredentials, body: any) =>
    axios
      .put<T>(
        url,
        {
          ...body
        },
        {
          headers: {
            id: user.id,
            type: user.type
          }
        }
      )
      .then(responseBody),
  del: <T>(url: string, user: AxiosUserCredentials) =>
    axios
      .delete<T>(url, {
        headers: {
          id: user.id,
          type: user.type
        }
      })
      .then(responseBody)
};

const Synchronizations = {
  getAllSynchronizationsForUser: (
    user: AxiosUserCredentials,
    providers: string
  ) => {
    return requests.get<SynchronizationsOverview>(
      `/integrations/synchronizations?providers=${providers}`,
      user
    );
  },
  runSynchronization: (
    user: AxiosUserCredentials,
    payload: ICreateSynchronizationPayload
  ) => {
    return requests.post<ISynchronization>(
      `/integrations/synchronizations`,
      user,
      payload
    );
  },
  deleteSynchronization: (user: AxiosUserCredentials, id: string) => {
    return requests.del<void>(`/integrations/synchronizations/${id}`, user);
  }
};

const Providers = {
  getAllProviders: (user: AxiosUserCredentials) => {
    return requests.get<IProviderWithStatus[]>('/integrations/providers', user);
  },
  disconnect: (user: AxiosUserCredentials, provider: string) => {
    return requests.post<void>(
      `/integrations/providers/disconnect?provider=${provider}`,
      user,
      {}
    );
  }
};

const Entities = {
  getEntitiesMinified: (
    user: AxiosUserCredentials,
    provider: string,
    entityLabel: string,
    limit: string
  ) => {
    return requests.get<any[]>(
      `/integrations/entities/mini/${provider}/${entityLabel}?limit=${limit}`,
      user
    );
  },
  getTemplates: (
    user: AxiosUserCredentials,
    provider: string,
    entityLabel: string
  ) => {
    return requests.get<ITemplate[]>(
      `/integrations/entities/templates/${provider}/${entityLabel}`,
      user
    );
  },
  getAggregatedData: (
    user: AxiosUserCredentials,
    entityLabel: string,
    templateKey: string,
    page: string
  ) => {
    return requests.get<ITemplate[]>(
      `/integrations/entities/aggregation/${entityLabel}/${templateKey}?page=${page}`,
      user
    );
  },
  deleteAllData: (user: AxiosUserCredentials, provider: string) => {
    return requests.post<void>(
      `/integrations/entities/delete-all-data?provider=${provider}`,
      user,
      {}
    );
  }
};

const Accounts = {
  deleteAccount: (user: AxiosUserCredentials) => {
    return requests.del<void>(`/accounts/delete-account`, user);
  },
  deleteAccountsData: (user: AxiosUserCredentials) => {
    return requests.del<void>(`/accounts/delete-data`, user);
  }
};

const Views = {
  getAllViews: (
    user: AxiosUserCredentials,
    providerId: string,
    entityLabel: string
  ) => {
    return requests.get<IView[]>(
      `/data/views?providerId=${providerId}&entityLabel=${entityLabel}`,
      user
    );
  },
  getAggregatedViewData: (
    user: AxiosUserCredentials,
    viewId: string,
    page: string
  ) => {
    return requests.get<any[]>(
      `/data/views/aggregate/${viewId}?page=${page}`,
      user
    );
  },
  getAggregatedViewDataFile: (user: AxiosUserCredentials, viewId: string) => {
    return requests.get<any[]>(`/data/views/download/${viewId}`, user);
  },
  createView: (user: AxiosUserCredentials, payload: IViewCreatePayload) => {
    return requests.post<IView>(`/data/views`, user, payload);
  },
  updateView: (
    user: AxiosUserCredentials,
    viewId: string,
    payload: IViewCreatePayload
  ) => {
    return requests.put<IView>(`/data/views/${viewId}`, user, payload);
  },
  deleteView: (user: AxiosUserCredentials, id: string) => {
    return requests.del<string>(`/data/views/${id}`, user);
  }
};

const JnataQueries = {
  getAllJnataQueries: (user: AxiosUserCredentials) => {
    return requests.get<IJnataQuery[]>(`/data/jnata-queries`, user);
  },
  createJnataQuery: (
    user: AxiosUserCredentials,
    payload: IJnataQueryCreatePayload
  ) => {
    return requests.post<IJnataQuery>(`/data/jnata-queries`, user, payload);
  }
};

export const agent = {
  Synchronizations,
  Providers,
  Entities,
  Accounts,
  Views,
  JnataQueries
};
