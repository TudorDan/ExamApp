export interface IQuestion {
    id: string;
    content: string;
    testId: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: number;
}

export class QuestionFormValues implements Partial<IQuestion> {
    id?: string = undefined;
    content: string = '';
    testId?: string = undefined;
    answer1: string = '';
    answer2: string = '';
    answer3: string = '';
    answer4: string = '';
    correctAnswer: number = undefined!;

    constructor(init?: IQuestion) {
        Object.assign(this, init);
    }
}