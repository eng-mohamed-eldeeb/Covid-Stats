import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import configureStore from 'redux-mock-store';
import Home from '../Components/Home';

const contriesArr = [
  {
    id: 'afghanistan',
    name: 'Afghanistan',
    today_confirmed: 164727,
  },
  {
    id: 'egypt',
    name: 'Egypt',
    today_confirmed: 124557,
  },
];

const totalConfirmed = 387014569;

describe('Test Home component', () => {
  test('Test render Home component and mocking the store to test countries rendering', () => {
    const initialState = {
      loading: 'success',
      data: {
        countriesArr: [...contriesArr],
        totalConfirmed,
      },
    };

    const applyMiddleware = [thunk, logger];
    const mockingStore = configureStore(applyMiddleware);
    const store = mockingStore({ allCountries: initialState });

    const tree = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
    const countryListItem = screen.getAllByTestId('countryListItem');
    expect(countryListItem).toHaveLength(2);
  });
});