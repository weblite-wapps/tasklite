// Modules
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
// local modules
import Snackbar from 'weblite-web-snackbar'
// components
import AppBar from '../components/AppBar/AppBar.container.react'
import LevelBar from '../components/LevelBar/main/LevelBar.container.react'
import Add from '../components/Add/Main/Add.container.react'
import Filter from '../components/Filter/Filter.container.react'
// helpers
import { Collapse, TaskList } from './App.helper.component'
// css
import scssClasses from './App.scss'


class App extends React.Component {
  constructor(props) {
    super(props)
    // this.goToAbout = this._goToAbout.bind(this)
    this.handleWappMode = this._handleWappMode.bind(this)
    this.handleNormalMode = this._handleNormalMode.bind(this)
  }

  componentDidMount() {
    if (window.W && window.W.wisId) this.handleWappMode()
    else this.handleNormalMode()
    window.addEventListener('focus', () => this.props.checkToSetSecondsElapsed())
  }

  // _handleChangeTab(value) {
  // const { changeTab, history } = this.props
  // this.setState({ aboutMode: false })
  // if (value === 'Home') history.push('/')
  // else history.push(`/${value}`)
  // changeTab(value)
  // }

  // _goToAbout() {
  //   this.props.history.push('/About')
  // }

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
    const { tasks, tabIndex, expandMode } = this.props

    return (
      <div className={scssClasses.app}>
        <AppBar />
        <Collapse expandMode={expandMode} label="add"><Add /></Collapse>
        <Collapse expandMode={expandMode} label="filter"><Filter /></Collapse>
        <LevelBar noMargin={expandMode !== 'default'} />
        <TaskList tasks={tasks} tabIndex={tabIndex} />
        <Snackbar location={{ vertical: 'bottom', horizontal: 'right' }} />
      </div>
    )
  }
}


App.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  // history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  tabIndex: PropTypes.string.isRequired,
  expandMode: PropTypes.string.isRequired,
  fetchTodayData: PropTypes.func.isRequired,
  setAPI: PropTypes.func.isRequired,
  checkToSetSecondsElapsed: PropTypes.func.isRequired,
}

export default withRouter(App)
