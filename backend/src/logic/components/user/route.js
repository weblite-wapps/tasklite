// components
import app from '../../../setup/server'
// db helpers
import {
  fetchUsers,
  saveUser,
  countUser
} from './db'
// const
const logger = console.log


app.get('/fetchUsers', (req, res) =>
  fetchUsers({
    wis: req.query.wis
  })
  .then(users => res.json(users))
  .catch(logger))

app.post('/saveUser', ({
  body: {
    wis,
    userId,
    username
  }
}, res) => {
  countUser({
    wis,
    id: userId
  }).then((number) => {
    if (number === 0) {
      saveUser({
          wis,
          name: username,
          id: userId
        })
        .then(user => res.json(user))
        .catch(logger)
    } else res.send('user was saved before!')
  })
})

app.get('/searchUsers', ({
    query: {
      wis,
      name
    }
  }, res) =>
  fetchUsers({
    wis,
    name: {
      $regex: `.*${name}.*`
    }
  })
  .then(users => res.json(users))
  .catch(logger))