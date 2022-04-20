import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Header from '../Components/Header';

describe('Test Header render', () => {
  test('Test Header', () => {
    const tree = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(tree).toMatchSnapshot();
  });
});