// modules
import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress } from 'material-ui/Progress'
// scssClasses
import scssClasses from './AppBar.scss'


export const ActionButton = ({ expandMode, changeExpandMode, label, src }) => (
  <div
    role="button"
    tabIndex="0"
    onClick={() => expandMode === label ? changeExpandMode('default') : changeExpandMode(label)}
    className={scssClasses.actions}
  >
    <img alt={label} src={src} className={scssClasses.icon} />
  </div>
)

ActionButton.propTypes = {
  expandMode: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  changeExpandMode: PropTypes.func.isRequired,
}


export const LeftSide = ({ isLoading }) => (
  <div className={scssClasses.leftHand}>
    <div
      className={scssClasses.logoContainer}
      role="button"
      tabIndex="0"
    >
      <div className={isLoading ? scssClasses.loading : scssClasses.normal}>
        <CircularProgress size={40} color="primary" className={scssClasses.progress} />
        <img alt="loglite logo" src="assets/toplogo.png" className={scssClasses.logo} />
      </div>
    </div>
    <img alt="loglite logo" src="assets/typo.png" className={scssClasses.typo} />
  </div>
)

LeftSide.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}
