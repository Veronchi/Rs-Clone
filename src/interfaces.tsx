import { FormEvent, MouseEvent } from 'react';

export interface IModal {
  show: boolean;
  handleModal: (e: MouseEvent | FormEvent) => void;
}

export interface ITask {
  key: number,
  name: string;
}

export interface ICard {
  id: number;
  title: string;
  order: number;
  tasks: ITask[];
}

export interface CardProps {
  card: ICard;
  onDragStart: (ev: React.DragEvent<HTMLDivElement>, card: ICard) => void;
  onDragLeave: (ev: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (ev: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (ev: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (ev: React.DragEvent<HTMLDivElement>, card: ICard) => void;
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
