import { makeAutoObservable, runInAction } from "mobx";
import { ReactNode } from "react";

interface Modal {
  id: string;
  content: ReactNode | React.ComponentType<any>;
}

class ModalStore {
  modals: Modal[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  show(content: ReactNode | React.ComponentType<any>, id: string) {
    runInAction(() => {
      this.modals.push({ id, content });
    })
    return id;
  }

  hide(id: string) {
    this.modals = this.modals.filter((m) => m.id !== id);
  }

  hideAll() {
    this.modals = [];
  }
}

export const modalStore = new ModalStore();
