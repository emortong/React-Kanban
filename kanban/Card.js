import React from 'react';
import styles from './Card.scss'
import { delCard, editStatus } from '../actions/cardActions';
import { connect } from 'react-redux';
import RegularCard from './RegularCard'
import EditingCard from './EditingCard'

class Card extends React.Component {

  render() {
    let partial;

    if(this.props.isEditing) {
      partial = <EditingCard props={this.props}/>
    } else {
      partial = <RegularCard props={this.props}/>
    }
    return (
        <div>
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
  )(Card);