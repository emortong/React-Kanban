import React from 'react';
import Card from './Card';
import styles from './Column.scss';

class Column extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {

    let queueCard = this.props.cardData.cards.filter( item => {
      return item.status === 'queue';
    })
    .map((item, i) => {
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

    let progressCard = this.props.cardData.cards.filter( item => {
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
    let doneCard = this.props.cardData.cards.filter( item => {
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
