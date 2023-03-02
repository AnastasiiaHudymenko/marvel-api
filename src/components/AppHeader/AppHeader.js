import { Outlet, NavLink } from 'react-router-dom';

import './appHeader.scss';

export const AppHeader = () => {
  return (
    <>
      <header className="app__header">
        <h1 className="app__title">
          <a href="facebook.com">
            <span>Marvel</span> information portal
          </a>
        </h1>
        <nav className="app__menu">
          <ul style={{ gap: 20 }}>
            <NavLink className="navLink" to="/">
              Characters
            </NavLink>
            <NavLink className="navLink" to="/comics">
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
