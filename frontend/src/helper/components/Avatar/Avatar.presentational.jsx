// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import MuiAvatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
// scssClasses
import scssClasses from './Avatar.scss'
import styles from './Avatar.style'

const Avatar = ({ classes, isError, users, selectedUser, onUserClick }) => (
  <div className={scssClasses.container}>
    <Typography variant="body1" className={classes.text}>
      Assignee
    </Typography>
    <div className={scssClasses.row}>
      {users.map(user => (
        <div key={user._id} className={scssClasses.column}>
          <MuiAvatar
            className={
              user.id === selectedUser.id ? classes.active : classes.passive
            }
            onClick={() => onUserClick(user)}
            role="button"
            tabIndex="0"
          >
            {R.head(user.name)}
          </MuiAvatar>
          <Typography
            variant="body1"
            align="center"
            className={classes.username}
            style={{ marginBottom: '5px' }}
          >
            {user.name}
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
  selectedUser: PropTypes.shape({}).isRequired,
  onUserClick: PropTypes.func.isRequired,
}

Avatar.defaultProps = {
  isError: false,
}

export default withStyles(styles)(Avatar)
