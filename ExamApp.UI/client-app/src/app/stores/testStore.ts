import { action, makeAutoObservable, observable, configure, runInAction, computed } from 'mobx';
import { createContext } from 'react';
import agent from '../api/agent';
import { ITest } from '../models/test';

configure({enforceActions: 'always'});

class TestStore {
  @observable testRegistry = new Map();
  @observable selectedTest: ITest | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
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

  @action createTest = async (test: ITest) => {
    this.submitting = true;

    try {
      await agent.Tests.create(test);

      runInAction(() => {
        this.testRegistry.set(test.id, test);
  
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      console.log(error);
    }
  }

  @action editTest = async (test: ITest) => {
    this.submitting = true;

    try {
      await agent.Tests.update(test);

      runInAction(() => {
        this.testRegistry.set(test.id, test);
  
        this.selectedTest = test;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      console.log(error);
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

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedTest = undefined;
  }

  @action openEditForm = (id: string) => {
    this.selectedTest = this.testRegistry.get(id);
    this.editMode = true;
  }

  @action cancelSelectedTest = () => {
    this.selectedTest = undefined;
  }

  @action cancelFormOpen = () => {
    this.editMode = false;
  }

  @action selectTest = (id: string) => {
    this.selectedTest = this.testRegistry.get(id);
    this.editMode = false;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default createContext(new TestStore());