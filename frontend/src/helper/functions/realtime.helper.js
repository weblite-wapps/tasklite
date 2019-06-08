import { dispatchFetchAllUsers, dispatchDeleteTask } from '../../components/components/Home/Home.action'

const { W } = window

W && W.share.subscribe(({type, data}) => {
  type === 'ADD_TASK' ? dispatchFetchSingleTask(data) :
  type === 'DELETE_TASK'? dispatchDeleteTask(data) 
  
})

export const pulse = (type, data) => {
  W && W.share.dispatch([], ['__always', ['new data']], '')
}
