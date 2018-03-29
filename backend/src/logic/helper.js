// modules
import * as R from 'ramda'


export const getToggledValue = (task, todoId) =>
  R.compose(
    R.prop('completed'),
    R.find(R.propEq('_id', todoId)),
    R.prop('todos'),
  )(task)

export const nothing = null
