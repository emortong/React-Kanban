import React from 'react';
import styles from './Card.scss'
import { delCard, editStatus } from '../actions/cardActions';
import { connect } from 'react-redux';

class Card extends React.Component {
   constructor() {
    super();

    this.onPutData = this.onPutData.bind(this)
  }

  delHandler() {
    let {dispatch} = this.props;
    dispatch(delCard(this.props))

    const delReq = new XMLHttpRequest();
    delReq.addEventListener('load', this.onDelData);
    delReq.addEventListener('error', this.onReqError);
    delReq.open('DELETE', '/api/cards');
    delReq.setRequestHeader("Content-Type", "application/json")
    delReq.send(JSON.stringify({id: this.props.id}));
  }

  handleBtnClick(status) {
    let data = {
      id: this.props.id,
      title: this.props.title,
      priority: this.props.priority,
      status: status,
      createdBy: this.props.createdBy,
      assignedTo: this.props.assignedTo
    }
    const delReq = new XMLHttpRequest();
    delReq.addEventListener('load', this.onPutData);
    delReq.addEventListener('error', this.onReqError);
    delReq.open('PUT', '/api/cards');
    delReq.setRequestHeader("Content-Type", "application/json")
    delReq.send(JSON.stringify(data));

  }
  onPutData(data) {
    this.props.remount();
  }

  render() {
    const {color, status} = this.props;
    let xy = null
    let qPartial;
    let pPartial;
    let dPartial;

    switch(status) {
      case 'queue':
        qPartial = <div className={styles.select}></div>
        pPartial = null;
        dPartial = null;
      break;
      case 'progress':
        qPartial = null;
        pPartial = <div className={styles.select}></div>
        dPartial = null;
      break;
      case 'done':
        qPartial = null;
        pPartial = null;
        dPartial = <div className={styles.select}></div>
      break;
    }

    return (
        <div className={`${styles.Card} ${styles[color]}`}>
          <h1>{this.props.title}</h1>
          <p>Priority: {this.props.priority}</p>
          <p>Assigned to: {this.props.assignedTo}</p>
          <h5>{this.props.createdBy}</h5>
          <h4 onClick={this.delHandler.bind(this)} className={styles.deleteBtn}>Delete</h4>
          <div className={styles.buttons}>
            <div className={styles.qBtn} onClick={this.handleBtnClick.bind(this, 'queue')}>
              {qPartial}
            </div>
            <div className={styles.pBtn} onClick={this.handleBtnClick.bind(this, 'progress')}>
              {pPartial}
            </div>
            <div className={styles.dBtn} onClick={this.handleBtnClick.bind(this, 'done')}>
              {dPartial}
            </div>
          </div>
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
  )(Card);