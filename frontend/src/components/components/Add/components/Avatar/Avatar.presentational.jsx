// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import MuiAvatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
// scssClasses
import scssClasses from './Avatar.scss'


const Avatar = ({ classes, users, onUserClick }) => (
  <div className={scssClasses.container}>
    {
      users.map(user => (
        <div className={scssClasses.column} key={user._id}>
          <MuiAvatar
            style={{ backgroundColor: user.isSelected ? '#4CAF50' : '#cfcfcf '}}
            className={scssClasses.avatar}
            onClick={() => onUserClick(user)}
            role="button"
            tabIndex="0"
          >
            {R.head(user.name)}
          </MuiAvatar>
          <Typography variant="body1" align="center" style={{ marginBottom : '5px' }}>
            {user.name}
          </Typography>
        </div>
      ))
    }
  </div>
)

Avatar.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUserClick: PropTypes.func.isRequired,
}

export default Avatar
