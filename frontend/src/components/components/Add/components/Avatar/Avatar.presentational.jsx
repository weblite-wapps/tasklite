// modules
import React from 'react'
import PropTypes from 'prop-types'
import MuiAvatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
// scssClasses
import scssClasses from './Avatar.scss'


const Avatar = ({ users }) => (
  <div className={scssClasses.container}>
    {
      users.map(user => (
        <div className={scssClasses.column} key={user._id}>
          <MuiAvatar className={scssClasses.avatar} src="assets/mostafa.png" />
          <Typography variant="body1" align="center">
            {user.name}
          </Typography>
        </div>
      ))
    }
  </div>
)

Avatar.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Avatar
