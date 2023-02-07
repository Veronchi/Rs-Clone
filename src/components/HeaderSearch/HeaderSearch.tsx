import React from 'react';
import { Form } from 'react-bootstrap';
import './HeaderSearch.scss';

const HeaderSearch = (): JSX.Element => (
  <Form className="search-form">
    <Form.Control className="search-form__input" type="text" placeholder="Search" />
  </Form>

);

export default HeaderSearch;
