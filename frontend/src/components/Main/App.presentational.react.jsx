// Modules
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { CircularProgress } from 'material-ui/Progress'
// local modules
import Snackbar from 'weblite-web-snackbar'
// components
import TaskList from '../components/List/main/List.container.react'
import LevelBar from '../components/LevelBar/main/LevelBar.container.react'
// css
import scssClasses from './App.scss'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.goToAbout = this._goToAbout.bind(this)
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

  _goToAbout() {
    this.props.history.push('/About')
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
    const { tasks, isLoading, tabIndex } = this.props
    return (
      <div className={scssClasses.app}>
        <div className={scssClasses.appBar}>
          <div className={scssClasses.leftHand}>
            <div
              className={scssClasses.logoContainer}
              onClick={this.goToAbout}
              role="button"
              tabIndex="0"
            >
              <div className={isLoading ? scssClasses.loading : scssClasses.normal}>
                <CircularProgress size={40} color="primary" className={scssClasses.progress} />
                <img alt="loglite logo" src="assets/toplogo.png" className={scssClasses.logo} />
              </div>
            </div>
            <div>
              <img alt="loglite logo" src="assets/typo.png" className={scssClasses.typo} />
            </div>
          </div>
          <div className={scssClasses.rightHand}>
            <div>
              <img alt="add" src="assets/icons/plus.png" className={scssClasses.icon} />
            </div>
            <div>
              <img alt="filter" src="assets/icons/filter.png" className={scssClasses.icon} />
            </div>
          </div>
        </div>
        <LevelBar />
        {tasks.filter(task => task.level === tabIndex)
          .map(task => (<TaskList key={task._id} task={task} />))}
        <Snackbar location={{ vertical: 'bottom', horizontal: 'right' }} />
      </div>
    )
  }
}


App.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  tabIndex: PropTypes.string.isRequired,
  fetchTodayData: PropTypes.func.isRequired,
  setAPI: PropTypes.func.isRequired,
  checkToSetSecondsElapsed: PropTypes.func.isRequired,
}

export default withRouter(App)
