// modules
import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
// icons
import SortIcon from '@material-ui/icons/Sort'
import ExitIcon from '@material-ui/icons/ExitToApp'
// styles
import './AppBar.scss'

export const Logo = ({ isLoading, setAboutMode }) => (
  <React.Fragment>
    <div
      onClick={() => setAboutMode(true)}
      className="c--appBar_logoContainer"
      role="button"
      tabIndex="0"
    >
      <div className={isLoading ? "c--appBar_loading" : "c--appBar_normal"}>
        <CircularProgress
          size={40}
          color="primary"
          className="c--appBar_progress"
        />
        <img
          alt="loglite logo"
          src="toplogo.png"
          className="c--appBar_logo"
        />
      </div>
    </div>
  </React.Fragment>
)

Logo.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setAboutMode: PropTypes.func.isRequired,
}

export const TabBar = props => {
  const {
    classes,
    aboutMode,
    setAboutMode,
    sortByDeadline,
    toggleSortByDeadline,
  } = props

  return (
    <div className="c--appBar_tabBar">
      <img alt="loglite logo" src="typo.png" className="c--appBar_typo" />
      <div className="c--appBar_iconsContainer">
        {!aboutMode && (
          <React.Fragment>
            <Tooltip
              enterDelay={150}
              leaveDelay={150}
              placement="bottom"
              title={sortByDeadline ? 'Sort By Priority' : 'Sort By Deadline'}
            >
              <IconButton onClick={toggleSortByDeadline}>
                <SortIcon
                  className={sortByDeadline ? classes.sorted : classes.default}
                />
              </IconButton>
            </Tooltip>

            <span style={{ width: '15px' }} />
            <AdminButton {...props} label="add" src="plus.png" />

            <span style={{ width: '15px' }} />
            <AdminButton {...props} label="filter" src="filter.png" />
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
  classes: PropTypes.shape({}).isRequired,
  aboutMode: PropTypes.bool.isRequired,
  sortByDeadline: PropTypes.bool.isRequired,
  toggleSortByDeadline: PropTypes.func.isRequired,
  setAboutMode: PropTypes.func.isRequired,
}

const AdminButton = ({ expandMode, changeExpandMode, label, src }) => (
  <Tooltip
    enterDelay={300}
    leaveDelay={300}
    placement="bottom"
    title={R.toUpper(label)}
  >
    <div
      role="button"
      tabIndex="0"
      onClick={() =>
        expandMode === label
          ? changeExpandMode('default')
          : changeExpandMode(label)
      }
      className="c--appBar_imageContainer"
    >
      <img className="c--appBar_image" alt={label} src={src} />
    </div>
  </Tooltip>
)

AdminButton.propTypes = {
  expandMode: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  changeExpandMode: PropTypes.func.isRequired,
}
