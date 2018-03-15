// modules
import * as R from 'ramda'

export const formattedTitle = name => name.length > 20 ? `${R.slice(0, 20, name)}...` : name
