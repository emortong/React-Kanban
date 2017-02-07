import React from 'react';
import styles from './Card.scss'
import { onChangeEdit } from '../actions/cardActions';
import { connect } from 'react-redux';

class EditingCard extends React.Component {
   constructor() {
    super();

    this.onPutData = this.onPutData.bind(this)
  }

  updateState(field, value) {
    let {dispatch} = this.props;
    let toUpdate = {
      field,
      value
    }
    dispatch(onChangeEdit(toUpdate))
  }
  handleTitleChange(event) {
    this.updateState('title', event.target.value);
  }
  handlePriorityChange(event) {
    this.updateState('priority', event.target.value);
  }
  handleCreatedByChange(event) {
    this.updateState('createdBy', event.target.value);
  }
  handleAssignedToChange(event) {
    this.updateState('assignedTo', event.target.value);
  }

  doneHandler() {
    let data = {
      id: this.props.props.cardProps.id ,
      title: this.props.data.editing.title ? this.props.data.editing.title : this.props.props.cardProps.title,
      priority: this.props.data.editing.priority ? this.props.data.editing.priority : this.props.props.cardProps.priority,
      status: this.props.props.status,
      createdBy: this.props.data.editing.createdBy ? this.props.data.editing.createdBy : this.props.props.cardProps.createdBy,
      assignedTo: this.props.data.editing.assignedTo ? this.props.data.editing.assignedTo : this.props.props.cardProps.assignedTo,
      isEditing: false,
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
    const {color} = this.props.props;
    let title = this.props.data.editing.title;
    let priority = this.props.data.editing.priority;
    let assignedTo = this.props.data.editing.assignedTo;
    let createdBy = this.props.data.editing.createdBy;
    return (
        <div className={`${styles.Card} ${styles[color]}`}>
          <input type="text" placeholder={this.props.props.cardProps.title} value={title} onChange={this.handleTitleChange.bind(this)}/><br/>
          <label> Priority: </label>
          <input type="text" placeholder={this.props.props.cardProps.priority} value={priority} onChange={this.handlePriorityChange.bind(this)}/><br/>
          <label> Assigned to: </label>
          <input type="text" placeholder={this.props.props.cardProps.assignedTo} value={assignedTo} onChange={this.handleAssignedToChange.bind(this)}/><br/>
          <label> Created by: </label>
          <input type="text" placeholder={this.props.props.cardProps.createdBy} value={createdBy} onChange={this.handleCreatedByChange.bind(this)}/><br/>
          <input type="submit" placeholder="Done" onClick={this.doneHandler.bind(this)}/>
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
  )(EditingCard);