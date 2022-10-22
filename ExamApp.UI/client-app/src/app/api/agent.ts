import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { IQuestion } from '../models/question';
import { ITest } from '../models/test'
import { IUser, IUserFormValues } from '../models/user';

axios.defaults.baseURL = 'http://localhost:34565/api';

axios.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('jwt');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(undefined, error => {
  if (error.message === 'Network Error' && !error.response) {
    toast.error('Network error - make sure API is running!');
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push('/notfound');
  }
  if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
    history.push('/notfound');
  }
  if (status === 500) {
    toast.error('Server error - check the terminal for more info');
  }

  throw error.response;
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

const User = {
  current: (): Promise<IUser> => requests.get('/user'),
  login: (user: IUserFormValues): Promise<IUser> => requests.post('/user/login', user),
  register: (user: IUserFormValues): Promise<IUser> => requests.post('/user/register', user)
}

const Questions = {
  list: (testId: string): Promise<IQuestion[]> => requests.get(`/questions/${testId}`),
  create: (question: IQuestion) => requests.post('/questions', question),
  update: (question: IQuestion) => requests.put(`/questions/${question.id}`, question),
  delete: (id: string) => requests.del(`/questions/${id}`)
}

export default {
  Tests, User, Questions
}