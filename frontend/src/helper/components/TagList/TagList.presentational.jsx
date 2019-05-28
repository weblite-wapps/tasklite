// modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import TagShape from '../TagShape/TagShape.presentational'
// styles
import './TagList.scss'


const TagList = ({ tags, onTagClick }) => (
  <div className="c--tagList_container">
    {tags.map(tag => (
      <TagShape key={tag._id} tag={tag} onTagClick={() => onTagClick(tag)} />
     ))}
  </div>
)

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTagClick: PropTypes.func.isRequired,
}

export default TagList
