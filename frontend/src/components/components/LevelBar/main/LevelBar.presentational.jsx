// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
// components
import LevelIcon from '../components/LevelIcon/LevelIcon.container.react'
// styles
import scssClasses from './LevelBar.scss'

const LevelBar = ({ tabIndex, noMargin }) => (
  <React.Fragment>
    <div
      className={
        noMargin ? scssClasses.noMargin : scssClasses.levelBarContainer
      }
    >
      <LevelIcon src="icebox.png" label="ICE BOX" />
      <LevelIcon src="inp.png" label="IN PROGRESS" />
      <LevelIcon src="evaluate.png" label="EVALUATE" />
      <LevelIcon src="done.png" label="DONE" />
    </div>

    <div className={scssClasses.textContainer}>
      <Divider />
      <Typography variant="h6">{tabIndex}</Typography>
      <Divider />
    </div>
  </React.Fragment>
)

LevelBar.propTypes = {
  tabIndex: PropTypes.string.isRequired,
  noMargin: PropTypes.bool.isRequired,
}

export default LevelBar
