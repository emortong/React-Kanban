import React from 'react';
import styles from './Header.scss';
import { connect } from 'react-redux';
import { toggleForm } from '../actions/formActions';

class Header extends React.Component {
    newTaskHandler() {
      let {dispatch} = this.props;
      dispatch(toggleForm(true))
    }
  render() {
    return (
      <div className={styles.Header}>
        <h2>KANBAN</h2>
        <div className={styles.newTask}>
          <p onClick={this.newTaskHandler.bind(this)}> + NEW TASK </p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ( state, ownProps) => {
  return {
    data: state.cardReducer.toJS().cards
  }
}

export default connect(
  mapStateToProps
  )(Header);