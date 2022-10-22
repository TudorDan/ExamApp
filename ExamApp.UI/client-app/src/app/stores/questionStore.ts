import { action, computed, makeAutoObservable, observable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../api/agent";
import { IQuestion } from "../models/question";
import { RootStore } from "./rootStore";

export default class QuestionStore {
    rootStore: RootStore;
    /**
     * Makes the rootStore accessible here
     */
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this); // adaptation for MobX v.6
    }

    @observable questionRegistry = new Map();
    @observable question: IQuestion | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;

    @computed get questionsUnsorted() {
        return Array.from(this.questionRegistry.values());
    }

    @action loadQuestions = async (testId: string) => {
        this.loadingInitial = true;
        try {
            const questions = await agent.Questions.list(testId);

            runInAction(() => {
                questions.forEach(question => {
                    this.questionRegistry.set(question.id, question);
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

    @action createQuestion = async (question: IQuestion) => {
        this.submitting = true;
        try {
            await agent.Questions.create(question);

            runInAction(() => {
                this.questionRegistry.set(question.id, question);

                this.submitting = false;
            });

            history.push(`/questions/${question.testId}`);
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            });

            toast.error('Problem submitting data');
            console.log(error.response);
        }
    }

    @action editQuestion = async (question: IQuestion) => {
        this.submitting = true;
        try {
            await agent.Questions.update(question);

            runInAction(() => {
                this.questionRegistry.set(question.id, question);

                this.question = question;
                this.submitting = false;
            });

            history.push(`/questions/${question.testId}`);
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            })

            toast.error('Problem submitting data');
            console.log(error.response);
        }
    }

    @action deleteQuestion = async (id: string) => {
        this.submitting = true;
        try {
            await agent.Questions.delete(id);

            runInAction(() => {
                this.questionRegistry.delete(id);

                this.submitting = false;
            });
        } catch (error) {
            runInAction(() => {
                this.submitting = false;
            });

            console.log(error);
        }
    }
}