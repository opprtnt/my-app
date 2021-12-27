import { NavLink } from 'react-router-dom';
import './scss/Breadcrumbs.scss';

let active = ' ';

export default function Breadcrumbs(props) {
  const navLink = props.crumbs.map((crumb, i) => {
    i === props.crumbs.length - 1 ? (active = 'active') : (active = ' ');
    return (
      <NavLink className={'nav__link ' + active} to={crumb.to} key={i}>
        {crumb.name}
      </NavLink>
    );
  });

  return <nav className="nav">{navLink}</nav>;
}
