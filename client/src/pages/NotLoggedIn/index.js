import { React, useState, useEffect } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

// This page returns if you attempt to reach a non-existing route
function NotLoggedIn() {

  const [timer, setTimer] = useState(10)

  useEffect(() => {
    const redirectTimer = setInterval(() => {
      setTimer(time => time - 1)
    }, 1000);
    return () => { clearInterval(redirectTimer) }
  }, [])

  return (
    <>
      {
        timer < 0
          ? <Redirect to="/" />
          : (
            <div className="Error-404">
              <Jumbotron>
                <h3>You are currently not logged in.</h3>
                <h4>You will be Redirected in...<span id="time">{timer}</span></h4>
                <div style={{ fontSize: `${30}rem`, color: 'red' }}>!?</div>
              </Jumbotron>
            </div>
          )
      }
    </>
  );
}

export default NotLoggedIn;
