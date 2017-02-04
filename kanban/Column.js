import React from 'react';
import Card from './Card';
import styles from './Column.scss'

class Column extends React.Component {
  render() {
    console.log(this.props.cardData.cards);
    let queueCard = this.props.cardData.cards.filter( item => {
      return item.status === 'queue';
    })
    .map((item, i) => {
      return (
        <Card
        color="Orange"
        title={item.title}
        priority={item.priority}
        createdBy={item.createdBy}
        assignedTo={item.assignedTo}
        deleteHandler={this.props.deleteHandler}
        index={item.index}
        id={item.id}
        key={item.id}
        >
        </Card>
      )
    })

    let progressCard = this.props.cardData.cards.filter( item => {
      return item.status === 'progress';
    })
    .map(item => {
      return (
        <Card
        color="Green"
        title={item.title}
        priority={item.priority}
        createdBy={item.createdBy}
        assignedTo={item.assignedTo}
        deleteHandler={this.props.deleteHandler}
        index={item.index}
        id={item.id}
        key={item.id}
        >
        </Card>
      )
    })
    let doneCard = this.props.cardData.cards.filter( item => {
      return item.status === 'done';
    })
    .map(item => {
      return (
        <Card
        color="Silver"
        title={item.title}
        priority={item.priority}
        createdBy={item.createdBy}
        assignedTo={item.assignedTo}
        deleteHandler={this.props.deleteHandler}
        index={item.index}
        id={item.id}
        key={item.id}
        >
        </Card>
      )
    })
    return (
      <div>
        <div className={styles.Column}>
              <h2>IN QUEUE</h2>
              {queueCard}
            </div>
            <div className={styles.Column}>
              <h2>IN PROGRESS</h2>
              {progressCard}
            </div>
            <div className={styles.Column}>
              <h2>DONE</h2>
              {doneCard}
            </div>
        </div>
      )
  }
}

export default Column;
