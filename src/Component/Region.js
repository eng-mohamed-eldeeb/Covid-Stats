import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getRegion } from '../Redux/asyncActions';
import Loading from './Loading';
import Header from './Header';

const Region = () => {
  const region = useSelector((state) => state.region.data);
  const loading = useSelector((state) => state.region.loading);
  const { country } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const abort = new AbortController();
    dispatch(getRegion(country, abort));
    return () => abort.abort();
  }, []);
  if (!loading || loading === 'loading') return <Loading />;
  return (
    <>
      <Header page="region" country={country} />
      <section className="hero px-8 bg-[#5787E5] text-white h-[15rem] flex justify-center items-center gap-8">
        <i className="fas fa-map-marked-alt fa-6x text-[#2D4573]" />
        <div className="CountryStats">
          <h2 className="text-4xl font-bold text-center">{region.name}</h2>
          <p className="text-lg text-center">
            {loading === 'success' && `${region.today_confirmed} Cases`}
          </p>
        </div>
      </section>
      <section className="countriesStats">
        <h2 className="bg-[#35548B] py-[4px] px-4 text-white font-medium">
          Stats by region
        </h2>
        <ul className="grid grid-cols-2 justify-items-end text-right bg-[#4972be]">
          {region.regions !== undefined && region.regions.map((region) => (
            <li
              key={region.id}
              className="country w-full grid p-4 text-white"
              data-testid="regionListItem"
            >
              <i className="far fa-arrow-alt-circle-right fa-lg" />
              <i className="fas fa-map-marker-alt fa-5x text-[#2D4573] justify-self-center" />
              <h2 className=" text-xl font-bold">{region.name}</h2>
              <p>{`${region.today_confirmed} Cases`}</p>
            </li>
          ))}
        </ul>
        {region.regions !== undefined && region.regions.length === 0 && (
          <div className="h-[calc(100vh-20rem)] bg-[#5787E5] text-white text-center pt-20 text-2xl font-bold">
            No Regional Data
          </div>
        )}
      </section>
    </>
  );
};

export default Region;
