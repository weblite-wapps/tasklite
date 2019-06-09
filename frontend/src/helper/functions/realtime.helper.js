import { dispatchHandleRealTime } from '../../components/components/Home/Home.action'

const { W } = window

W && W.share.subscribe(({ type, data }) => dispatchHandleRealTime({ type, data }))

export const pulse = (type, data) => {
  W && W.share.dispatch([], ['__always', [{ type, data }]], {})
}
