// modules
import * as R from 'ramda'


export const getToggledValue = (task, todoId) =>
  R.compose(
    R.prop('completed'),
    R.find(R.propEq('_id', todoId)),
    R.prop('todos'),
  )(task)

export const calcNewIndexInDb = (desIndexInDb, desSiblingIndexInDb) => {
  if (desIndexInDb && desSiblingIndexInDb)
    return (desIndexInDb + desSiblingIndexInDb) / 2
}