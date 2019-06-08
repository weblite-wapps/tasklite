import { dispatchFetchInitialData } from '../../components/components/Home/Home.action'

const { W } = window

window.W && window.W.share.subscribe(() => dispatchFetchInitialData())

export const pulse = () => {
  window.W && window.W.share.dispatch([], ['__always', ['new data']], '')
}
