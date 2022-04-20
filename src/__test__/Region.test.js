import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import configureStore from 'redux-mock-store';
import Region from '../Components/Region';

const regions = [
  {
    id: 'tasmania',
    name: 'Tasmania',
    today_confirmed: 31967,
  },
  {
    id: 'victoria',
    name: 'Victoria',
    today_confirmed: 889710,
  },
  {
    id: 'queensland',
    name: 'Queensland',
    today_confirmed: 896530,
  },
];

const today_confirmed = 2645825; // eslint-disable-line

describe('Test Region component', () => {
  test('Test render Region component and mocking the store to test Regions rendering', () => {
    const initialState = {
      loading: 'success',
      data: {
        regions: [...regions],
        today_confirmed,
      },
    };

    const applyMiddleware = [thunk, logger];
    const mockingStore = configureStore(applyMiddleware);
    const store = mockingStore({ region: initialState });

    const tree = render(
      <Provider store={store}>
        <BrowserRouter>
          <Region />
        </BrowserRouter>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
    const regionListItem = screen.getAllByTestId('regionListItem');
    expect(regionListItem).toHaveLength(3);
  });
});