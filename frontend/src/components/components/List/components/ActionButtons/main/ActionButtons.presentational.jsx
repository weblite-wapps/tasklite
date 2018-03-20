// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
// icons
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
// components
import Icon from '../components/Icon/Icon.container.react'
// styles
import scssClasses from './ActionButtons.scss'
import styles from '../../../main/List.style'


const ActionButtons = ({ classes, tabIndex, expandingId, _id, onExpandClick }) => (
  <div className={scssClasses.actions}>
    <IconButton onClick={() => onExpandClick(_id)} classes={{ root: classes.IconButton }}>
      {
        _id === expandingId ?
          <ExpandLess classes={{ root: classes.SvgIcon }} /> :
          <ExpandMore classes={{ root: classes.SvgIcon }} />
      }
    </IconButton>

    {(tabIndex === 'IN PROGRESS' || tabIndex === 'EVALUTE') && <Icon src="assets/icons/icebox.png" label="ICE BOX" _id={_id} />}
    {(tabIndex === 'ICE BOX' || tabIndex === 'EVALUTE') && <Icon src="assets/icons/inp.png" label="IN PROGRESS" _id={_id} />}
    {tabIndex === 'IN PROGRESS' && <Icon src="assets/icons/evalute.png" label="EVALUTE" _id={_id} />}
    {tabIndex === 'EVALUTE' && <Icon src="assets/icons/done.png" label="EVALUTE" _id={_id} />}
  </div>
)

ActionButtons.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  tabIndex: PropTypes.string.isRequired,
  expandingId: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  onExpandClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(ActionButtons)
