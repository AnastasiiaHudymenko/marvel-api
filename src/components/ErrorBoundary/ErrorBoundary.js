import { Component } from 'react';

export class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, erorrInfo) {
    this.setState({ error: true });
  }
  render() {
    const { error } = this.state;
    if (error) {
      return;
    }

    return this.props.children;
  }
}
