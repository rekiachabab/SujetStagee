import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
   
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
  
    console.error("Erreur survenue dans le composant:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h3>Une erreur est survenue dans l'application, veuillez réessayer plus tard.</h3>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
