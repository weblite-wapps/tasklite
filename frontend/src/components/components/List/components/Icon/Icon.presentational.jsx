// modules
import React from 'react'
import PropTypes from 'prop-types'
// styles
import classes from './Icon.scss'

const Icon = ({ src, label, _id, onChangeLevel }) => (
  <div
    role="button"
    tabIndex="0"
    onClick={() => onChangeLevel(_id, label)}
    className={classes.container}
  >
    <img src={src} alt={label} className={classes.icon} />
  </div>
)

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  onChangeLevel: PropTypes.func.isRequired,
}

export default Icon
