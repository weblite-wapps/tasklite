// modules
import { connect } from 'react-redux'
// components
import Icon from './Icon.presentational'
// actions
import { dispatchChangeLevel } from '../../../../../../Main/App.action'
// Views
import { userView, creatorIdView } from '../../../../../../Main/App.reducer'
// helpers
import { getLevel } from '../../../../../../Main/App.helper'

const { W } = window
const { name } = userView()

const mapDispatchToProps = (_, { _id, label, title }) => ({
  onChangeLevel: () => {
    dispatchChangeLevel(_id, getLevel(_id), label)
    if (label === 'DONE') {
      W.sendNotificationToUsers(
        'Tasklite',
        `Task with name ${title} is done by ${name}`,
        '',
        [creatorIdView()],
      )
    }
  },
})

export default connect(
  null,
  mapDispatchToProps,
)(Icon)
