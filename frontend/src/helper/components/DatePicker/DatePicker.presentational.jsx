import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
// helpers
import './DatePicker.scss'
import styles from '../../style/appStyle'

const DatePicker = ({ classes, isError, value, onChange }) => (
  <div className="c--datePicker_textField">
    <form className={classes.datePickerContainer} noValidate>
      <TextField
        id="date"
        label="Deadline"
        type="date"
        value={value}
        onChange={onChange}
        className={classes.datePickerTextField}
        required
        error={isError}
        InputProps={{ classes: { focused: classes.textFieldInkbar } }}
        InputLabelProps={{
          className: classes.textFieldFormLabel,
          shrink: true,
        }}
      />
    </form>
  </div>
)

DatePicker.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isError: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(DatePicker)
