import * as R from 'ramda'
import { usersView } from '../../Home/Home.reducer'

export const getUserInfo = R.compose(
    id => R.find(R.propEq('id', id), usersView()),
    R.prop('userId'),
)

export default null