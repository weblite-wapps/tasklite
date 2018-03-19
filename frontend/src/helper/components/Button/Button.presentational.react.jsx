// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
// css
import styles from './Button.style'

function CustomizedButton(props) {
  const { componentName, label, variant, disabled, onClick, classes } = props
  return (
    <Button
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      classes={{ root: classes[componentName], raised: classes[`${componentName}Raised`] }}
    >
      {props.children}
      {label}
    </Button>
  )
}

CustomizedButton.propTypes = {
  children: PropTypes.element,
  classes: PropTypes.shape({}).isRequired,
  componentName: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

CustomizedButton.defaultProps = {
  componentName: 'default',
  children: null,
  label: '',
  variant: 'flat',
  disabled: false,
  onClick: () => {},
}

export default withStyles(styles)(CustomizedButton)
