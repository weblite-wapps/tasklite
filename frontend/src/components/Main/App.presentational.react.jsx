// Modules
import React from 'react'
import PropTypes from 'prop-types'
// local modules
import Snackbar from 'weblite-web-snackbar'
// components
import LevelBar from '../components/LevelBar/main/LevelBar.container.react'
import Add from '../components/Add/Add.container.react'
import Filter from '../components/Filter/Filter.container.react'
// helpers
import { Collapse, TaskList, LoadMore } from './App.helper.component'
// css
import scssClasses from './App.scss'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.handleWappMode = this._handleWappMode.bind(this)
    this.handleNormalMode = this._handleNormalMode.bind(this)
  }

  componentDidMount() {
    if (window.W && window.W.wisId) this.handleWappMode()
    else this.handleNormalMode()
    window.addEventListener('focus', () => this.props.checkToSetSecondsElapsed())
  }

  _handleWappMode() {
    const { setAPI, fetchTodayData } = this.props
    window.W.loadData().then(({ creator, user }) => {
      setAPI(creator, user)
      fetchTodayData()
    })
  }

  _handleNormalMode() {
    const { setAPI, fetchTodayData } = this.props
    setAPI(true, { name: 'Ali', id: '110' })
    fetchTodayData()
  }

  render() {
    return (
      <div className={scssClasses.app}>
        <Collapse {...this.props} label="add"><Add /></Collapse>
        <Collapse {...this.props} label="filter"><Filter /></Collapse>
        <LevelBar noMargin={this.props.expandMode !== 'default'} />
        <TaskList {...this.props} />
        <LoadMore {...this.props} />
        <Snackbar location={{ vertical: 'bottom', horizontal: 'right' }} />
      </div>
    )
  }
}

App.propTypes = {
  expandMode: PropTypes.string.isRequired,
  fetchTodayData: PropTypes.func.isRequired,
  setAPI: PropTypes.func.isRequired,
  checkToSetSecondsElapsed: PropTypes.func.isRequired,
}
