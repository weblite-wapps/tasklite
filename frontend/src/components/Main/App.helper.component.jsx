// modules
import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
// icons
import ExitIcon from '@material-ui/icons/ExitToApp'
// styles
import './App.scss'

export const Logo = ({ isLoading, setAboutMode }) => (
  <Tooltip
    title="About"
    placement="bottom"
    enterDelay={150}
    leaveDelay={150}
  >
    <div
      onClick={() => setAboutMode(true)}
      className="c--app_logoContainer"
      role="button"
      tabIndex="0"
    >
      <div className={isLoading ? "c--app_loading" : "c--app_normal"}>
        <CircularProgress
          size={40}
          color="primary"
          className="c--app_progress"
        />
        <img
          alt="loglite logo"
          src="images/toplogo.png"
          className="c--app_logo"
        />
      </div>
    </div>
  </Tooltip>
)

Logo.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setAboutMode: PropTypes.func.isRequired,
}

export const TabBar = props => {
  const {
    aboutMode,
    setAboutMode,
    isFilterActive,
  } = props

  return (
    <div className="c--app_tabBar">
      <img alt="loglite logo" src="images/typo.png" className="c--app_typo" />
      <div className="c--app_iconsContainer">
        {!aboutMode && (
          <React.Fragment>
            <AdminButton {...props} label="add" src="icons/plus.png" />

            <span style={{ width: '15px' }} />
            <AdminButton
              {...props}
              label="filter"
              src={isFilterActive ? "icons/filtered.png" : "icons/filter.png"}
            />
          </React.Fragment>
        )}

        {aboutMode && (
          <Tooltip
            enterDelay={150}
            leaveDelay={150}
            placement="bottom"
            title="APP"
          >
            <IconButton onClick={() => setAboutMode(false)}>
              <ExitIcon style={{ width: '25px', height: '25px' }} />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  )
}

TabBar.propTypes = {
  isFilterActive: PropTypes.bool.isRequired,
  aboutMode: PropTypes.bool.isRequired,
  setAboutMode: PropTypes.func.isRequired,
}

const AdminButton = ({ expandMode, changeExpandMode, label, src, addButtonClick }) => (
  <Tooltip
    enterDelay={300}
    leaveDelay={300}
    placement="bottom"
    title={R.toUpper(label)}
  >
    <div
      role="button"
      tabIndex="0"
      onClick={() => {
        if (label === 'add') addButtonClick()
        else if (expandMode === label) changeExpandMode('default')
        else changeExpandMode(label)
      }}
      className="c--app_imageContainer"
    >
      <img
        className="c--app_image"
        alt={label}
        src={src}
      />
    </div>
  </Tooltip>
)

AdminButton.propTypes = {
  expandMode: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  changeExpandMode: PropTypes.func.isRequired,
}
