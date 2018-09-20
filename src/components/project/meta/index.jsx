// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';

// Components
// import Component from '../components/componentName';
import ProjectMetaList from './list';

/**
 ** Component: ProjectMeta
 ** @type: functional stateless component
 ** @description:  componentDescription
 * */
const ProjectMeta = ({
  skills, tools, client, date,
}) => (
  <Wrapper className="l__project l__section fadeInUp">
    <ProjectMetaList title="Skills">
      {skills.map((skill, index) => (
        <li key={`${index}`}>{`${skill}`}</li>
      ))}
    </ProjectMetaList>
    <ProjectMetaList title="Tools">
      {tools.map((tool, index) => (
        <li key={`${index}`}>{`${tool}`}</li>
      ))}
    </ProjectMetaList>
    <ProjectMetaList title="Date">
      <li>{`${date}`}</li>
    </ProjectMetaList>
    <ProjectMetaList title="Client">
      <li>{`${client}`}</li>
    </ProjectMetaList>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.32);
  padding: ${rem('24px')} 0;
  border-radius: ${rem('24px')};
  margin-top: ${rem('32px')} !important;
  margin-bottom: ${rem('32px')} !important;

  @media ${props => props.theme.breakpointMedium} {
    flex-direction: row;
    padding: ${rem('32px')};
    box-shadow: 0 8px 24px 0 rgba(108, 158, 195, 0.11);
  }

  @media ${props => props.theme.breakpointLarge} {
    margin-top: ${rem('64px')} !important;
    margin-bottom: ${rem('64px')} !important;
  }
`;

ProjectMeta.propTypes = {
  skills: PropTypes.array,
  tools: PropTypes.array,
  client: PropTypes.string,
  date: PropTypes.string,
};

export default ProjectMeta;
