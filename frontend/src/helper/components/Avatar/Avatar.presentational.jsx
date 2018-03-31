// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import MuiAvatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
// scssClasses
import scssClasses from './Avatar.scss'


const Avatar = ({ users, selectedUser, onUserClick }) => (
  <div className={scssClasses.container}>
    <div className={scssClasses.text}>
      <Typography variant="body1" align="center" style={{ color: '#919191' }}>
        Assignee
      </Typography>
      <Divider light />
    </div>
    <div className={scssClasses.row}>
      {
        users.map(user => (
          <div className={scssClasses.column} key={user._id}>
            <MuiAvatar
              style={{ backgroundColor: user.id === selectedUser.id ? '#4CAF50' : '#cfcfcf' }}
              className={scssClasses.avatar}
              onClick={() => onUserClick(user)}
              role="button"
              tabIndex="0"
            >
              {R.head(user.name)}
            </MuiAvatar>
            <Typography variant="body1" align="center" style={{ marginBottom: '5px' }}>
              {user.name}
            </Typography>
          </div>
        ))
      }
    </div>
  </div>
)

Avatar.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedUser: PropTypes.shape({}).isRequired,
  onUserClick: PropTypes.func.isRequired,
}

export default Avatar
