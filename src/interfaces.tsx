import React from 'react';

export interface IModal {
  show: boolean;
  handleModal: (e: React.MouseEvent) => void;
}

export interface ICard {
  id: number;
  title: string;
  tasks: {
    task: string[];
  }
}
