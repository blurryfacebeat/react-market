import React from 'react';
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import catchErrors from '../utils/catchErrors';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { handleLogin } from '../utils/auth';

const INITIAL_USER = {
  name: "",
  email: "",
  password: "",
  phone: ""
}

function Signup() {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  }

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  async function handleSubmit() {
    event.preventDefault();
    try {
      setLoading(true);
      setError('');
      const url = `${baseUrl}/api/signup`;
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
      icon="settings"
      header="Начните!"
      content="Создайте аккаунт и начните покупки."
      color="teal"
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
          icon="user"
          iconPosition="left"
          label="Имя"
          placeholder="Имя"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          icon="envelope"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name="email"
          value={user.email}
          type="email"
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
        <Form.Input
          fluid
          icon="phone"
          iconPosition="left"
          label="Номер телефона"
          placeholder="Номер телефона"
          name="phone"
          value={user.phone}
          onChange={handleChange}
        />
        <Button
          disabled={disabled || loading}
          icon="signup"
          type="submit"
          color="orange"
          content="Зарегистрироваться"
        />
      </Segment>
    </Form>
    <Message warning>
      <Icon name="help" />
      Уже зарегистрированы?{" "}
      <Link href="/login">
        <a>Войдите в аккаунт</a>
      </Link>{" "}
    </Message>
  </>;
}

export default Signup;
