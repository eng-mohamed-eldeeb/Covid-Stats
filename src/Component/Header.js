import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';

const Header = (props) => {
  const { page, country } = props;
  const date = DateTime.local().toFormat('yyyy');
  return (
    <>
      {page === 'allCountries' && (
        <header className="header px-4 bg-[#4369B2]">
          <nav className="nav h-[50px] text-white flex justify-between items-center font-medium">
            <h2>{date}</h2>
            <h2>Global Covid 19 Stats</h2>
            <div className="flex gap-4">
              <i className="fas fa-microphone" />
              <i className="fas fa-cog" />
            </div>
          </nav>
        </header>
      )}
      {page === 'region' && (
        <header className="header px-4 bg-[#4369B2]">
          <nav className="nav h-[50px] text-white flex justify-between items-center font-medium ">
            <Link to="/" className="flex gap-2 items-center">
              <i className="fas fa-chevron-left" />
              <h2>Global</h2>
            </Link>
            <h2>{`${country} Stats`}</h2>
            <div className="flex gap-4">
              <i className="fas fa-microphone" />
              <i className="fas fa-cog" />
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

Header.defaultProps = {
  page: '',
  country: '',
};

Header.propTypes = {
  page: PropTypes.string,
  country: PropTypes.string,
};

export default Header;
