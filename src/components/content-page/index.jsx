/**
 * Import Libraries
 */
import React from 'react';

/**
 * Page Content Section
 * @param {*} param0
 */
const ContentPage = ({ children, ...props }) => (
  <section id="content-page" {...props}>
    {children}
  </section>
);

export default ContentPage;
