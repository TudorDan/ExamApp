import { configure, makeAutoObservable } from "mobx";
import { createContext } from "react";
import CommmonStore from "./commonStore";
import TestStore from "./testStore";
import UserSore from "./userStore";

configure({ enforceActions: 'always' });

export class RootStore {
    testStore: TestStore;
    userStore: UserSore;
    commonStore: CommmonStore;

    /**
     * Creates a MobX store for multiple domain stores
     */
    constructor() {
        this.testStore = new TestStore(this);
        this.userStore = new UserSore(this);
        this.commonStore = new CommmonStore(this);
        makeAutoObservable(this); // adaptation for MobX v.6
    }
}

export const RootStoreContext = createContext(new RootStore());