// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
// styles
import styles from './Button.style'

const CustomizedButton = props => {
  const { classes, componentName, label, variant, disabled, onClick } = props

  return (
    <Button
      variant={variant}
      disabled={disabled}
      onClick={onClick}
      classes={{ root: classes[componentName], contained: classes[`${componentName}Contained`] }}
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
  variant: 'text',
  disabled: false,
  onClick: () => {},
}

export default withStyles(styles)(CustomizedButton)
