import React from 'react';
import Card from '../Card/Card';
import styles from './Column.scss';

class Column extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {cards} = this.props.cardData;
    let high = cards.filter(item => {
      return item.priority === 'high';
    })
    let medium = cards.filter(item => {
      return item.priority === 'medium';
    })
    let low = cards.filter(item => {
      return item.priority === 'low';
    })
    let sortedCards = high.concat(medium, low);
    console.log(sortedCards);

    let queueCard = sortedCards.filter( item => {
      return item.status === 'queue';
    })
    .map( item => {
      return (
        <Card
        color="Orange"
        cardProps={item}
        loadCardData={this.props.loadCardData}
        key={item.id}
        >
        </Card>
      )
    })

    let progressCard = sortedCards.filter( item => {
      return item.status === 'progress';
    })
    .map(item => {
      return (
        <Card
        color="Green"
        cardProps={item}
        loadCardData={this.props.loadCardData}
        key={item.id}
        >
        </Card>
      )
    })
    let doneCard = sortedCards.filter( item => {
      return item.status === 'done';
    })
    .map(item => {
      return (
        <Card
        color="Silver"
        cardProps={item}
        loadCardData={this.props.loadCardData}
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
