export interface ITest {
  id: string;
  title: string;
  description: string;
  category: string;
  creation: Date;
}

export interface ITestFormValues extends Partial<ITest> {
  time?: Date;
}

export class TestFormValues implements ITestFormValues {
  id?: string = undefined;
  title: string = '';
  description: string = '';
  category: string = '';
  creation?: Date = undefined;
  time?: Date = undefined;

  constructor(init?: ITestFormValues) {
    if (init && init.creation) {
      init.time = init.creation;
    }
    Object.assign(this, init);
  }
}