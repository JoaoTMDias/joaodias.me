// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { rem } from 'polished';

import styles from './styles.module.scss';

/** ********
 ** Component: ArticleItem
 ** @type: functional stateless component
 ** @description: A blog article component
 ********* */
const ArticleItem = () => (
  <li className={styles.wrapper}>
    <a href="#" className={styles.item}>
      <figure className={styles.cover}>
        <img src="https://via.placeholder.com/350x200.png" alt="" />
      </figure>
      <div className={styles.meta}>
        <h4 className={styles.meta__date}>December 6, 2019</h4>
        <h1 className={styles.meta__title}>Lorem Ipsum Dolor Sit Amet</h1>
      </div>
      <p className={styles.more}> Read full article on Medium.com</p>
    </a>
  </li>
);

export default ArticleItem;
