// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
// styles
import './SelectField.scss'
import styles from '../../style/appStyle'
// const
const options = [
  { value: 1, label: 'high' },
  { value: 2, label: 'middle' },
  { value: 3, label: 'low' },
]

const SelectField = ({
  classes,
  isError,
  required,
  label,
  value,
  onChange,
}) => (
  <div className="c--selectField_textField">
    <TextField
      select
      label={label}
      value={value}
      fullWidth
      error={isError}
      helperText={required && 'required'}
      onChange={onChange}
      InputProps={{ classes: { focused: classes.textFieldInkbar } }}
      InputLabelProps={{ shrink: true, className: classes.textFieldFormLabel }}
      SelectProps={{ native: true, MenuProps: { className: "c--selectField_menu" } }}
      margin="normal"
    >
      <option value="">none</option>
      {options.map(option => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  </div>
)

SelectField.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isError: PropTypes.bool,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
}

SelectField.defaultProps = {
  isError: false,
  required: false,
}

export default withStyles(styles)(SelectField)
