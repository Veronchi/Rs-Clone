import React from 'react';

export interface IModal {
  show: boolean;
  handleModal: (e: React.MouseEvent | React.FormEvent) => void;
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
