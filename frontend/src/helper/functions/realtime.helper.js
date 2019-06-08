import { dispatchFetchInitialData } from '../../components/components/Home/Home.action'

const { W } = window

W && W.share.subscribe(() => dispatchFetchInitialData())

export const pulse = () => {
  W && W.share.dispatch([], ['__always', ['new data']], '')
}
