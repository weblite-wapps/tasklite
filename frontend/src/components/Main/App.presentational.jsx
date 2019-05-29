// Modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// components
import { Logo, TabBar } from './App.helper.component'
// styles
import './App.scss'
import styles from './App.style' 

const App = class extends React.Component {
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
        <Logo {...this.props} />
        <TabBar {...this.props} />
      </div>
    )
  }
}

App.propTypes = {
  fetchInitialData: PropTypes.func.isRequired,
  setAPI: PropTypes.func.isRequired,
}

export default withStyles(styles)(App)