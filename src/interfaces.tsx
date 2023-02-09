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
