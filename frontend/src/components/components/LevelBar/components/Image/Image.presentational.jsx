// modules
import React from 'react'
import PropTypes from 'prop-types'
// styles
import classes from './Image.scss'

const Image = ({ tabIndex, src, label, onTabClick }) => (
  <div role="button" tabIndex="0" onClick={() => onTabClick(label)} className={classes.container}>
    <img
      src={src}
      alt={label}
      className={tabIndex === label ? classes.active : classes.passive}
    />
  </div>
)

Image.propTypes = {
  tabIndex: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
}

export default Image
