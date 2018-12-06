import { asyncComponent } from './../../index';

const CallToActionWrapper = asyncComponent(() => {
  // eslint-disable-next-line
  return import(`./wrapper/call-to-action-wrapper.component`);
});

const CallToActionItem = asyncComponent(() => {
  // eslint-disable-next-line
  return import(`./item/call-to-action-item.component`);
});

export { CallToActionWrapper, CallToActionItem };
