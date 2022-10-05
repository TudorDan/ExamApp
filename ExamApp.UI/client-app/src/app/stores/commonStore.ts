import { action, makeAutoObservable, observable, reaction } from "mobx";
import { RootStore } from "./rootStore";

export default class CommmonStore {
    rootStore: RootStore;

    /**
     * Handles state management of JWTs across the app
     */
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this); // adaptation for MobX v.6

        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        );
    }

    @observable token: string | null = window.localStorage.getItem('jwt');
    @observable appLoaded = false;

    @action setToken = (token: string | null) => {
        this.token = token;
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
}