/**
 * Import Libraries
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import ExternalLink from '../../external-link';

/**
 * Styling
 */
import styles from './styles.module.scss';

class CallToActionItem extends Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    this.state = {
      item: null,
    };
  }

  componentDidMount() {
    let item = document.getElementById(`${this.props.id}`);

    if (item) {
      this.setState({
        item: item,
      });
    }
    console.log('item: ', item);
    console.log('id: ', this.props.id);
  }

  handleMouseMove(event) {
    const { item } = this.state;
    if (item) {
      let x = event.pageX - item.offsetLeft - item.offsetParent.offsetLeft;
      let y = event.pageY - item.offsetTop - item.offsetParent.offsetTop;
      item.style.setProperty('--x', x + 'px');
      item.style.setProperty('--y', y + 'px');
    }
  }

  render() {
    const { id, title, subtitle, linkText, linkURL, isFile } = this.props;

    if (isFile) {
      return (
        <ExternalLink
          id={`${id}`}
          to={linkURL}
          className={`${styles.item} callToAction`}
          aria-label="Click/Enter to download my resumé"
          onMouseMove={this.handleMouseMove}
        >
          <div className={styles.item__inner}>
            <header className={`fadeIn ${styles.item__top}`}>
              <p className={styles.item__subtitle}>{subtitle}</p>
              <h1 className={styles.item__title}>{title}</h1>
            </header>
            <footer className={styles.item__bottom}>
              <p className={`fadeIn ${styles.item__link}`}>{linkText}</p>
            </footer>
          </div>
        </ExternalLink>
      );
    }
    return (
      <Link
        id={`${id}`}
        to={linkURL}
        className={`${styles.item} callToAction`}
        aria-label="Click/Enter to go to another page"
        onMouseMove={this.handleMouseMove}
      >
        <div className={styles.item__inner}>
          <header className={`fadeIn ${styles.item__top}`}>
            <p className={styles.item__subtitle}>{subtitle}</p>
            <h1 className={styles.item__title}>{title}</h1>
          </header>
          <footer className={styles.item__bottom}>
            <p className={`fadeIn ${styles.item__link}`}>{linkText}</p>
          </footer>
        </div>
      </Link>
    );
  }
}

CallToActionItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  linkText: PropTypes.string,
  linkURL: PropTypes.string,
  isFile: PropTypes.bool,
};

export default CallToActionItem;
