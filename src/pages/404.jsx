import React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import BodyClassName from 'react-body-classname';
import Layout from '../components/layout';

import styles from './404/styles.module.scss';

const NotFoundPage = () => (
  <Layout>
    <BodyClassName className="404">
      <div className={classnames('l__container', 'l__row', 'l__section', styles.container)}>
        <Helmet
          title="joaodias.me - Page not Found"
          meta={[{ name: 'description', content: '404 - Page not found' }, { name: 'keywords', content: 'sample, something' }]}
        />
        <div className={styles.row}>
          <h1 className={styles.title}>Oh, darn it!</h1>
          <h2 className={styles.subtitle}>I cannot seem to find the page you are looking for.</h2>
          <h6 className={styles.code}>Error code: 404</h6>
          <ul className={styles.list}>
            <li>Here are some links instead:</li>
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/contact/">Contact</Link>
            </li>
          </ul>
        </div>
        <figure className={styles.image}>
          <img src="https://media.giphy.com/media/9J7tdYltWyXIY/giphy.gif" width="450" height="379" alt="A confused-looking John Travolta" />
        </figure>
      </div>
    </BodyClassName>
  </Layout>
);

export default NotFoundPage;
