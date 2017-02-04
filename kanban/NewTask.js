import React from 'react';
import styles from './NewTask.scss'
import { toggleForm, onChangeForm, onSubmitForm, setItems } from '../actions/formActions';
import { connect } from 'react-redux';

class NewTask extends React.Component {
  constructor() {
    super();

    this.onAddCard = this.onAddCard.bind(this)
  }

  quitNewTaskHandler() {
      let {dispatch} = this.props;
      dispatch(toggleForm(false))
  }

  updateState(field, value) {
    console.log(field, value);
    let {dispatch} = this.props;
    let toUpdate = {
      field,
      value
    }
    dispatch(onChangeForm(toUpdate))
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
  handleSubmit(event) {
    event.preventDefault();
    let {dispatch} = this.props;
    let values = this.props.data.newCard;

    const newReq = new XMLHttpRequest();
    newReq.addEventListener('load', this.onAddCard);
    newReq.addEventListener('error', this.onReqError);
    newReq.open('POST', '/api/cards');
    newReq.setRequestHeader("Content-Type", "application/json")
    newReq.send(JSON.stringify(values));

  }
  onAddCard(data) {
    let resData = JSON.parse(data.currentTarget.responseText)
    let {dispatch} = this.props;
    dispatch(onSubmitForm(resData))
    dispatch(onChangeForm({field: 'title', value: ''}))
    dispatch(onChangeForm({field: 'priority', value: ''}))
    dispatch(onChangeForm({field: 'createdBy', value: ''}))
    dispatch(onChangeForm({field: 'assignedTo', value: ''}))
    dispatch(toggleForm(false))
  }
  render() {
    let title = this.props.data.newCard.title;
    let priority = this.props.data.newCard.priority;
    let createdBy = this.props.data.newCard.createdBy;
    let assignedTo = this.props.data.newCard.assignedTo;
    return (
      <div className={styles.NewTask}>
      <div className={styles.close} onClick={this.quitNewTaskHandler.bind(this)}> × </div>
        <form onSubmit={this.handleSubmit}>
        <label>
          Title: <br/>
          <input type="text" value={title} onChange={this.handleTitleChange.bind(this)} />
        </label> <br/>
        <label>
          Priority: <br/>
          <input type="text" value={priority} onChange={this.handlePriorityChange.bind(this)} />
        </label> <br/>
        <label>
          Created By: <br/>
          <input type="text" value={createdBy} onChange={this.handleCreatedByChange.bind(this)} />
        </label> <br/>
        <label>
          Assigned To: <br/>
          <input type="text" value={assignedTo} onChange={this.handleAssignedToChange.bind(this)} />
        </label> <br/>
        <input className={styles.submit} type="submit" value="Submit" onClick={this.handleSubmit.bind(this)}/>
      </form>
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
  )(NewTask);