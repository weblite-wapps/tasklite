// modules
import React from 'react'
import PropTypes from 'prop-types'
import Badge from '@material-ui/core/Badge'
// styles
import './LevelIcon.scss'

const LevelIcon = ({ numbers, tabIndex, src, label, onTabClick }) => (
  <Badge badgeContent={numbers[label]}>
    <div
      className="c--levelIcon_container"
      role="button"
      tabIndex="0"
      onClick={() => onTabClick(label)}
    >
      <img
        src={src}
        alt={label}
        className={tabIndex === label ? "c--levelIcon_active" : "c--levelIcon_passive"}
      />
    </div>
  </Badge>
)

LevelIcon.propTypes = {
  numbers: PropTypes.shape({}).isRequired,
  tabIndex: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
}

export default LevelIcon
