// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MuiTextField from 'material-ui/TextField'
// styles
import scssClasses from './TextField.scss'
import styles from '../../../helper/style/appStyle'


const TextField = ({ withButton, isError, required, fullWidth, label, value, onChange, classes }) =>
  (
    withButton ? (
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
    ) : (
      <div className={scssClasses.textField}>
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
      </div>
    )
  )


TextField.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  withButton: PropTypes.bool,
  isError: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

TextField.defaultProps = {
  withButton: false,
  isError: false,
  required: false,
  fullWidth: true,
}


export default withStyles(styles)(TextField)