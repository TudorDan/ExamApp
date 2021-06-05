import { action, makeAutoObservable, observable, configure, runInAction, computed } from 'mobx';
import { createContext } from 'react';
import agent from '../api/agent';
import { ITest } from '../models/test';
import { history } from '../..';
import { toast } from 'react-toastify';

configure({ enforceActions: 'always' });

class TestStore {
  @observable testRegistry = new Map();
  @observable test: ITest | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;

  @computed get testsUnsorted() {
    return Array.from(this.testRegistry.values());
  }

  @action loadTests = async () => {
    this.loadingInitial = true;
    try {
      const tests = await agent.Tests.list();

      runInAction(() => {
        tests.forEach(test => {
          test.creation = new Date(test.creation);

          this.testRegistry.set(test.id, test);
        });

        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });

      console.log(error);
    }
  }

  @action loadTest = async (id: string) => {
    let test = this.getTest(id);

    if (test) {
      this.test = test;

      return test;
    } else {
      this.loadingInitial = true;

      try {
        test = await agent.Tests.details(id);

        runInAction(() => {
          test.creation = new Date(test.creation);

          this.test = test;
          this.testRegistry.set(test.id, test);
          this.loadingInitial = false;
        });

        return test;
      } catch (error) {
        runInAction(() => {
          this.loadingInitial = false;
        });

        console.log(error);
      }
    }
  }

  @action clearTest = () => {
    this.test = null;
  }

  getTest = (id: string) => {
    return this.testRegistry.get(id);
  }

  @action createTest = async (test: ITest) => {
    this.submitting = true;
    try {
      await agent.Tests.create(test);

      runInAction(() => {
        this.testRegistry.set(test.id, test);

        this.submitting = false;
      });

      history.push(`/tests/${test.id}`);
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });

      toast.error('Problem submitting data');
      console.log(error.response);
    }
  }

  @action editTest = async (test: ITest) => {
    this.submitting = true;
    try {
      await agent.Tests.update(test);

      runInAction(() => {
        this.testRegistry.set(test.id, test);

        this.test = test;
        this.submitting = false;
      });

      history.push(`/tests/${test.id}`);
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });

      toast.error('Problem submitting data');
      console.log(error.response);
    }
  }

  @action deleteTest = async (id: string) => {
    this.submitting = true;
    try {
      await agent.Tests.delete(id);

      runInAction(() => {
        this.testRegistry.delete(id);

        this.submitting = false;
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });

      console.log(error);
    }
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default createContext(new TestStore());