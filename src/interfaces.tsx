import { FormEvent, MouseEvent, DragEvent } from 'react';

export interface IUpdateState {
  isUpdate: boolean,
  id: string,
  title: string,
  background?: string,
}

export interface IModal {
  handleModal: (e: MouseEvent | FormEvent | KeyboardEvent) => void;
  updateState: IUpdateState;
}

export interface ICard {
  id: string;
  title: string;
  BoardId: string;
}

export interface BoardPageModal {
  handleModal: (e: MouseEvent | FormEvent | KeyboardEvent) => void;
  BoardId: string;
  updateState: IUpdateState
}

export interface IUser {
  id: '';
  login: string;
  email?: string;
  avatar?: string;
}

export interface IUpdUserModal {
  handleModal: (e: MouseEvent | FormEvent | KeyboardEvent) => void;
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
  BoardId: string;
}

export type ITaskMap = { [n: string]: Array<ITask> };
export interface IState {
  user: IUser;
  boards: Array<IBoard>;
  cards: Array<ICard>;
  tasks: ITaskMap;
  currTask: ITask;
}

export interface ICardProps {
  card: ICard;
  editCard: (id: string) => void;
}

export interface ITaskProps {
  task: ITask;
  dragStartHandler: (e: DragEvent<HTMLLIElement>, task: ITask) => void
  dragLeavetHandler: (e: DragEvent<HTMLLIElement>) => void
  dragEndHandler: (e: DragEvent<HTMLLIElement>) => void
  dragOverHandler: (e: DragEvent<HTMLLIElement>) => void
  dropHandler: (e: DragEvent<HTMLLIElement>, task: ITask) => void
}

export type TemplateSize = 'small' | 'medium' | 'big';

export interface IParentModal {
  deleteTask?: () => Promise<void>;
  handleModal: (e: MouseEvent | FormEvent) => void;
}

export interface IModalEdit {
  handleModal: (e: MouseEvent | FormEvent | KeyboardEvent) => void;
  task: ITask;
}

export interface IModalError {
  message: string;
  handleModal: (e: MouseEvent | FormEvent) => void;
}

export interface IModalKeys {
  handleModal: (e: MouseEvent | FormEvent | KeyboardEvent) => void;
}

export interface IAvatars {
  dog: string,
  sloth: string,
  pufferFish: string,
  penguin: string,
  shark: string,
  reindeer: string,
}
