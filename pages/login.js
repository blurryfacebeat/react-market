import React from 'react';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import axios from 'axios';
import catchErrors from '../utils/catchErrors';
import baseUrl from '../utils/baseUrl';
import { handleLogin } from '../utils/auth';

const INITIAL_USER = {
  email: "",
  password: "",
}

function Signup() {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit() {
    event.preventDefault();
    try {
      setLoading(true);
      setError('');
      const url = `${baseUrl}/api/login`;
      const payload = { ...user };
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <Message 
      icon="privacy"
      header="Добро пожаловать!"
      content="Войдите в аккаунт, используя почту и пароль."
      color="blue"
    />
    <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
      <Message
        error
        header="Ошибка!"
        content={error}
      />
      <Segment>
        <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          label="Пароль"
          placeholder="Пароль"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
        />
        <Button
          disabled={disabled || loading}
          icon="sign in"
          type="submit"
          color="orange"
          content="Войти"
        />
      </Segment>
    </Form>
    <Message warning>
      <Icon name="help" />
      Впервые на сайте?{" "}
      <Link href="/signup">
        <a>Зарегистрируйтесь</a>
      </Link>{" "}
    </Message>
  </>;
}

export default Signup;