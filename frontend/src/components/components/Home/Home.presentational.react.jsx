// Modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import LevelBar from '../LevelBar/main/LevelBar.container.react'
import Add from '../Add/Add.container.react'
import Filter from '../Filter/Filter.container.react'
// helpers
import { Collapse, TaskList, LoadMore } from './Home.helper.component'
// styles
import './Home.scss'

const Home = props => (
  <div className="c--home_container">
    <Collapse {...props} label="add">
      <Add />
    </Collapse>
    <Collapse {...props} label="filter">
      <Filter />
    </Collapse>
    <LevelBar noMargin={props.expandMode !== 'default'} />
    <TaskList {...props} />
    <LoadMore {...props} />
  </div>
)

Home.propTypes = {
  expandMode: PropTypes.string.isRequired,
}

export default Home