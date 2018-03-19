// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Popover from 'material-ui/Popover'
// css
import styles from '../../../../../helper/components/Button/Button.style'

const CustomizedPopover = ({ classes, popoverIsOpen, anchorEl, onClose, onYep, onNop }) => (
  <Popover
    open={popoverIsOpen}
    onClose={onClose}
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'center',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
  >
    <Typography type="subheading" style={{ margin: '5px' }}>
      Are you sure?
    </Typography>
    <Button
      variant="raised"
      onClick={onYep}
      classes={{ raised: classes.WorkList }}
    >Yep
    </Button>
    <Button
      variant="raised"
      onClick={onNop}
      classes={{ raised: classes.WorkList }}
    >Nop
    </Button>
  </Popover>
)

CustomizedPopover.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  popoverIsOpen: PropTypes.bool.isRequired,
  anchorEl: PropTypes.shape({}),
  onClose: PropTypes.func.isRequired,
  onYep: PropTypes.func.isRequired,
  onNop: PropTypes.func.isRequired,
}

CustomizedPopover.defaultProps = {
  anchorEl: null,
}

export default withStyles(styles)(CustomizedPopover)
