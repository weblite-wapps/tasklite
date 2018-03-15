// modules
import React from 'react'
import PropTypes from 'prop-types'
// styles
import classes from './Icon.scss'

const Image = ({ src, label, id }) => (
  // <div role="button" tabIndex="0" onClick={() => onChangeLevel(label, id)} className={classes.container}>
  <div role="button" tabIndex="0" className={classes.container}>
    <img
      src={src}
      alt={label}
      className={classes.icon}
    />
  </div>
)

Image.propTypes = {
  // tabIndex: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  // onTabClick: PropTypes.func.isRequired,
}

export default Image
