import React from 'react';
import styles from './Card.scss'
import { connect } from 'react-redux';

class EditingCard extends React.Component {
   constructor() {
    super();
  }

  render() {
    const {color} = this.props.props;

    return (
        <div className={`${styles.Card} ${styles[color]}`}>
          <input type="text" placeholder={this.props.props.title}/><br/>
          <label> Priority: </label>
          <input type="text" placeholder={this.props.props.priority}/><br/>
          <label> Assigned to: </label>
          <input type="text" placeholder={this.props.props.assignedTo}/><br/>
          <input type="text" placeholder={this.props.props.createdBy}/><br/>
          <h4>Done</h4>
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