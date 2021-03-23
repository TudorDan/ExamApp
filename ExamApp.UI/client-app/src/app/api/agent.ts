import axios, { AxiosResponse } from 'axios';
import { ITest } from '../models/test'

axios.defaults.baseURL = 'http://localhost:34565/api';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
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