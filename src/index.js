import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import { Form } from './pages/Form/Form';
import reportWebVitals from './reportWebVitals';

render(
  <Form />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
