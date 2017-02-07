import React from 'react';
import styles from './Card.scss'
import { delCard, editStatus } from '../actions/cardActions';
import { connect } from 'react-redux';


class RegularCard extends React.Component {
   constructor() {
    super();

    this.onPutData = this.onPutData.bind(this)
  }

  delHandler() {
    let cardProps = this.props.props.cardProps;
    let {dispatch} = this.props.props;
    dispatch(delCard(cardProps))

    const delReq = new XMLHttpRequest();
    delReq.addEventListener('load', this.onDelData);
    delReq.addEventListener('error', this.onReqError);
    delReq.open('DELETE', '/api/cards');
    delReq.setRequestHeader("Content-Type", "application/json")
    delReq.send(JSON.stringify({id: cardProps.id}));
  }

  editHandler() {
    let cardProps = this.props.props.cardProps;
    let data = {
      id: cardProps.id,
      title: cardProps.title,
      priority: cardProps.priority,
      status: cardProps.status,
      createdBy: cardProps.createdBy,
      assignedTo: cardProps.assignedTo,
      isEditing: true
    }
    const delReq = new XMLHttpRequest();
    delReq.addEventListener('load', this.onPutData);
    delReq.addEventListener('error', this.onReqError);
    delReq.open('PUT', '/api/cards');
    delReq.setRequestHeader("Content-Type", "application/json")
    delReq.send(JSON.stringify(data));
  }

  handleBtnClick(status) {
    let cardProps = this.props.props.cardProps;
    let data = {
      id: cardProps.id,
      title: cardProps.title,
      priority: cardProps.priority,
      status: status,
      createdBy: cardProps.createdBy,
      assignedTo: cardProps.assignedTo,
      isEditing: false
    }
    const delReq = new XMLHttpRequest();
    delReq.addEventListener('load', this.onPutData);
    delReq.addEventListener('error', this.onReqError);
    delReq.open('PUT', '/api/cards');
    delReq.setRequestHeader("Content-Type", "application/json")
    delReq.send(JSON.stringify(data));

  }
  onPutData(data) {
    this.props.props.loadCardData();
  }

  render() {
    let cardProps = this.props.props.cardProps;
    const {color} = this.props.props;
    const {status} = cardProps;
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
          <div onClick={this.delHandler.bind(this)} className={styles.deleteBtn}> × </div>
          <h1>{cardProps.title}</h1>
          <p>Priority: {cardProps.priority}</p>
          <p>Assigned to: {cardProps.assignedTo}</p>
          <h5>{cardProps.createdBy}</h5>
          <div onClick={this.editHandler.bind(this)} className={styles.editBtn}>Edit</div>
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
  )(RegularCard);