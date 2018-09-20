// Libraries
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from 'polished';

/**
 * Text Input component
 * Supports light and dark theme
 *
 * @class TexareatInput
 * @extends {PureComponent}
 */
class TexareatInput extends PureComponent {
  constructor(props) {
    super(props);

    this.handleEventFocus = this.handleEventFocus.bind(this);

    this.state = {
      focused: false,
    };
  }

  handleEventFocus() {
    this.setState({
      focused: !this.state.focused,
    });
  }

  handleEventBlur() {
    this.setState({
      focused: !this.state.focused,
    });
  }

  render() {
    let focusedClassName;

    if (this.state.focused === true) {
      focusedClassName = 'is-focused';
    } else {
      focusedClassName = '';
    }
    const {
      id,
      label,
      value,
      className,
      placeholder,
      onChange,
      required,
      pattern,
      disabled,
      helperText,
      maxLength,
    } = this.props;

    return (
      <Wrapper className={`${focusedClassName}`}>
        <label className="content" htmlFor={`${id}`}>
          <span className="label">{`${label}`}</span>
          <textarea
            id={`${id}`}
            name={`${id}`}
            className={`input ${className}`}
            placeholder={`${placeholder}`}
            pattern={`${pattern}`}
            defaultValue={`${value}`}
            onChange={onChange}
            required={required}
            disabled={disabled}
            onFocus={() => this.handleEventFocus()}
            onBlur={() => this.handleEventBlur()}
            cols={maxLength}
          />
        </label>
        <p className="helper">{`${helperText}`}</p>
      </Wrapper>
    );
  }
}

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  background-color: ${props => props.theme.white};
  padding: 0;
  margin: 0;

  &.is-focused {
    .label {
      color: ${props => props.theme.primaryColor};
    }
    .content {
      border: 2px solid ${props => props.theme.primaryColor};
    }
  }

  .content,
  .label,
  .helper,
  .input {
    transition: all 200ms ease-in-out;
  }

  .content {
    position: relative;
    background-color: ${props => props.theme.white};
    border-radius: 0;
    padding: ${rem('4px')} ${rem('14px')} 0 ${rem('14px')};
    border: 2px solid ${props => props.theme.gray2};
    border-top-width: 0;
    width: 100%;

    &:hover {
      .label {
        color: ${props => props.theme.primaryColor};
      }
    }
  }
  .label {
    font-size: ${rem('10px')};
    color: ${props => props.theme.gray6};
    margin-bottom: 0;
    width: 100%;
    display: block;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .input {
    margin: 0;
    color: ${props => props.theme.gray9};
    border: none;
    box-shadow: none;
    padding: 0;
    height: ${rem('32px')};
    background-color: ${props => props.theme.white};
    flex: 1;
    width: 100%;
    min-height: ${rem('200px')};
    max-height: ${rem('480px')};

    &::placeholder {
      color: ${props => props.theme.gray8} !important;
    }

    &:focus {
      border: none;
      box-shadow: none;
    }
  }
  .helper {
    font-size: ${rem('14px')};
    font-style: italic;
    color: ${props => props.theme.gray4};
    margin-top: ${rem('2px')};
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    text-align: left;
  }
`;

TexareatInput.defaultProps = {
  label: '',
  pattern: null,
  helperText: '',
  required: false,
  maxLength: 50,
};

TexareatInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default TexareatInput;
