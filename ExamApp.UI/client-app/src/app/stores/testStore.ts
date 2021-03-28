import { action, makeAutoObservable, observable } from 'mobx';
import { createContext } from 'react';
import agent from '../api/agent';
import { ITest } from '../models/test';

class TestStore {
  @observable tests: ITest[] = [];
  @observable loadingInitial = false;

  @action loadTests = async () => {
    this.loadingInitial = true;

    try {
      const tests = await agent.Tests.list();

      tests.forEach(test => {
        this.tests.push(test);
      })
      this.loadingInitial = false;
    } catch (error) {
      console.log(error);
      this.loadingInitial = false;
    }
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default createContext(new TestStore());