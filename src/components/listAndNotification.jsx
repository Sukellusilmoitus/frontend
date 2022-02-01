import React, { Component } from 'react';
import NotificationForm from './notificationForm';
import WrecksList from './wrecksList';

class ListAndNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wreckName: '',
      wreckId: '',
    };
  }

  scrollToBottom = () => {
    this.listEnd.scrollIntoView({ behavior: 'smooth' });
  };

  handleClick = (name, id) => {
    this.setState({ wreckName: name, wreckId: id });
    this.scrollToBottom();
  };

  render() {
    const { wreckName, wreckId } = this.state;
    return (
      <div>
        <WrecksList onRowClick={this.handleClick} />
        <div
          style={{
            float: 'left',
            clear: 'both',
          }}
          ref={(el) => { this.listEnd = el; }}
        />
        <NotificationForm
          wreckName={wreckName}
          wreckId={wreckId}
          createNotification={() => {}}
        />
      </div>
    );
  }
}

export default ListAndNotification;
