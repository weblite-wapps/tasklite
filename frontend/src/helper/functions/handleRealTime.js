import { dispatchFetchInitialData } from "../../components/components/Home/Home.action";

const { W } = window


// W.share.subscribe((data) => console.log(data))
W.share.subscribe(() => dispatchFetchInitialData())

export const pulse = () => {
  // console.log("W ", W)
  console.log('updated')
  W.share.dispatch([], ['__always', ["new data"]], "")
}
