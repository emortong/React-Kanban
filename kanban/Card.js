import React from 'react';
import styles from './Card.scss'
import { delCard } from '../actions/cardDelete';
import { connect } from 'react-redux';


class Card extends React.Component {
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

  render() {
    const {color} = this.props;
    return (
      <div className={`${styles.Card} ${styles[color]}`}>
        <h4>{this.props.title}</h4>
        <p>Priority: {this.props.priority}</p>
        <p>Assigned to: {this.props.assignedTo}</p>
        <h5>{this.props.createdBy}</h5>
        <h4 onClick={this.delHandler.bind(this)}>Delete</h4>
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