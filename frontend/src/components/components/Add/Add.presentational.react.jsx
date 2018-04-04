// modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import Avatar from '../../../helper/components/Avatar/Avatar.presentational'
// helpers
import { TagPanel } from '../../Main/App.helper.component'
import { TextField, SelectField, DatePicker, Button } from './Add.helper.component'
// styles
import scssClasses from './Add.scss'


const Add = (props) => {
  const { isError } = props

  return (
    <div className={scssClasses.container}>
      <Avatar {...props} isError={isError.selectedUser} />
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
  title: PropTypes.string.isRequired,
  priority: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  deadline: PropTypes.string.isRequired,
  selectedUser: PropTypes.shape({}).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryTag: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeIsError: PropTypes.func.isRequired,
}

export default Add
