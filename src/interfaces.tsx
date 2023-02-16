import { FormEvent, MouseEvent } from 'react';

export interface IModal {
  show: boolean;
  handleModal: (e: MouseEvent | FormEvent) => void;
  boards: () => void
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

export type TemplateSize = 'small' | 'medium' | 'big';

export const templates = {
  small: {
    title: 'Small board',
    background: '#009900',
    cards: ['To do', 'Done'],
  },
  medium: {
    title: 'Medium board',
    background: '#000099',
    cards: ['To do', 'Doing', 'Done'],
  },
  big: {
    title: 'Big board',
    background: '#990000',
    cards: ['Backlog', 'To do', 'Doing', 'Done'],
  },
};
