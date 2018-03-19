import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
// helpers
import scssClasses from './DatePicker.scss'
import styles from '../../../helper/style/appStyle'

const DatePicker = ({ isError, value, onChange, classes }) => (
  <div className={scssClasses.textField}>
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
        InputProps={{
            classes: {
              focused: classes.textFieldInkbar,
            },
          }}
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
