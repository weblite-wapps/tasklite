// modules
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// components
import Root from './root'


const renderLoglite = () => render(
  <AppContainer>
    <Root
      tasks={
        [
          {
            _id: 'dkqwokdok1o23k12k3o12k3',
            title: 'refactoring loglite',
            tags: ['refactor', 'loglite'],
            deadline: '2018-03-14T16:59:30.866Z',
            sentTime: '2018-03-14T16:59:30.866Z',
            priority: 1,
            level: 'ICE BOX',
            functor: 'Mostafa',
          },
          {
            _id: 'dkqwokdok1o23k12k3o12f4',
            title: 'handle message microservice bugs',
            tags: ['bug', 'backend', 'weblite-web'],
            deadline: '2018-03-15T16:59:30.866Z',
            sentTime: '2018-03-16T16:59:30.866Z',
            priority: 2,
            level: 'IN PROGRESS',
            functor: 'Ali',
          },
        ]
      }
    />
  </AppContainer>,
  window.document.getElementById('root'),
)

renderLoglite()

// Hot Module Replacement API
if (module.hot) module.hot.accept('./root', renderLoglite)
