// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../setup/redux'
// actions
import {
  SET_API,
  RESET_STAFF_LOGS,
  LOAD_STAFF_LOGS,
  LOAD_TAGS_DATA_IN_REPORT,
  SET_QUERY_TAG,
  FETCH_TAGS,
  ADD_TAG,
  CHANGE_SELECTED_TAGS,
  CALCULATE_TOTAL_DURATION,
  RESTORE_TOTAL_DUARTION,
  CHANGE_SELECTED_USER,
  SET_QUERY_ASSIGNEE,
} from './Filter.action'

// state
const initialState = {
  staffLogs: [],
  selectedUser: '',
  queryTag: '',
  queryAssignee: '',
  suggestions: [],
  assigneeSuggestions: [],
  selectedTags: [],
  tags: [],
  assignees: [],
}

// lens
const selectedUserLens = R.lensProp('selectedUser')
const queryTagLens = R.lensProp('queryTag')
const queryAssigneeLens = R.lensProp('queryAssignee')
const suggestionsLens = R.lensProp('suggestions')
const assigneeSuggestionsLens = R.lensProp('assigneeSuggestions')
// views
export const staffLogsView = () => R.path(['Filter', 'staffLogs'])(getState())
export const selectedUserView = () => R.path(['Filter', 'selectedUser'])(getState())
export const queryTagView = () => R.path(['Filter', 'queryTag'])(getState())
export const queryAssigneeView = () => R.path(['Filter', 'queryAssignee'])(getState())
export const selectedTagsView = () => R.path(['Filter', 'selectedTags'])(getState())
export const tagsView = () => R.path(['Filter', 'tags'])(getState())
export const assigneesView = () => R.path(['Filter', 'assignees'])(getState())


// reducers
const reducers = {
  [SET_API]: (state, { user }) => ({ ...state, selectedUser: user.id }),

  [RESET_STAFF_LOGS]: (state, { userId }) => ({ ...state,
    staffLogs: [],
    pages:
      R.mapObjIndexed((num, key) => key === userId ? num : {}, state.pages),
  }),

  [LOAD_STAFF_LOGS]: (state, { logs }) => ({ ...state,
    staffLogs: R.concat(state.staffLogs,
      R.map(log => ({ ...log,
        popoverIsOpen: false,
      }), logs)),
  }),

  [LOAD_TAGS_DATA_IN_REPORT]: (state, { tags }) => ({ ...state,
    tags: R.map(tag => R.assoc('isSelected', false, tag), tags),
  }),

  [SET_QUERY_TAG]: (state, { value }) => R.set(queryTagLens, value)(state),

  [SET_QUERY_ASSIGNEE]: (state, { value }) => R.set(queryAssigneeLens, value)(state),

  [FETCH_TAGS]: (state, { tags }) => R.set(suggestionsLens, tags, state),

  [ADD_TAG]: state => ({ ...state,
    selectedTags: R.append(R.toLower(state.queryTag), state.selectedTags),
    tags: R.append(
      { label: R.toLower(state.queryTag),
        _id: state.tags.length,
        isSelected: true },
      state.tags),
    queryTag: '',
  }),

  [CHANGE_SELECTED_TAGS]: (state, { tag }) => ({ ...state,
    selectedTags: tag.isSelected ?
      R.remove(R.indexOf(tag.label, state.selectedTags), 1, state.selectedTags) :
      R.append(tag.label, state.selectedTags),
    tags: R.map(eachTag => (eachTag._id === tag._id) ?
      { ...eachTag, isSelected: !eachTag.isSelected } : eachTag, state.tags),
  }),

  [CALCULATE_TOTAL_DURATION]: state => R.set(totalDurationLens, 'calculating', state),

  [RESTORE_TOTAL_DUARTION]:
    (state, { totalDuration }) => R.set(totalDurationLens, totalDuration, state),

  [CHANGE_SELECTED_USER]: (state, { value }) => R.set(selectedUserLens, value)(state),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
