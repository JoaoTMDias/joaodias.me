import { asyncComponent } from './../../index';

const CallToActionWrapper = asyncComponent(() => {
  // eslint-disable-next-line
  return import(`./wrapper/index`);
});

const CallToActionItem = asyncComponent(() => {
  // eslint-disable-next-line
  return import(`./item/index`);
});

export { CallToActionWrapper, CallToActionItem };
