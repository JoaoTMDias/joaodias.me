/**
 * Import Libraries
 */
import React, { PureComponent } from 'react';

/**
 * Page Content Section
 * @param {*} param0
 */
class ContentPage extends PureComponent {
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
