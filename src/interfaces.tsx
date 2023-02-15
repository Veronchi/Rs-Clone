import { FormEvent, MouseEvent } from 'react';

export interface IModal {
  show: boolean;
  handleModal: (e: MouseEvent | FormEvent) => void;
}

export interface IParentModal {
  show: boolean;
  handleModal: (e: MouseEvent | FormEvent) => void;
  handleParentModal: (e: MouseEvent | FormEvent) => void;
}

export type Task = {
  key: number,
  name: string;
};
export interface ICard {
  id: number;
  title: string;
  tasks: Task[]
}

export interface CardProps {
  card: ICard;
}

export interface BoardPageModal extends IModal {
  addCard: (card: ICard) => void;
}

export interface IUser {
  login: string;
  email?: string;
  password: string;
  isAuth: boolean;
}

export interface IBoard {
  title: string;
  background: string;
}
