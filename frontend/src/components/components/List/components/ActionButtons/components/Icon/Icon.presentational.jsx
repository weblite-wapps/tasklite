// modules
import React from 'react'
import PropTypes from 'prop-types'
// styles
import scssClasses from './Icon.scss'

const Icon = ({ src, label, onChangeLevel }) => (
  <div
    className={scssClasses.container}
    role="button"
    tabIndex="0"
    onClick={onChangeLevel}
  >
    <img className={scssClasses.icon} src={src} alt={label} />
  </div>
)

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChangeLevel: PropTypes.func.isRequired,
}

export default Icon
