// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { dispatchChangeSnackbarStage } from '../Snackbar/Snackbar.action'
// helpers
import { TagPanel } from '../../Main/App.helper.component'
import Avatar from '../../../helper/components/Avatar/Avatar.presentational'
// styles
import scssClasses from './Filter.scss'

export default class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddTag = this._handleAddTag.bind(this)
  }

  _handleAddTag() {
    const { queryTag, tags, addTag } = this.props
    if (R.trim(queryTag)) {
      if (R.findIndex(R.propEq('label', R.toLower(queryTag)), tags) < 0) {
        addTag()
      } else {
        dispatchChangeSnackbarStage('repetitive tag!')
      }
    } else {
      dispatchChangeSnackbarStage('select or write tag first!')
    }
  }

  render() {
    return (
      <div className={scssClasses.container}>
        {this.props.creator && <Avatar {...this.props} />}
        <TagPanel {...this.props} handleAddTag={this.handleAddTag} />
      </div>
    )
  }
}

Filter.propTypes = {
  creator: PropTypes.bool.isRequired,
  queryTag: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTag: PropTypes.func.isRequired,
}
