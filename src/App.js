import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from './components/register';
import Users from './components/users';

function App() {
  const [ conditionalRender, setConditionalRender ] = useState(undefined);

  return (
    <div>
      <Container>
        <h2>My Assignment</h2>
        <p>Click on the button to view the particular assignment.</p>
        <Button onClick={() => setConditionalRender("register")}>
          Assignment 1 Register
        </Button>
        <Button onClick={() => setConditionalRender("users")} style={{ marginLeft: '30px' }}>
          Assignment 2 Users
        </Button>

        {(conditionalRender === "register") ? <Register /> : (conditionalRender === "users") ? <Users /> : null}
      </Container>
    </div>
  );
}

export default App;
