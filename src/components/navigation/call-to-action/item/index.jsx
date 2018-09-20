/**
 * Import Libraries
 */
import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';

/**
 * Styling
 */
import styles from './styles.module.scss';

class CallToActionItem extends React.Component {
  trackPosition() {
    document.querySelector('.trackPosition').onmousemove = (e) => {
      const x = e.pageX - e.target.offsetLeft;
      const y = e.pageY - e.target.offsetTop;

      e.target.style.setProperty('--x', `${x}px`);
      e.target.style.setProperty('--y', `${y}px`);
    };
  }

  render() {
    const { title } = this.props;
    const { subtitle } = this.props;
    const { linkText } = this.props;
    const { linkURL } = this.props;

    return (
      <Link to={linkURL} className={classnames('trackPosition', styles.item)}>
        <div className={styles.item__inner}>
          <header className={classnames('fadeIn', styles.item__top)}>
            <p className={styles.item__subtitle}>{subtitle}</p>
            <h1 className={styles.item__title}>{title}</h1>
          </header>
          <footer className={styles.item__bottom}>
            <p className={classnames('fadeIn', styles.item__link)}>{linkText}</p>
          </footer>
        </div>
      </Link>
    );
  }
}

export default CallToActionItem;
