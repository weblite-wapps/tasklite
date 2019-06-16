// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
// components
import LevelIcon from '../components/LevelIcon/LevelIcon.container.react'
// styles
import './LevelBar.scss'

const LevelBar = ({ tabIndex, noMargin }) => (
  <React.Fragment>
    <div
      className={
        noMargin ? "c--levelBar_noMargin" : "c--levelBar_container"
      }
    >
      <LevelIcon src="icons/icebox.png" label="ICE BOX" />
      <LevelIcon src="icons/inp.png" label="IN PROGRESS" />
      <LevelIcon src="icons/evaluate.png" label="EVALUATE" />
      <LevelIcon src="icons/done.png" label="DONE" />
    </div>

    <div className="c--levelBar_textContainer">
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
