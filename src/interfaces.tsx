import { FormEvent, MouseEvent } from 'react';

export interface IModal {
  show: boolean;
  handleModal: (e: MouseEvent | FormEvent) => void;
}

export type Task = {
  key: number,
  name: string;
};
export interface ICard {
  id: string;
  title: string;
  boardId: string;
  // tasks: Task[]
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
  id: string;
  title: string;
  background: string;
}

export interface ITask {
  id: string;
  text: string;
  ColumnId: string;
}

export interface IState {
  users: IUser;
  boards: Array<IBoard>;
  cards: Array<ICard>;
  tasks: Array<ITask>;
}

export interface ICardProps {
  card: ICard;
}

export interface ITaskProps {
  task: ITask;
}
