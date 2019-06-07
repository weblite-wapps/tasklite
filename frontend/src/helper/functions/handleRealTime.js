import { dispatchFetchInitialData } from '../../components/components/Home/Home.action'

const { W } = window

W.share.subscribe(() => dispatchFetchInitialData())

export const pulse = () => {
  W.share.dispatch([], ['__always', ['new data']], '')
}
