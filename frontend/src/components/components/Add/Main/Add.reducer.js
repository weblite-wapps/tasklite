// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../../setup/redux'
// actions
import {
  CHANGE_DEADLINE,
  CHANGE_START_TIME,
  CHANGE_END_TIME,
  LOAD_TAGS_DATA_IN_ADD,
  CHANGE_TITLE,
  CHANGE_ASSIGNEE,
  CHANGE_PRIORITY,
  SET_QUERY_IN_ADD,
  FETCH_TAGS_IN_ADD,
  ADD_TAG_IN_ADD,
  CHANGE_SELECTED_TAGS_IN_ADD,
  RESET_INPUTS,
} from './Add.action'

// state
const initialState = {
  title: '',
  assignee: '',
  priority: 1,
  deadline: '',
  queryTag: '',
  suggestions: [],
  selectedTags: [],
  tags: [],
}


// lens
const titleLens = R.lensProp('title')
const assigneeLens = R.lensProp('assignee')
const priorityLens = R.lensProp('priority')
const deadlineLens = R.lensProp('deadline')
const queryTagLens = R.lensProp('queryTag')
const suggestionsLens = R.lensProp('suggestions')
// views
export const titleView = () => R.path(['Add', 'title'])(getState())
export const assigneeView = () => R.path(['Add', 'assignee'])(getState())
export const priorityView = () => R.path(['Add', 'priority'])(getState())
export const deadlineView = () => R.path(['Add', 'deadline'])(getState())
export const queryTagView = () => R.path(['Add', 'queryTag'])(getState())
export const selectedTagsView = () => R.path(['Add', 'selectedTags'])(getState())
export const tagsView = () => R.path(['Add', 'tags'])(getState())


// reducers
const reducers = {
  [CHANGE_DEADLINE]: (state, { value }) => R.set(deadlineLens, value, state),

  [CHANGE_START_TIME]: (state, { value }) => R.set(startTimeLens, value, state),

  [CHANGE_END_TIME]: (state, { value }) => R.set(endTimeLens, value, state),

  [LOAD_TAGS_DATA_IN_ADD]: (state, { tags }) => ({ ...state,
    tags: R.map(tag => R.assoc('isSelected', false, tag), tags),
  }),

  [CHANGE_TITLE]: (state, { value }) => R.set(titleLens, value, state),

  [CHANGE_ASSIGNEE]: (state, { value }) => R.set(assigneeLens, value, state),

  [CHANGE_PRIORITY]: (state, { value }) => R.set(priorityLens, value, state),

  [SET_QUERY_IN_ADD]: (state, { queryTag }) => R.set(queryTagLens, queryTag)(state),

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

  [RESET_INPUTS]: state =>
    ({ ...state,
      title: '',
      assignee: '',
      priority: '',
      deadline: '',
      selectedTags: [],
      queryTag: '',
    }),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
