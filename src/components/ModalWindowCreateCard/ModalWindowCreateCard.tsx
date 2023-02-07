import React, { useState } from 'react';
import './ModalWindowCreateCard.scss';

// type DeskTitle = {
//   title: string;
// };

function ModalWindowCreateCard(): JSX.Element {
  const [title] = useState('');

  // function getTitle(ev: Event): void {
  //   if (ev.target !== null) {
  //     setTitle(ev.target.value);
  //   }
  // }

  return (
    <div className="add-card">
      <input
        className="add-card__input"
        type="text"
        value={title}
        // onChange={(ev) => getTitle(ev)}
        placeholder="Add title"
      />
      {/* <button disabled={title.length === 0} onClick={saveCard}>Create</button> */}
    </div>
  );
}

export default ModalWindowCreateCard;
