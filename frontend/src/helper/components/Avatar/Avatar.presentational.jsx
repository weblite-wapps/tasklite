// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MuiAvatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
// styles
import './Avatar.scss'
import styles from './Avatar.style'

const Avatar = ({ classes, users, assignee, filterMode, onAssigneeChange }) => (
  <div className="c--avatar_container">
    <Typography variant="h6" className={classes.text}>
      Assignee:
    </Typography>

    <div className="c--avatar_row">
      {filterMode &&
        <div className="c--avatar_column">
          <MuiAvatar
            className={
              assignee.id === 'no assignee' ? classes.active : classes.passive
            }
            onClick={() => onAssigneeChange({ id: 'no assignee', name: 'no assignee' })}
            role="button"
            tabIndex="0"
          >
            {R.head('No assignee')}
          </MuiAvatar>
          <Typography
            variant="body2"
            align="center"
            className={classes.username}
            style={{ marginBottom: '5px' }}
          >
            No assignee
          </Typography>
        </div>
      }
      {users.map(({ _id, id, username, firstname, profileImage }) => (
        <div key={_id} className="c--avatar_column">
          <MuiAvatar
            className={
              id === assignee.id ? classes.active : classes.passive
            }
            onClick={() => onAssigneeChange({ id, name: username })}
            role="button"
            tabIndex="0"
            src={profileImage && `https://www.weblite.me:3000/image/${profileImage}`}
          >
            {(!profileImage) && R.head(firstname)}
          </MuiAvatar>
          <Typography
            variant="body2"
            align="center"
            className={classes.username}
            style={{ marginBottom: '5px' }}
          >
            {firstname}
          </Typography>
        </div>
      ))}
    </div>
  </div>
)

Avatar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  assignee: PropTypes.shape({}),
  filterMode: PropTypes.bool,
  onAssigneeChange: PropTypes.func.isRequired,
}

Avatar.defaultProps = {
  assignee: { id: '', name: '' },
  filterMode: false,
}

export default withStyles(styles)(Avatar)
