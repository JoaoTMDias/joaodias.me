import asyncComponent from '../../hoc/asyncComponent'

const VerticalTimeline = asyncComponent(() => {
  return import(`./VerticalTimeline`)
})

const VerticalTimelineElement = asyncComponent(() => {
  return import(`./VerticalTimelineElement`)
})

export { VerticalTimeline, VerticalTimelineElement }
