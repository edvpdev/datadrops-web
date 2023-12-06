import axios, { AxiosError, AxiosResponse } from 'axios';
import https from 'https';
import {
  ICreateSynchronizationPayload,
  IProvider,
  IProviderWithStatus,
  ISynchronization,
  SynchronizationsOverview
} from '../types';

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
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
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
    console.log('in getAllSynchronizationsForUser', providers);
    return requests.get<SynchronizationsOverview>(
      `/integrations/synchronizations?providers=${providers}`,
      user
    );
  },
  runSynchronization: (
    user: AxiosUserCredentials,
    payload: ICreateSynchronizationPayload
  ) => {
    console.log('in runSynchronization', payload);
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
    console.log('in getAllProviders');
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
    console.log('in getEntities');
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
