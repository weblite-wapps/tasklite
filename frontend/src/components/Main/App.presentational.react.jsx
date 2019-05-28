// Modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import LevelBar from '../components/LevelBar/main/LevelBar.container.react'
import Add from '../components/Add/Add.container.react'
import Filter from '../components/Filter/Filter.container.react'
// helpers
import { Collapse, TaskList, LoadMore } from './App.helper.component'
// styles
import './App.scss'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleWappMode = this._handleWappMode.bind(this)
    this.handleNormalMode = this._handleNormalMode.bind(this)
  }

  componentDidMount() {
    if (window.W && window.W.wisId) this.handleWappMode()
    else this.handleNormalMode()
  }

  _handleWappMode() {
    const { setAPI, fetchInitialData } = this.props
    window.W.loadData().then(({ creator, user }) => {
      setAPI(creator, user)
      fetchInitialData()
    })
  }

  _handleNormalMode() {
    const { setAPI, fetchInitialData } = this.props
    setAPI(true, { name: 'Ali', id: '110' })
    fetchInitialData()
  }

  render() {
    return (
      <div className="c--app_container">
        <Collapse {...this.props} label="add">
          <Add />
        </Collapse>
        <Collapse {...this.props} label="filter">
          <Filter />
        </Collapse>
        <LevelBar noMargin={this.props.expandMode !== 'default'} />
        <TaskList {...this.props} />
        <LoadMore {...this.props} />
      </div>
    )
  }
}

App.propTypes = {
  expandMode: PropTypes.string.isRequired,
  fetchInitialData: PropTypes.func.isRequired,
  setAPI: PropTypes.func.isRequired,
}
