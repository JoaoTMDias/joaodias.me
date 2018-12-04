import { asyncComponent } from '../../index';

const TextInput = asyncComponent(() => {
  return import('./text-input');
});

const TextareaInput = asyncComponent(() => {
  return import('./textarea-input');
});

export { TextInput, TextareaInput };
