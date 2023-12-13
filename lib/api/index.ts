import axios, { AxiosError, AxiosResponse } from 'axios';
import https from 'https';
import {
  ICreateSynchronizationPayload,
  IProviderWithStatus,
  ISynchronization,
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
};

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
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
    // const { data, status, config } = error.response as AxiosResponse;
    // switch (status) {
    //   case 400:
    //     if (config.method === "get" && data.errors.hasOwnProperty("id")) {
    //       router.navigate("/not-found");
    //     }
    //     if (data.errors) {
    //       const modalStateErrors = [];
    //       for (const key in data.errors) {
    //         if (data.errors[key]) {
    //           modalStateErrors.push(data.errors[key]);
    //         }
    //       }
    //       throw modalStateErrors.flat();
    //     } else {
    //       toast.error(data);
    //     }
    //     break;
    //   case 401:
    //     toast.error("unauthorized");
    //     break;
    //   case 403:
    //     toast.error("forbidden");
    //     break;
    //   case 404:
    //     router.navigate("/not-found");
    //     break;
    //   case 500:
    //     store.commonStore.setServerError(data);
    //     router.navigate("/server-error");
    //     break;
    //   default:
    //     break;
    // }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, user: AxiosUserCredentials) =>
    axios
      .get<T>(url, {
        headers: {
          id: user.id
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
            id: user.id
          }
        }
      )
      .then(responseBody)
  //   post: <T>(url: string, body: {}) =>
  //     axios.post<T>(url, body).then(responseBody),
  //   put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  //   del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Synchronizations = {
  getAllSynchronizationsForUser: (
    user: AxiosUserCredentials,
    providers: string
  ) => {
    console.log(providers);
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
  }

  //   details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  //   create: (activity: Activity) => requests.post<void>("/activities", activity),
  //   update: (activity: Activity) =>
  //     axios.put<void>(`/activities/${activity.id}`, activity),
  //   delete: (id: string) => axios.delete<void>(`/activities/${id}`),
};

const Providers = {
  getAllProviders: (user: AxiosUserCredentials) => {
    return requests.get<IProviderWithStatus[]>('/integrations/providers', user);
  }
};

const Entities = {
  getEntitiesMinified: (
    user: AxiosUserCredentials,
    provider: string,
    entityLabel: string,
    limit: string
  ) => {
    return requests.get<IProviderWithStatus[]>(
      `/integrations/entities/mini/${provider}/${entityLabel}?limit=${limit}`,
      user
    );
  }
};

export const agent = {
  Synchronizations,
  Providers,
  Entities
};
