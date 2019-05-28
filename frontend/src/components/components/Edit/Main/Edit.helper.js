import * as R from 'ramda'
import { usersView } from '../../../Main/App.reducer'

export const getUserInfo = R.compose(
    id => R.find(R.propEq('id', id), usersView()),
    R.prop('userId'),
)

export default null