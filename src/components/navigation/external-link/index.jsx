import React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

const ExternalLink = props => (
  <OutboundLink {...props} href={props.to} target="_blank" rel="noopener noreferrer">
    {props.children}
  </OutboundLink>
);

export default ExternalLink;
