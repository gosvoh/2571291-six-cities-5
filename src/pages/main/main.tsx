import Map from '@/components/map';
import OffersList from '@/components/offers-list';
import { SortingForm } from '@/components/sorting-form';
import { CityLocations } from '@/constants';
import Layout from '@/layout';
import { useState } from 'react';

type Props = {
  offers: Offer[];
};

function Main({ offers }: Props) {
  const [hoveredOffer, setHoveredOffer] = useState<Offer['id']>();

  return (
    <Layout className="page--gray page--main" showFooter={false}>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in Amsterdam
              </b>
              <SortingForm />
              <OffersList offers={offers} onOfferHover={setHoveredOffer} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map">
                <Map
                  city={CityLocations.AMSTERDAM}
                  points={offers
                    .filter((x) => !!x.location)
                    .map((offer) => ({
                      id: offer.id,
                      latitude: offer.location!.latitude,
                      longitude: offer.location!.longitude,
                    }))}
                  selectedPoint={hoveredOffer}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export { Main };
