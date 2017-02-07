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
    let {dispatch} = this.props.props;
    dispatch(delCard(this.props.props))

    const delReq = new XMLHttpRequest();
    delReq.addEventListener('load', this.onDelData);
    delReq.addEventListener('error', this.onReqError);
    delReq.open('DELETE', '/api/cards');
    delReq.setRequestHeader("Content-Type", "application/json")
    delReq.send(JSON.stringify({id: this.props.props.id}));
  }

  editHandler() {
    let data = {
      id: this.props.props.id,
      title: this.props.props.title,
      priority: this.props.props.priority,
      status: this.props.props.status,
      createdBy: this.props.props.createdBy,
      assignedTo: this.props.props.assignedTo,
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
    let data = {
      id: this.props.props.id,
      title: this.props.props.title,
      priority: this.props.props.priority,
      status: status,
      createdBy: this.props.props.createdBy,
      assignedTo: this.props.props.assignedTo,
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
    this.props.props.remount();
  }

  render() {
    const {color, status} = this.props.props;
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
          <h1>{this.props.props.title}</h1>
          <p>Priority: {this.props.props.priority}</p>
          <p>Assigned to: {this.props.props.assignedTo}</p>
          <h5>{this.props.props.createdBy}</h5>
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