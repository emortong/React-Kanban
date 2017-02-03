import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import Column from './Column';
import NewTask from './NewTask';
import styles from './Page.scss';
import { setCards } from '../actions/setCards';


class Page extends React.Component {
  constructor() {
    super();

    this.onCardData = this.onCardData.bind(this)
    this.onDelData = this.onDelData.bind(this)
    this.onReqError = this.onReqError.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
  }

  deleteHandler(key) {
    const delReq = new XMLHttpRequest();
    delReq.addEventListener('load', this.onDelData(key));
    delReq.addEventListener('error', this.onReqError);
    delReq.open('DELETE', '/api/cards');
    delReq.setRequestHeader("Content-Type", "application/json")
    delReq.send(JSON.stringify({id: key}));

  }

  onDelData(key) {
    return () => {
      let x = this.state.data.filter( card => {
        return card.id !== key;
      })
      this.setState({data: x})
    }
  }

  onCardData(data) {
    console.log(data);
    const {dispatch} = this.props;
    let resData = JSON.parse(data.currentTarget.responseText);
    dispatch(setCards(resData))
  }

  onReqError(err) {
    console.log(err);
  }

  loadCardData() {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onCardData);
    oReq.addEventListener('error', this.onReqError);
    oReq.open('GET', '/api/cards');
    oReq.send();
  }

  componentDidMount() {
    this.loadCardData();
  }
  render() {
    let {data} = this.props;
    return (
      <div className={styles.Page}>
        <Column
          cardData={data}
          deleteHandler={this.deleteHandler}
        />

      </div>
      )
  }
}

const mapStateToProps = ( state, ownProps) => {
  return {
    data: state.cardReducer.toJS()
  }
}

export default connect(
  mapStateToProps
  )(Page);