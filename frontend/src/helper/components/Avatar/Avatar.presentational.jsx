// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import MuiAvatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
// scssClasses
import scssClasses from './Avatar.scss'
import styles from './Avatar.style'

const Avatar = ({ classes, isError, users, assignee, onAssigneeChange }) => (
  <div className={scssClasses.container}>
    <Typography variant="body2" className={classes.text}>
      Assignee
    </Typography>
    <div className={scssClasses.row}>
      {users.map(user => (
        <div key={user.id} className={scssClasses.column}>
          <MuiAvatar
            className={
              user.id === assignee.id ? classes.active : classes.passive
            }
            onClick={() => onAssigneeChange(user)}
            role="button"
            tabIndex="0"
            src={user.profileImage && `https://www.weblite.me:3000/image/${user.profileImage}`}
          >
            {(!user.profileImage) && R.head(user.firstname)}
          </MuiAvatar>
          <Typography
            variant="body2"
            align="center"
            className={classes.username}
            style={{ marginBottom: '5px' }}
          >
            {user.firstname}
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
  assignee: PropTypes.shape({}).isRequired,
  onAssigneeChange: PropTypes.func.isRequired,
}

Avatar.defaultProps = {
  isError: false,
}

export default withStyles(styles)(Avatar)
