import React from 'react';
import styles from './styles.module.scss';

class NewsletterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: '',
      fNameValue: '',
    };
    this.resetForm = this.resetForm.bind(this);
  }

  resetForm() {
    this.setState({
      emailValue: '',
      fNameValue: '',
    });
  }

  render() {
    return (
      <form
        className={styles.form__newsletter}
        action="https://joaodias.us4.list-manage.com/subscribe/post"
        method="POST"
      >
        <fieldset name="form-attributes">
          <input type="hidden" name="u" value="3b224b84ea35b152cf9b8991f" />
          <input type="hidden" name="id" value="2ccb5a3395" />
        </fieldset>

        <fieldset className={styles.form__field} name="form-fields">
          <div className={styles.form__field__group}>
            <label className={styles.form__field__label} htmlFor="mce-EMAIL">
              Email
            </label>
            <input
              id="mce-EMAIL"
              type="email"
              name="mce-EMAIL"
              title="Please insert your email"
              placeholder="Your Email"
              className={`${styles.form__field__input} required email`}
              value={this.state.emailValue}
              onChange={e => {
                this.setState({ emailValue: e.target.value });
              }}
              autoCapitalize="off"
              autoCorrect="off"
              required
            />
          </div>
          <div className={styles.form__field} className={styles.form__field__group}>
            <label className={styles.form__field__label} htmlFor="mce-FNAME">
              First Name
            </label>
            <input
              id="mce-FNAME"
              type="text"
              name="mce-FNAME"
              title="Please insert your first given name"
              placeholder="Your First Name"
              className={`${styles.form__field__input} required`}
              value={this.state.fNameValue}
              onChange={e => {
                this.setState({ fNameValue: e.target.value });
              }}
              autoCapitalize="on"
              autoCorrect="on"
              required
            />
          </div>
          <div id="form-submit" className={`${styles.form__field__submit} ${styles.form__field__group}`}>
            <input
              type="button"
              value="Clear"
              name="clear"
              id="mc-embedded-clear"
              className={`${styles.form__field__button} secondary button`}
              onClick={this.resetForm}
            />
            <input
              type="submit"
              value="Subscribe"
              name="subscribe"
              id="mc-embedded-subscribe"
              className={`${styles.form__field__button} primary button`}
            />
          </div>
        </fieldset>

        <fieldset name="form-responses">
          <div id="mce-responses" className="clear">
            <div className="response" id="mce-error-response" style={{ display: 'none' }} />
            <div className="response" id="mce-success-response" style={{ display: 'none' }} />
          </div>
          <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
            <input type="text" name="b_3b224b84ea35b152cf9b8991f_2ccb5a3395" tabIndex="-1" value="" />
          </div>
        </fieldset>
      </form>
    );
  }
}

export default NewsletterForm;
