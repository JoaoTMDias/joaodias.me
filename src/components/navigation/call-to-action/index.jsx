import asyncComponent from '../../hoc/asyncComponent'

const CallToActionWrapper = asyncComponent(() => {
  return import(`./wrapper/index`)
})

const CallToActionItem = asyncComponent(() => {
  return import(`./item/index`)
})

export { CallToActionWrapper, CallToActionItem }
