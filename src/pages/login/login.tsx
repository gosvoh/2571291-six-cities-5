import Layout from '@/layout';
import { store } from '@/store';
import { loginAction } from '@/store/api-actions';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <Layout
      className="page--gray page--login"
      showFooter={false}
      showHeader={false}
    >
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={(event) => {
                event.preventDefault();
                const fd = new FormData(event.target as HTMLFormElement);
                const email = fd.get('email') as string | null;
                const password = fd.get('password') as string | null;
                if (!email || !password) {
                  return;
                }
                store
                  .dispatch(loginAction({ email, password }))
                  .unwrap()
                  .then(() => navigate('/'));
              }}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export { Login };
