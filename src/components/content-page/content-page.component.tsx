import * as React from "react";

export interface IAppProps {
  theme?: any;
}

export default class IApp extends React.Component<IAppProps, any> {
  componentDidMount() {
    const skipButton: HTMLElement = document.querySelector(".skip-main");
    const mainContent: HTMLElement = document.querySelector("#main-content");

    if (skipButton && mainContent) {
      skipButton.blur();
      mainContent.focus();
    }
  }

  public render() {
    const { children } = this.props;
    return (
      <section id="content-page" {...this.props}>
        {children}
      </section>
    );
  }
}
