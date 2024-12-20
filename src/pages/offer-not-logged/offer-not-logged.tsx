import Header from '@/components/header';
import { Offer } from '@/pages';

function OfferNotLogged() {
  return (
    <Offer
      customHeader={
        <Header
          authenticated={false}
          navItems={[
            <li className="header__nav-item user" key="header__login">
              <a
                className="header__nav-link header__nav-link--profile"
                href="#"
              >
                <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                <span className="header__login">Sign in</span>
              </a>
            </li>,
          ]}
        />
      }
    />
  );
}

export { OfferNotLogged };
