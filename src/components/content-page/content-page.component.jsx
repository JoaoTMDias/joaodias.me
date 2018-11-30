/**
 * Import Libraries
 */
import React, { PureComponent } from 'react';

/**
 * Page Content Section
 * @param {*} param0
 */
class ContentPage extends PureComponent {
  componentDidMount() {
    const skipButton = document.querySelector('.skip-main');
    let mainContent = document.querySelector('#main-content');

    if (skipButton && mainContent) {
      skipButton.blur();
      mainContent.focus();
    }
  }
  render() {
    const { children } = this.props;
    return (
      <section id="content-page" {...this.props}>
        {children}
      </section>
    );
  }
}

export default ContentPage;
