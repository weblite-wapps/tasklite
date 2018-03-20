// modules
import React from 'react'
import { CircularProgress } from 'material-ui/Progress'
// scssClasses
import scssClasses from './AppBar.scss'


export const getActionButton = (expandMode, changeExpandMode, label, src) => (
  <div
    role="button"
    tabIndex="0"
    onClick={() => expandMode === label ? changeExpandMode('default') : changeExpandMode(label)}
    className={scssClasses.actions}
  >
    <img alt={label} src={src} className={scssClasses.icon} />
  </div>
)

export const getLeftHand = isLoading => (
  <div className={scssClasses.leftHand}>
    <div
      className={scssClasses.logoContainer}
      // onClick={this.goToAbout}
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
