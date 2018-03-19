import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
// helpers
import styles from './DatePicker.style'

function DatePicker(props) {
  const { isError, value, onChange, classes } = props

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Deadline"
        type="date"
        value={value}
        onChange={onChange}
        className={classes.textField}
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
  )
}

DatePicker.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isError: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}


export default withStyles(styles)(DatePicker)
