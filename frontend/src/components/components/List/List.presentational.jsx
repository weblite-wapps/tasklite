// modules
import React from 'react'
// import PropTypes from 'prop-types'
// import { findDOMNode } from 'react-dom'
// import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
// import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
// import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
// local modules
// import { snackbarMessage } from 'weblite-web-snackbar'
// icons
import FolderIcon from 'material-ui-icons/Folder'
import DeleteIcon from 'material-ui-icons/Delete'


class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // anchorEl: null,
    }
  }

  render() {
    return (
      <div>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Single-line item"
              secondary="kind of shit"
            />
            <ListItemSecondaryAction>
              <IconButton aria-label="Delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Divider light />
      </div>
    )
  }
}

TaskList.propTypes = {
}

export default TaskList
