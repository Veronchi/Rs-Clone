import React from 'react';
import './HeaderSearch.scss';

function HeaderSearch(): JSX.Element {
  return (
    <form className="form form-outline">
      <input
        className="form-control"
        type="search"
        placeholder="Search"
      />
    </form>
  );
}

export default HeaderSearch;
