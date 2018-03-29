// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
// components
import LevelIcon from '../components/LevelIcon/LevelIcon.container.react'
// styles
import scssClasses from './LevelBar.scss'

const LevelBar = ({ tabIndex, numbers, noMargin }) => (
  <React.Fragment>
    <div className={noMargin ? scssClasses.noMargin : scssClasses.levelBarContainer}>
      <LevelIcon src="assets/icons/icebox.png" label="ICE BOX" badgeContent={numbers.ICEBOX} />
      <LevelIcon src="assets/icons/inp.png" label="IN PROGRESS" badgeContent={numbers.INPROGRESS} />
      <LevelIcon src="assets/icons/evalute.png" label="EVALUTE" badgeContent={numbers.EVALUTE} />
      <LevelIcon src="assets/icons/done.png" label="DONE" badgeContent={numbers.DONE} />
    </div>

    <div className={scssClasses.textContainer}>
      <Divider />
      <Typography variant="title">{tabIndex}</Typography>
      <Divider />
    </div>
  </React.Fragment>
)

LevelBar.propTypes = {
  tabIndex: PropTypes.string.isRequired,
  numbers: PropTypes.shape({}).isRequired,
  noMargin: PropTypes.bool.isRequired,
}

export default LevelBar
