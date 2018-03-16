// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Badge from 'material-ui/Badge'
// components
import Image from '../components/Image/Image.container.react'
// styles
import classes from './LevelBar.scss'

const LevelBar = ({ tabIndex, numbers }) => (
  <React.Fragment>
    <div className={classes.logoContainer}>
      <Badge badgeContent={numbers['ICEBOX']}>
        <Image src="assets/icons/icebox.png" label="ICE BOX" />
      </Badge>
      <Badge badgeContent={numbers['INPROGRESS']}>
        <Image src="assets/icons/inprogress.png" label="IN PROGRESS" />
      </Badge>
      <Badge badgeContent={numbers['EVALUTE']}>
        <Image src="assets/icons/evalute.png" label="EVALUTE" />
      </Badge>
      <Badge badgeContent={numbers['DONE']}>
        <Image src="assets/icons/done.png" label="DONE" />
      </Badge>
    </div>

    <div className={classes.textContsainer}>
      <Divider />
      <Typography variant="title">
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
