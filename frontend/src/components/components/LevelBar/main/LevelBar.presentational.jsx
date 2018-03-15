// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
// components
import Image from '../components/Image/Image.container.react'
// styles
import classes from './LevelBar.scss'

const LevelBar = ({ tabIndex }) => (
  <React.Fragment>
    <div className={classes.logoContainer}>
      <Image src="assets/icons/icebox.png" label="ICE BOX" />
      <Image src="assets/icons/inprogress.png" label="IN PROGRESS" />
      <Image src="assets/icons/evalute.png" label="EVALUTE" />
      <Image src="assets/icons/done.png" label="DONE" />
    </div>
    <div className={classes.textContsainer}>
      <Divider />
      <Typography type="title">
        {tabIndex}
      </Typography>
      <Divider />
    </div>
  </React.Fragment>
)

LevelBar.propTypes = {
  tabIndex: PropTypes.string.isRequired,
}

export default LevelBar
