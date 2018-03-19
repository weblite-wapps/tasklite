// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MuiTextField from 'material-ui/TextField'


const styles = () => ({
  textFieldFormLabel: {
    color: '#919191',
  },
  textFieldInkbar: {
    '&:after': {
      backgroundColor: '#919191',
    },
  },
})


function TextField(props) {
  const { isError, required, fullWidth, label, value, onChange, classes } = props

  return (
    <MuiTextField
      label={label}
      value={value}
      onChange={onChange}
      helperText={required && 'required'}
      error={isError}
      required={required}
      fullWidth={fullWidth}
      multiline
      InputProps={{ classes: { focused: classes.textFieldInkbar } }}
      InputLabelProps={{ className: classes.textFieldFormLabel }}
    />
  )
}

TextField.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isError: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

TextField.defaultProps = {
  isError: false,
  required: false,
  fullWidth: true,
}


export default withStyles(styles)(TextField)
