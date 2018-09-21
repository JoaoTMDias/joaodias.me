// Libraries
import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from '../../components/ui/vertical-timeline/index';

/** ********
 ** Component: Timeline
 ** @type: functional stateless component
 ** @description: Timeline
 ********* */
const Timeline = () => (
  <section id="vertical-timeline">
    <VerticalTimeline>
      <VerticalTimelineElement className="type--work" date="2013 - present">
        <h3 className="title">WIT Software</h3>
        <h4 className="subtitle">Coimbra, Portugal</h4>
        <p>UI Development, UX Design, Visual Design, Video Editing</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement className="type--work" date="2012 - 2013">
        <h3 className="title">Load Interactive</h3>
        <h4 className="subtitle">Aveiro, Portugal</h4>
        <p>Visual Design, Product Design</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement className="type--work" date="2007 - 2012">
        <h3 className="title">joaodias.me</h3>
        <h4 className="subtitle">Freelance Designer</h4>
        <p>Web Design, Graphic Design</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement className="type--education" date="2008-2011">
        <h3 className="title">Degree in Multimedia Design</h3>
        <h4 className="subtitle">Coimbra School of Education (ESEC)</h4>
        <p>Graphic Design, Video Production, Web Design</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement className="type--education" date="2007-2008">
        <h3 className="title">1st year of Degree in Organizational Communication</h3>
        <h4 className="subtitle">Coimbra School of Education (ESEC)</h4>
        <p>Marketing, Economics, Public Relations</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement className="type--education" date="2002 - 2006">
        <h3 className="title">High School in Computer and Informatics</h3>
        <h4 className="subtitle">Bernardino Machado School</h4>
        <p>Programming basics, SysAdmin basics</p>
      </VerticalTimelineElement>
    </VerticalTimeline>
  </section>
);

export default Timeline;
