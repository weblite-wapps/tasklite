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
            deadline: '2018-03-11T16:59:30.866Z',
            sentTime: '2018-03-20T16:59:30.866Z',
            priority: 1,
            level: 'ICE BOX',
            functor: 'Mostafa',
            todos: [
              { title: 'change namespaces', completed: false },
              { title: 'handle views and lens', completed: true },
            ],
          },
          {
            _id: 'dkqwokdok1o23k12k3o12f4',
            title: 'handle message microservice bugs',
            tags: ['bug', 'backend', 'weblite-web', 'servies'],
            deadline: '2018-03-22T16:59:30.866Z',
            sentTime: '2018-03-21T16:59:30.866Z',
            priority: 2,
            level: 'IN PROGRESS',
            functor: 'Ali',
            todos: [
              { title: 'handle datavase bug', completed: false },
              { title: 'handle kind bug', completed: false },
            ],
          },
          {
            _id: 'dkqwokdok1o23k12k3o12f5',
            title: 'handle message microservice bugs',
            tags: ['bug', 'backend', 'weblite-web'],
            deadline: '2018-03-22T16:59:30.866Z',
            sentTime: '2018-03-21T16:59:30.866Z',
            priority: 3,
            level: 'DONE',
            functor: 'Amirhossein',
            todos: [
              { title: 'handle datavase bug', completed: true },
              { title: 'handle kind bug', completed: true },
            ],
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
