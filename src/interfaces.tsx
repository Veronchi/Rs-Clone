import React from 'react';

export interface IModal {
  show: boolean;
  handleModal: (e: React.MouseEvent) => void;
}
