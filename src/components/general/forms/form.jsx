import React, { PureComponent } from 'react';
import styled from 'styled-components';

// Components
import { TextInput, TextareaInput } from './inputs';

import styles from './styles.module.scss';
import { rem } from '../../../../node_modules/polished';

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const validateEmail = email => {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};


/**
 * @description Contact Form
 * @date 2018-10-19
 * @class Form
 * @extends {PureComponent}
 */
class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      wasSent: false,
    };

    this.handleOnSubmitForm = this.handleOnSubmitForm.bind(this);
  }

  handleOnSubmitForm(event) {
    event.preventDefault();
    this.toggleAriaRole();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact-form', ...this.state }),
    })
      .then(() => {
        this.setState({
          wasSent: true,
        });
      })
      .catch(error => console.log(error));
  }

  toggleAriaRole() {
    // Check to see if the button is pressed
    let button = document.getElementById('submit');
    let pressed = button.getAttribute('aria-pressed') === 'true';
    // Change aria-pressed to the opposite state
    button.setAttribute('aria-pressed', !pressed);
  }

  handleTextInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  renderFormButton() {
    let formIsValid = '';

    if (this.state.name.length > 2 && this.state.message.length > 2 && validateEmail(`${this.state.email}`)) {
      formIsValid = 'is-valid';
    }

    return (
      <Submit id="submit" className={`${formIsValid}`} aria-pressed="false" type="submit">
        Submit
      </Submit>
    );
  }

  renderSuccessMessage() {
    if (this.state.wasSent) {
      return (
        <div className={styles.success}>
          <figure className={styles.success__image}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
              <path d="M83.29 12.18a1.4 1.4 0 0 0-1.41 0L56.11 27.43a1.41 1.41 0 1 0 1.43 2.43L76 18.92 41.59 54.66l-17.13-5.24L46.81 36.2a1.41 1.41 0 1 0-1.43-2.42l-25.1 14.84a1.4 1.4 0 0 0-.49 1.92 1.36 1.36 0 0 0 .8.63l20.46 6.26 9 16.43a1.44 1.44 0 0 0 .66.58 1.42 1.42 0 0 0 1.53-.29L62.66 64l19.52 6A1.41 1.41 0 0 0 84 68.67V13.41a1.42 1.42 0 0 0-.71-1.23zM50.15 58.3a1.33 1.33 0 0 0-.25.8v8.6l-6.17-11.22L71 28.19 50.15 58.3zm2.56 11.54V61l6.89 2.11zm28.48-3.07l-27.64-8.45 27.64-39.89z" />
              <path d="M35.12 60.88a1.41 1.41 0 0 0-2 0L20 74a1.39 1.39 0 0 0 0 2 1.38 1.38 0 0 0 2 0l13.12-13.13a1.41 1.41 0 0 0 0-2zM17.63 78.36a1.4 1.4 0 0 0-2 0l-3.22 3.24a1.41 1.41 0 0 0 0 2 1.44 1.44 0 0 0 1 .41 1.4 1.4 0 0 0 1-.41l3.23-3.24a1.41 1.41 0 0 0-.01-2zm14.43 3.16a1.41 1.41 0 0 0-2.4 1 1.45 1.45 0 0 0 .41 1 1.43 1.43 0 0 0 1 .41 1.41 1.41 0 0 0 1-.41 1.45 1.45 0 0 0 .41-1 1.41 1.41 0 0 0-.42-1zm10.46-10.47a1.41 1.41 0 0 0-2 0l-7 7a1.41 1.41 0 0 0 0 2 1.41 1.41 0 0 0 2 0l7-7a1.41 1.41 0 0 0 0-2zm24-.53a1.41 1.41 0 0 0-2 0l-7 7a1.41 1.41 0 0 0 0 2 1.36 1.36 0 0 0 1 .41 1.4 1.4 0 0 0 1-.41l7-7a1.41 1.41 0 0 0 0-2zM51.87 31.17a1.43 1.43 0 0 0-1-.41 1.4 1.4 0 0 0-1.4 1.4 1.43 1.43 0 0 0 .41 1 1.41 1.41 0 0 0 1 .41 1.4 1.4 0 0 0 1.41-1.41 1.41 1.41 0 0 0-.42-.99z" />
            </svg>
          </figure>
          <h2 className={styles.success__title}>Off it goes!</h2>
          <p className={styles.success__message}>
            Thanks! Your message has been sent to me, so i'll get back to you as soon as I can. In the mean time, feel
            free to browser my site wherever you want.
          </p>
        </div>
      );
    } else return null;
  }

  render() {
    return (
      <div id="contact-form" className={`l__row ${styles.container}`}>
        <form
          name="contact-form"
          className={styles.form}
          onSubmit={this.handleOnSubmitForm}
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          {this.renderSuccessMessage()}
          <fieldset className={styles.fieldset}>
            <div className={styles.group}>
              <TextInput
                wrapperClassName={styles.input}
                id="name"
                label="Name"
                type="text"
                placeholder="What's your name?"
                value={this.state.name}
                onChange={this.handleTextInputChange('name')}
                maxLength={50}
                required
              />
              <TextInput
                wrapperClassName={styles.input}
                id="email"
                label="Email"
                type="email"
                placeholder="Your fancy email"
                value={this.state.email}
                onChange={this.handleTextInputChange('email')}
                maxLength={200}
                required
              />
            </div>
            <TextareaInput
              className={styles.group}
              id="message"
              label="Message"
              placeholder="Got something you want to say?"
              value={this.state.message}
              onChange={this.handleTextInputChange('message')}
              maxLength={50}
              required
            />
            <input hidden className="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="contact-form" />
          </fieldset>
          <fieldset className={styles.fieldset}>{this.renderFormButton()}</fieldset>
          <div data-netlify-recaptcha />
        </form>
      </div>
    );
  }
}

const Submit = styled.button`
  font-size: ${rem('12px')};
  text-transform: uppercase;
  letter-spacing: ${rem('4px')};
  color: ${props => props.theme.gray4};
  cursor: not-allowed;
  font-weight: bold;
  text-align: center;
  width: 100%;
  padding: ${props => props.theme.globalPadding};
  border: 2px solid ${props => props.theme.gray2};
  border-top-width: 0;
  border-radius: 0;
  background-color: ${props => props.theme.white};
  appearance: none;
  transition: all 200ms;
  pointer-events: none;

  &.is-valid {
    color: ${props => props.theme.gray9};
    cursor: pointer;
    pointer-events: all;
    border-radius: 0;

    &:hover {
      background-color: ${props => props.theme.gray9};
      color: ${props => props.theme.white};
      border-color: ${props => props.theme.black};
      padding-top: ${rem('24px')};
      padding-bottom: ${rem('24px')};
    }
  }
`;

export default Form;
