// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MuiAvatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
// styles
import './Avatar.scss'
import styles from './Avatar.style'

const Avatar = ({ classes, isError, users, assignee, onAssigneeChange }) => (
  <div className="c--avatar_container">
    <Typography variant="body2" className={classes.text}>
      Assignee
    </Typography>

    <div className="c--avatar_row">
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
    <Divider className={isError ? classes.error : classes.default} />
  </div>
)

Avatar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isError: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  assignee: PropTypes.shape({}),
  onAssigneeChange: PropTypes.func.isRequired,
}

Avatar.defaultProps = {
  isError: false,
  assignee: { id: '', name: '' },
}

export default withStyles(styles)(Avatar)
