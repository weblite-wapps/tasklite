// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../setup/redux'
// actions
import {
  CHANGE_DEADLINE,
  LOAD_TAGS_DATA_IN_ADD,
  CHANGE_TITLE,
  CHANGE_PRIORITY,
  SET_QUERY_TAG_IN_ADD,
  FETCH_TAGS_IN_ADD,
  ADD_TAG_IN_ADD,
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
  suggestions: [],
  selectedTags: [],
  selectedUser: {},
  tags: [],
}

// lens
const titleLens = R.lensProp('title')
const priorityLens = R.lensProp('priority')
const deadlineLens = R.lensProp('deadline')
const queryTagLens = R.lensProp('queryTag')
const suggestionsLens = R.lensProp('suggestions')
// views
export const titleView = () => R.path(['Add', 'title'])(getState())
export const priorityView = () => R.path(['Add', 'priority'])(getState())
export const deadlineView = () => R.path(['Add', 'deadline'])(getState())
export const queryTagView = () => R.path(['Add', 'queryTag'])(getState())
export const selectedTagsView = () => R.path(['Add', 'selectedTags'])(getState())
export const selectedUserView = () => R.path(['Add', 'selectedUser'])(getState())
export const tagsView = () => R.path(['Add', 'tags'])(getState())

// reducers
const reducers = {
  [CHANGE_DEADLINE]: (state, { value }) => R.set(deadlineLens, value, state),

  [CHANGE_TITLE]: (state, { value }) => R.set(titleLens, value, state),

  [CHANGE_PRIORITY]: (state, { value }) => R.set(priorityLens, value, state),

  [LOAD_TAGS_DATA_IN_ADD]: (state, { tags }) => ({ ...state,
    tags: R.map(tag => R.assoc('isSelected', false, tag), tags),
  }),

  [SET_QUERY_TAG_IN_ADD]: (state, { queryTag }) => R.set(queryTagLens, queryTag)(state),

  [FETCH_TAGS_IN_ADD]: (state, { tags }) => R.set(suggestionsLens, tags, state),

  [ADD_TAG_IN_ADD]: state => ({ ...state,
    selectedTags: R.append(R.toLower(state.queryTag), state.selectedTags),
    tags: R.append(
      { label: R.toLower(state.queryTag),
        _id: state.tags.length,
        isSelected: true },
      state.tags),
    queryTag: '',
  }),

  [CHANGE_SELECTED_TAGS_IN_ADD]: (state, { tag }) => ({ ...state,
    selectedTags: tag.isSelected ?
      R.remove(R.indexOf(tag.label, state.selectedTags), 1, state.selectedTags) :
      R.append(tag.label, state.selectedTags),
    tags: R.map(eachTag => (eachTag._id === tag._id) ?
      { ...eachTag, isSelected: !eachTag.isSelected } : eachTag, state.tags),
  }),

  [CHANGE_SELECTED_USER_IN_ADD]: (state, { user }) => ({ ...state,
    selectedUser: { name: user.name, id: user.id },
  }),

  [RESET_INPUTS]: state =>
    ({ ...state,
      title: '',
      priority: 1,
      deadline: '',
      selectedTags: [],
      selectedUser: {},
      queryTag: '',
    }),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
