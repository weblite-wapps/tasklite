// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Add from '@material-ui/icons/Add'
import Remove from '@material-ui/icons/Remove'
// styles
import './TagShape.scss'


const TagShape = ({ tag: { label, isSelected }, onTagClick }) => (
  <div className="c--tagShape_container" onClick={onTagClick} role="button" tabIndex="0">
    <div className={isSelected ? "c--tagShape_selected" : "c--tagShape_default"}>
      <Typography variant="body1">{ label }</Typography>
    </div> 
    <div className="c--tagShape_icon">
      {isSelected ? <Remove /> : <Add />}
    </div>
  </div>
)

TagShape.propTypes = {
  tag: PropTypes.shape({}).isRequired,
  onTagClick: PropTypes.func.isRequired,
}

export default TagShape
