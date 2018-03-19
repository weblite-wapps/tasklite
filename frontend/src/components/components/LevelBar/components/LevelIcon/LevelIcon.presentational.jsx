// modules
import React from 'react'
import PropTypes from 'prop-types'
import Badge from 'material-ui/Badge'
// styles
import classes from './LevelIcon.scss'

const LevelIcon = ({ badgeContent, tabIndex, src, label, onTabClick }) => (
  <Badge badgeContent={badgeContent}>
    <div role="button" tabIndex="0" onClick={() => onTabClick(label)} className={classes.container}>
      <img
        src={src}
        alt={label}
        className={tabIndex === label ? classes.active : classes.passive}
      />
    </div>
  </Badge>
)

LevelIcon.propTypes = {
  badgeContent: PropTypes.number.isRequired,
  tabIndex: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
}

export default LevelIcon
