import { Menu, Container, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { handleLogout } from '../../utils/auth';

// ProgressBar при загрузке страницы
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header({ user }) {
  const router = useRouter();

  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'admin';
  const isRootOrAdmin = isRoot || isAdmin;

// Если находимся на данной странице, то она становится активна
  function isActive(route) {
    return route === router.pathname;
  }

  return (
    <Menu stackable fluid id="menu" inverted>
      <Container text>
        <Link href="/">
          <Menu.Item header active={isActive('/')}>
            <Image
              size="mini"
              src="/static/supermarket.svg"
              style={{ marginRight: '1em' }}
            />
            СитиМобайл
          </Menu.Item>
        </Link>

        <Link href="/cart">
          <Menu.Item header active={isActive('/cart')}>
            <Icon
              name="cart"
              size="large"
            />
            Корзина
          </Menu.Item>
        </Link>

        {isRootOrAdmin && (<Link href="/create">
          <Menu.Item header active={isActive('/create')}>
            <Icon
              name="add circle"
              size="large"
            />
            Добавить
          </Menu.Item>
        </Link>)}

        {isRootOrAdmin && (<Link href="/producer">
          <Menu.Item header active={isActive('/producer')}>
            <Icon
              name="globe"
              size="large"
            />
            Производители
          </Menu.Item>
        </Link>)}

        {isRootOrAdmin && (<Link href="/providers">
          <Menu.Item header active={isActive('/providers')}>
            <Icon
              name="truck"
              size="large"
            />
            Поставщики
          </Menu.Item>
        </Link>)}

        {user ? (<>
        <Link href="/account">
          <Menu.Item header active={isActive('/account')}>
            <Icon
              name="user"
              size="large"
            />
            Профиль
          </Menu.Item>
        </Link>

          <Menu.Item onClick={handleLogout} header>
            <Icon
              name="sign out"
              size="large"
            />
            Выйти
          </Menu.Item>
        </>)
        :
        (<>
        <Link href="/login">
          <Menu.Item header active={isActive('/login')}>
            <Icon
              name="sign in"
              size="large"
            />
            Войти
          </Menu.Item>
        </Link>

        <Link href="/signup">
          <Menu.Item header active={isActive('/signup')}>
            <Icon
              name="signup"
              size="large"
            />
            Регистрация
          </Menu.Item>
        </Link>
        </>)}
      </Container>
    </Menu>
  );
}

export default Header;
