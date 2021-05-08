import axios, { AxiosResponse } from 'axios';
import { history } from '../..';
import { ITest } from '../models/test'

axios.defaults.baseURL = 'http://localhost:34565/api';

axios.interceptors.response.use(undefined, error => {
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push('/notfound');
  }
  if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
    history.push('/notfound');
  }
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody)
}

const Tests = {
  list: (): Promise<ITest[]> => requests.get('/tests'),
  details: (id: string) => requests.get(`/tests/${id}`),
  create: (test: ITest) => requests.post('/tests', test),
  update: (test: ITest) => requests.put(`/tests/${test.id}`, test),
  delete: (id: string) => requests.del(`/tests/${id}`)
}

export default {
  Tests
}