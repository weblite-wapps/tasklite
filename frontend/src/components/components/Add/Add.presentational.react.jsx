// modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import Avatar from '../../../helper/components/Avatar/Avatar.presentational'
// helpers
import { TagPanel } from '../Home/Home.helper.component'
import {
  TextField,
  SelectField,
  DatePicker,
  Button,
} from './Add.helper.component'
// styles
import './Add.scss'

const Add = props => {
  const { isError, creator } = props

  return (
    <div className="c--add_container">
      {creator && <Avatar {...props} isError={isError.assignee} />}
      <TextField {...props} isError={isError.title} />
      <TagPanel {...props} />
      <SelectField {...props} />
      <DatePicker {...props} isError={isError.deadline} />
      <Button label="Create" {...props} />
    </div>
  )
}

Add.propTypes = {
  isError: PropTypes.shape({}).isRequired,
  creator: PropTypes.bool.isRequired,
}

export default Add
