import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../redux';
import { useSelector, shallowEqual } from 'react-redux';
import axios from 'axios';

export const Navbar = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user, shallowEqual);

  const onLogout = () => {
    axios
      .post('/auth/logout')
      .then((res) => {
        alert(res.data.message);
        dispatch(removeUser());
        props.history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className='navbar'>
      <div>
        <Link to='/'>Home</Link>
        &nbsp;
        {user ? (
          <>
            Signed in as {user.name}
            &nbsp;
            <button onClick={onLogout}>Logout</button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
