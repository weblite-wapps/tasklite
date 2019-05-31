// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../setup/redux'
// actions
import {
  LOAD_TAGS_DATA_IN_FILTER,
  SET_QUERY_TAG_IN_FILTER,
  FETCH_TAGS_IN_FILTER,
  ADD_TAG_IN_FILTER,
  CHANGE_SELECTED_TAGS_IN_FILTER,
  CHANGE_ASSIGNEE_IN_FILTER,
} from './Filter.action'

// state
const initialState = {
  queryTag: '',
  suggestions: [],
  selectedTags: [],
  assignee: {},
  tags: [],
}

// lens
const queryTagLens = R.lensProp('queryTag')
const suggestionsLens = R.lensProp('suggestions')
// views
export const queryTagView = () => R.path(['Filter', 'queryTag'])(getState())
export const selectedTagsView = () => R.path(['Filter', 'selectedTags'])(getState())
export const tagsView = () => R.path(['Filter', 'tags'])(getState())
export const assigneeView = () => R.path(['Filter', 'assignee'])(getState())

// reducers
const reducers = {
  [LOAD_TAGS_DATA_IN_FILTER]: (state, tags) => ({ ...state,
    tags: R.map(tag => R.assoc('isSelected', false, tag), tags),
  }),

  [SET_QUERY_TAG_IN_FILTER]: (state, queryTag) => R.set(queryTagLens, queryTag)(state),

  [FETCH_TAGS_IN_FILTER]: (state, tags) => R.set(suggestionsLens, tags, state),

  [ADD_TAG_IN_FILTER]: state => ({ ...state,
    selectedTags: R.append(R.toLower(state.queryTag), state.selectedTags),
    tags: R.append(
      { label: R.toLower(state.queryTag),
        _id: state.tags.length,
        isSelected: true },
      state.tags),
    queryTag: '',
  }),

  [CHANGE_SELECTED_TAGS_IN_FILTER]: (state, tag) => ({ ...state,
    selectedTags: tag.isSelected ?
      R.remove(R.indexOf(tag.label, state.selectedTags), 1, state.selectedTags) :
      R.append(tag.label, state.selectedTags),
    tags: R.map(eachTag => (eachTag._id === tag._id) ?
      { ...eachTag, isSelected: !eachTag.isSelected } : eachTag, state.tags),
  }),

  [CHANGE_ASSIGNEE_IN_FILTER]: (state, { id, name }) => ({
    ...state,
    assignee: state.assignee.id === id ? {} : { id, name },
  }),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
