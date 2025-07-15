import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: '#333',
        display: 'flex',
        justifyContent: 'center',
        padding: '10px'
      }}
    >
      <Link
        to="/"
        style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}
      >
        Home
      </Link>
      <Link
        to="/about"
        style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}
      >
        About
      </Link>
      <Link
        to="/services"
        style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}
      >
        Services
      </Link>
      <Link
        to="/contact"
        style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}
      >
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;

