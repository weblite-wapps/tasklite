// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../../setup/redux'
// actions
import {
  CHANGE_DEADLINE,
  LOAD_TAGS_DATA_IN_ADD,
  LOAD_USERS_DATA_IN_ADD,
  CHANGE_TITLE,
  CHANGE_ASSIGNEE,
  CHANGE_PRIORITY,
  SET_QUERY_TAG_IN_ADD,
  SET_QUERY_USER_IN_ADD,
  FETCH_TAGS_IN_ADD,
  FETCH_USERS_IN_ADD,
  ADD_TAG_IN_ADD,
  ADD_USER_IN_ADD,
  CHANGE_SELECTED_TAGS_IN_ADD,
  CHANGE_SELECTED_USER_IN_ADD,
  RESET_INPUTS,
} from './Add.action'

// state
const initialState = {
  title: '',
  priority: 1,
  deadline: '',
  queryTag: '',
  queryUser: '',
  tagSuggestions: [],
  userSuggestions: [],
  selectedTags: [],
  selectedUser: '',
  tags: [],
  users: [],
}


// lens
const titleLens = R.lensProp('title')
const assigneeLens = R.lensProp('assignee')
const priorityLens = R.lensProp('priority')
const deadlineLens = R.lensProp('deadline')
const queryTagLens = R.lensProp('queryTag')
const queryUserLens = R.lensProp('queryUser')
const tagSuggestionsLens = R.lensProp('tagSuggestions')
const userSuggestionsLens = R.lensProp('userSuggestions')
const usersLens = R.lensProp('users')
// views
export const titleView = () => R.path(['Add', 'title'])(getState())
export const assigneeView = () => R.path(['Add', 'assignee'])(getState())
export const priorityView = () => R.path(['Add', 'priority'])(getState())
export const deadlineView = () => R.path(['Add', 'deadline'])(getState())
export const queryTagView = () => R.path(['Add', 'queryTag'])(getState())
export const queryUserView = () => R.path(['Add', 'queryUser'])(getState())
export const selectedTagsView = () => R.path(['Add', 'selectedTags'])(getState())
export const selectedUserView = () => R.path(['Add', 'selectedUser'])(getState())
export const tagsView = () => R.path(['Add', 'tags'])(getState())
export const usersView = () => R.path(['Add', 'users'])(getState())

// reducers
const reducers = {
  [CHANGE_DEADLINE]: (state, { value }) => R.set(deadlineLens, value, state),

  [LOAD_TAGS_DATA_IN_ADD]: (state, { tags }) => ({ ...state,
    tags: R.map(tag => R.assoc('isSelected', false, tag), tags),
  }),

  [LOAD_USERS_DATA_IN_ADD]: (state, { users }) => R.set(usersLens, users, state),

  [CHANGE_TITLE]: (state, { value }) => R.set(titleLens, value, state),

  [CHANGE_ASSIGNEE]: (state, { value }) => R.set(assigneeLens, value, state),

  [CHANGE_PRIORITY]: (state, { value }) => R.set(priorityLens, value, state),

  [SET_QUERY_TAG_IN_ADD]: (state, { queryTag }) => R.set(queryTagLens, queryTag)(state),

  [SET_QUERY_USER_IN_ADD]: (state, { queryUser }) => R.set(queryUserLens, queryUser)(state),

  [FETCH_TAGS_IN_ADD]: (state, { tags }) => R.set(tagSuggestionsLens, tags, state),

  [FETCH_USERS_IN_ADD]: (state, { users }) => R.set(userSuggestionsLens, users, state),

  [ADD_TAG_IN_ADD]: state => ({ ...state,
    selectedTags: R.append(R.toLower(state.queryTag), state.selectedTags),
    tags: R.append(
      { label: R.toLower(state.queryTag),
        _id: state.tags.length,
        isSelected: true },
      state.tags),
    queryTag: '',
  }),

  [ADD_USER_IN_ADD]: state => ({ ...state,
    selectedUser: R.toLower(state.queryUser),
    users: R.append({ name: R.toLower(state.queryUser), _id: state.users.length }, state.users),
    queryUser: '',
  }),

  [CHANGE_SELECTED_TAGS_IN_ADD]: (state, { tag }) => ({ ...state,
    selectedTags: tag.isSelected ?
      R.remove(R.indexOf(tag.label, state.selectedTags), 1, state.selectedTags) :
      R.append(tag.label, state.selectedTags),
    tags: R.map(eachTag => (eachTag._id === tag._id) ?
      { ...eachTag, isSelected: !eachTag.isSelected } : eachTag, state.tags),
  }),

  [CHANGE_SELECTED_USER_IN_ADD]: (state, { user }) => ({ ...state,
    selectedUser: user.name,
  }),

  [RESET_INPUTS]: state =>
    ({ ...state,
      title: '',
      priority: '',
      deadline: '',
      selectedTags: [],
      selectedUsers: [],
      queryTag: '',
      queryUser: '',
    }),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
