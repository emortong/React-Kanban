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
    this.componentWillMount = this.componentWillMount.bind(this)
  }

  onDelData() {
    return true;
  }

  onCardData(data) {
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

  componentWillMount() {
    console.log('hello');
    this.loadCardData();
  }

  render() {
    let {data} = this.props;
    let partial;
    if (data.showForm === true) {
      partial = <NewTask />;
    } else {
      partial = null;
    }
    return (
      <div className={styles.Page}>
        <Column
          cardData={data}
        />
        {partial}

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