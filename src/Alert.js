import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'blue';
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'red';
    }
  }

  class WarningAlert extends Alert {
    constructor(props) {
      super(props);
      this.color = 'red';
      this.fontSize = '16px';
    }
  }

  class OfflineAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = '#FFFF00';
    }
  }
  
export { InfoAlert, ErrorAlert, WarningAlert, OfflineAlert };