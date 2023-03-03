import { Outlet, NavLink, useLocation } from 'react-router-dom';

import './appHeader.scss';

export const AppHeader = () => {
  const location = useLocation();
  console.log(location);

  return (
    <>
      <header className="app__header">
        <h1 className="app__title">
          <NavLink to="/">
            <span>Marvel</span> information portal
          </NavLink>
        </h1>
        <nav className="app__menu">
          <ul style={{ gap: 20 }}>
            <NavLink className="navLink" to="/" end>
              Characters
            </NavLink>
            <NavLink
              className="navLink"
              to="/comics"
              state={{ from: location }}
            >
              Comics
            </NavLink>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default AppHeader;
