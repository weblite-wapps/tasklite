// import { dispatchFetchInitialData } from "../../components/components/Home/Home.action";

const { W } = window
// export const dispatch = qlite => W.share.dispatch([], qlite, [])

// W.share.subscribe(() => console.log('new data received'))
// W.share.subscribe(() => dispatchFetchInitialData())

export const pulse = () => {
  console.log('updated')
  // dispatch('Data updated!')
}
