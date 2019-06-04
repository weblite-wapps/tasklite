const { W } = window
const dispatch = qlite => W.share.dispatch([], qlite, [])

export const pulse = () => dispatch('Data updated!')

// W.share.subscribe(() => console.log('new data received'))
