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

export interface IQuestionFormValues {
    content: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: number;
}

export class QuestionFormValues implements IQuestionFormValues {
    id?: string = undefined;
    content: string = '';
    answer1: string = '';
    answer2: string = '';
    answer3: string = '';
    answer4: string = '';
    correctAnswer: number = undefined!;

    constructor(init?: IQuestionFormValues) {
        Object.assign(this, init);
    }
}