import React from 'react';

export interface IModal {
  show: boolean;
  handleModal: (e: React.MouseEvent) => void;
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
