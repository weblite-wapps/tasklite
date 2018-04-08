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
// helpers
import { checkToShow } from './ActionButtons.helper'
// styles
import scssClasses from './ActionButtons.scss'
import styles from '../../../main/List.style'


const ActionButtons = ({ classes, expandingId, task: { _id, assignee }, onExpandClick }) => (
  <div className={scssClasses.actions}>
    <IconButton onClick={() => onExpandClick(_id)} classes={{ root: classes.IconButton }}>
      {
        _id === expandingId ?
          <ExpandLess classes={{ root: classes.SvgIcon }} /> :
          <ExpandMore classes={{ root: classes.SvgIcon }} />
      }
    </IconButton>

    {checkToShow('ICE BOX', assignee) && <Icon src="assets/icons/icebox.png" label="ICE BOX" _id={_id} />}
    {checkToShow('IN PROGRESS', assignee) && <Icon src="assets/icons/inp.png" label="IN PROGRESS" _id={_id} />}
    {checkToShow('EVALUATE', assignee) && <Icon src="assets/icons/evaluate.png" label="EVALUATE" _id={_id} />}
    {checkToShow('DONE', assignee) && <Icon src="assets/icons/done.png" label="DONE" _id={_id} />}
  </div>
)

ActionButtons.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  expandingId: PropTypes.string.isRequired,
  task: PropTypes.shape({}).isRequired,
  onExpandClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(ActionButtons)
