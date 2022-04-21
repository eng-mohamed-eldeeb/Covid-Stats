import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Header from './Header';
import { getCountries } from '../Redux/asyncActions';

const Home = () => {
  const countries = useSelector((state) => state.allCountries.data);
  const loading = useSelector((state) => state.allCountries.loading);
  const dispatch = useDispatch();

  const [searchedCountries, setSearchedCountries] = useState([]);

  useEffect(() => {
    const abort = new AbortController();
    dispatch(getCountries(abort));
    return () => abort.abort();
  }, []);

  useEffect(() => {
    if (loading === 'success') setSearchedCountries(countries.countriesArr);
  }, [countries]);

  const searchHandler = (e) => {
    const value = e.target.value.toLowerCase();
    const list = countries.countriesArr.filter((country) => country.id.includes(value));
    setSearchedCountries(list);
  };

  if (!loading || loading === 'loading') return <Loading />;
  return (
    <div className="bg-[#5787E5]">
      <Header page="allCountries" />
      <section className="hero px-8 text-white h-[15rem] flex justify-center items-center gap-8">
        <i className="fas fa-globe-americas fa-6x text-[#2D4573]" />
        <div className="globalStats">
          <h2 className="text-4xl font-bold text-center">Global Cases</h2>
          <p className="text-lg text-center">
            {loading === 'success' && `${countries.totalConfirmed} Cases`}
          </p>
        </div>
      </section>
      <section className="countriesStats">
        <div className="flex justify-between items-center bg-[#35548B] py-[10px] px-4 text-white font-medium">
          <h2>Stats by country</h2>
          <div className="relative">
            <input
              type="text"
              onChange={searchHandler}
              name="searchBar"
              id="searchBar"
              placeholder="Search"
              className="rounded-2xl px-4 py-1 bg-[#5787E5] focus:outline-none placeholder:text-white text-lg w-[200px]"
            />
            <i className="fas fa-search absolute right-[10px] top-[10px]" />
          </div>
        </div>
        <div className="countriesContainer min-h-[500px]">
          {searchedCountries.length === 0 && (
            <div className="text-white text-center pt-20 text-2xl font-bold">
              No Matched Countries
            </div>
          )}
          <ul className="grid grid-cols-2 justify-items-end text-right">
            {searchedCountries.map((country) => (
              <li key={country.id} className="country w-full" data-testid="countryListItem">
                <Link to={country.name} className="w-full p-4 text-white grid">
                  <i className="far fa-arrow-alt-circle-right fa-lg" />
                  <i className="fas fa-map-marker-alt fa-5x text-[#2D4573] justify-self-center" />
                  <h2 className=" text-xl font-bold">{country.name}</h2>
                  <p>{`${country.today_confirmed} Cases`}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
