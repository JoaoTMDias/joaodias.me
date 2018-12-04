import { asyncComponent } from "../../index.js";

const Form = asyncComponent(() => {
  return import("./form");
});

import { TextareaInput, TextInput } from "./inputs";

export { Form, TextInput, TextareaInput };
