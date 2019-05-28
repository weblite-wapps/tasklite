// modules
import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
// styles
import './Icon.scss'

const Icon = ({ src, label, onChangeLevel }) => (
  <Tooltip enterDelay={150} leaveDelay={150} placement="bottom" title={label}>
    <div
      className="c--icon_container"
      role="button"
      tabIndex="0"
      onClick={onChangeLevel}
    >
      <img className="c--icon_icon" src={src} alt={label} />
    </div>
  </Tooltip>
)

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChangeLevel: PropTypes.func.isRequired,
}

export default Icon
