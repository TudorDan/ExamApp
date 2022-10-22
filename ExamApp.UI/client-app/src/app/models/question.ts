export interface IQuestion {
    id: string;
    content: string;
    testId: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: string;
}

export interface IQuestionFormValues {
    content: string;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    correctAnswer: string;
}