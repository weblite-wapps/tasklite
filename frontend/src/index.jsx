// modules
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// components
import Root from './setup/root'

const renderTasklite = () =>
  render(
    <AppContainer>
      <Root />
    </AppContainer>,
    window.document.getElementById('root'),
  )

renderTasklite()

// Hot Module Replacement API
if (module.hot) module.hot.accept('./setup/root', renderTasklite)
