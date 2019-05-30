// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MuiPopover from '@material-ui/core/Popover'
// css
import styles from '../../../../../helper/components/Button/Button.style'

const Popover = ({ classes, popoverIsOpen, anchorEl, onClose, onYep }) => (
  <MuiPopover
    open={popoverIsOpen}
    onClose={onClose}
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
  >
    <Typography type="subtitle1" style={{ margin: '5px' }}>
      Are you sure?
    </Typography>
    <Button
      variant="contained"
      onClick={onYep}
      classes={{ contained: classes.WorkList }}
    >
      Yep
    </Button>
    <Button
      variant="contained"
      onClick={onClose}
      classes={{ contained: classes.WorkList }}
    >
      Nop
    </Button>
  </MuiPopover>
)

Popover.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  popoverIsOpen: PropTypes.bool.isRequired,
  anchorEl: PropTypes.shape({}),
  onClose: PropTypes.func.isRequired,
  onYep: PropTypes.func.isRequired,
}

Popover.defaultProps = {
  anchorEl: null,
}

export default withStyles(styles)(Popover)
