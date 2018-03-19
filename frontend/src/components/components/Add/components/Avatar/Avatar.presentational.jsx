// modules
import React from 'react'
// import PropTypes from 'prop-types'
import MuiAvatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
// scssClasses
import scssClasses from './Avatar.scss'


const Avatar = () => (
  <div className={scssClasses.container}>
    <div className={scssClasses.column}>
      <MuiAvatar className={scssClasses.avatar} src="assets/mostafa.png" />
      <Typography variant="body1" align="center">
        Mostafa
      </Typography>
    </div>
    <div className={scssClasses.column}>
      <MuiAvatar className={scssClasses.avatar} src="assets/mostafa.png" />
      <Typography variant="body1" align="center">
        Ali
      </Typography>
    </div>
    <div className={scssClasses.column}>
      <MuiAvatar className={scssClasses.avatar} src="assets/mostafa.png" />
      <Typography variant="body1" align="center">
        Farzin
      </Typography>
    </div>
    <div className={scssClasses.column}>
      <MuiAvatar className={scssClasses.avatar} src="assets/mostafa.png" />
      <Typography variant="body1" align="center">
        Masoud
      </Typography>
    </div>
  </div>
)

// Avatar.propTypes = {
// history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
// logs: PropTypes.arrayOf(PropTypes.object).isRequired,
// title: PropTypes.string.isRequired,
// }

export default Avatar
