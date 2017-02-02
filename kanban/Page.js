import React from 'react';
import Column from './Column';
import styles from './Page.scss';

class Page extends React.Component {
  constructor() {
    super();

    // react only updates if there is a change in state
    this.state = {
      data: []
    }

    this.onCardData = this.onCardData.bind(this)
    this.onCardError = this.onCardError.bind(this)
  }

  onCardData(data) {
    console.log(data);
    let resData = JSON.parse(data.currentTarget.responseText);
    this.setState({ data: resData})
    console.log(this.state);
  }

  onCardError(err) {
    console.log(err);
  }

  loadCardData() {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onCardData);
    oReq.addEventListener('error', this.onCardError);
    oReq.open('GET', '/api/cards');
    oReq.send();
  }

  componentDidMount() {
    this.loadCardData();
  }
  render() {
    return (
      <div className={styles.Page}>
        <Column cardData={this.state.data}/>
      </div>
      )
  }
}

export default Page;