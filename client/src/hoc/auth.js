/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';

export default function uth(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      // To know my current status, send Auth request
      dispatch(auth()).then((response) => {
        // Not Loggined in Status
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push('/login');
          }
          // Loggined in Status
        } else if (
          (adminRoute && !response.payload.isAdmin) ||
          option === false
        ) {
          // supposed to be Admin page, but not admin person wants to go inside
          // Logged in Status, but Try to go into log in page
          props.history.push('/');
        }
      });
    }, []);

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
