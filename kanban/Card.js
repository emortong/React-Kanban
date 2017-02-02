import React from 'react';
import styles from './Card.scss'

class Card extends React.Component {
  render() {
    const {color} = this.props;
    return (
      <div className={`${styles.Card} ${styles[color]}`}>
        <h4>{this.props.title}</h4>
        <p>Priority: {this.props.priority}</p>
        <p>Assigned to: {this.props.assignedTo}</p>
        <h5>{this.props.createdBy}</h5>
      </div>
    )
  }
}

export default Card;