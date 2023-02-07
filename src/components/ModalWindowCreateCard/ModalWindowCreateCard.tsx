import React, { useState } from 'react';
import './ModalWindowCreateCard.scss';

type DeskTitle = {
  title: string;
};

function ModalWindow(): JSX.Element {
  const [title, setTitle] = useState('');

  return (
    <div className="test">
      <form>

      </form>
    </div>
  );
}
