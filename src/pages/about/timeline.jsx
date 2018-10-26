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
      <VerticalTimelineElement
        className="type--work"
        date="2013 - present"
        description="Career Progress: Since 2013, I've been working at WIT Software, a software company in Coimbra, Portugal"
      >
        <h3 className="title">WIT Software</h3>
        <h4 className="subtitle">Coimbra, Portugal</h4>
        <p>UI Development, UX Design, Visual Design, Video Editing</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="type--work"
        date="2012 - 2013"
        description="Career Progress: From 2012 to 2013, I gained a lot of experience with the guys at Load Interactive, a company in Aveiro, Portugal"
      >
        <h3 className="title">Load Interactive</h3>
        <h4 className="subtitle">Aveiro, Portugal</h4>
        <p>Visual Design, Product Design</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="type--work"
        date="2007 - 2012"
        description="Career Progress: Every since I joined University, I've done a few freelance gigs. I continued that until early 2012."
      >
        <h3 className="title">joaodias.me</h3>
        <h4 className="subtitle">Freelance Designer</h4>
        <p>Web Design, Graphic Design</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="type--education"
        date="2008-2011"
        description="Career Progress: I did a degree in Multimedia Design, by the Coimbra School of Education. Finished in 2011 and was named student of the year from that course"
      >
        <h3 className="title">Degree in Multimedia Design</h3>
        <h4 className="subtitle">Coimbra School of Education (ESEC)</h4>
        <p>Graphic Design, Video Production, Web Design</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="type--education"
        date="2007-2008"
        description="Career Progress: I did the first year in organizational communication, a course mainly on Marketing and Public Relations."
      >
        <h3 className="title">1st year of Degree in Organizational Communication</h3>
        <h4 className="subtitle">Coimbra School of Education (ESEC)</h4>
        <p>Marketing, Economics, Public Relations</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="type--education"
        date="2002 - 2006"
        description="Career Progress: I graduated from highschool in 2006, in Computers and Informatics. It was similar to the basic scientific route that everyone does these days, but with programming and hardware classes."
      >
        <h3 className="title">High School in Computer and Informatics</h3>
        <h4 className="subtitle">Bernardino Machado School</h4>
        <p>Programming basics, SysAdmin basics</p>
      </VerticalTimelineElement>
    </VerticalTimeline>
  </section>
);

export default Timeline;
