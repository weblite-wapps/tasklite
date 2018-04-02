// modules
import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress } from 'material-ui/Progress'
import IconButton from 'material-ui/IconButton'
import SortIcon from 'material-ui-icons/Sort'
import ExitIcon from 'material-ui-icons/ExitToApp'
// scssClasses
import scssClasses from './AppBar.scss'


export const Logo = ({ isLoading, setAboutMode }) => (
  <React.Fragment>
    <div
      onClick={() => setAboutMode(true)}
      className={scssClasses.logoContainer}
      role="button"
      tabIndex="0"
    >
      <div className={isLoading ? scssClasses.loading : scssClasses.normal}>
        <CircularProgress size={40} color="primary" className={scssClasses.progress} />
        <img alt="loglite logo" src="assets/toplogo.png" className={scssClasses.logo} />
      </div>
    </div>
  </React.Fragment>
)

Logo.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setAboutMode: PropTypes.func.isRequired,
}


export const TabBar = props => (
  <div className={scssClasses.tabBar}>
    <img alt="loglite logo" src="assets/typo.png" className={scssClasses.typo} />
    <div className={scssClasses.iconsContainer}>
      {
        props.creator && !props.aboutMode &&
          <React.Fragment>
            <IconButton onClick={() => props.changeExpandMode('sort')}>
              <SortIcon style={{ width: '25px', height: '25px' }} />
            </IconButton>
            <span style={{ width: '15px' }} />
            <ActionButton {...props} label="add" src="assets/icons/plus.png" />
            <span style={{ width: '15px' }} />
            <ActionButton {...props} label="filter" src="assets/icons/filter.png" />
          </React.Fragment>
      }
      {
        props.aboutMode &&
          <IconButton onClick={() => props.setAboutMode(false)}>
            <ExitIcon style={{ width: '25px', height: '25px' }} />
          </IconButton>
      }
    </div>
  </div>
)

TabBar.propTypes = {
  mode: PropTypes.string.isRequired,
  creator: PropTypes.bool.isRequired,
  aboutMode: PropTypes.bool.isRequired,
  changeExpandMode: PropTypes.func.isRequired,
  setAboutMode: PropTypes.func.isRequired,
}

TabBar.defaultProps = {
  mode: '',
}


const ActionButton = ({ expandMode, changeExpandMode, label, src }) => (
  <div
    role="button"
    tabIndex="0"
    onClick={() => expandMode === label ? changeExpandMode('default') : changeExpandMode(label)}
    className={scssClasses.imageContainer}
  >
    <img alt={label} src={src} className={scssClasses.image} />
  </div>
)

ActionButton.propTypes = {
  expandMode: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  changeExpandMode: PropTypes.func.isRequired,
}
