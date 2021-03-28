import { action, observable } from 'mobx';
import { createContext } from 'react';
import agent from '../api/agent';
import { ITest } from '../models/test';

class TestStore {
  @observable tests: ITest[] = [];
  @observable loadingInitial = false;

  @action loadTests = () => {
    this.loadingInitial = true;

    agent.Tests.list()
      .then(tests => {
        tests.forEach((test) => {
          this.tests.push(test);
        })
      })
      .finally(() => this.loadingInitial = false);
  }
}

export default createContext(new TestStore());