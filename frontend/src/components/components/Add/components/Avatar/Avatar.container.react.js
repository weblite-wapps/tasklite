// modules
import { connect } from 'react-redux'
// components
import Avatar from './Avatar.presentational'
// actions
import { dispatchChangeSelectedUserInAdd } from '../../Main/Add.action'
// views
import { usersView, selectedUserView } from '../../Main/Add.reducer'


const mapStateToProps = () => ({
  users: usersView(),
  selectedUser: selectedUserView(),
})

const mapDispatchToProps = () => ({ onUserClick: user => dispatchChangeSelectedUserInAdd(user) })

export default connect(mapStateToProps, mapDispatchToProps)(Avatar)
