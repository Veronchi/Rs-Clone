import { FormEvent, MouseEvent } from 'react';

export interface IUpdateState {
  isUpdate: boolean,
  boardId: string,
  boardTitle: string,
}

export interface IModal {
  handleModal: (e: MouseEvent | FormEvent) => void;
  boards: () => void;
  updateState: IUpdateState;
}

export interface ICard {
  id: string;
  title: string;
  boardId: string;
}

export interface CardProps {
  card: ICard;
}

export interface BoardPageModal {
  show: boolean;
  handleModal: (e: MouseEvent | FormEvent) => void;
  BoardId: string;
  setCards: () => void;
}

export interface IUser {
  login: string;
  email?: string;
}

export interface IBoard {
  id: string;
  title: string;
  background: string;
}

export interface ITask {
  id: string;
  text: string;
  cover?: string;
  ColumnId: string;
}

export interface IState {
  user: IUser;
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

export interface IParentModal {
  show: boolean;
  handleModal: (e: MouseEvent | FormEvent) => void;
  handleParentModal: (e: MouseEvent | FormEvent) => void;
  task: ITask;
}

export interface IModalEdit {
  show: boolean;
  handleModal: (e: MouseEvent | FormEvent) => void;
  task: ITask;
}
