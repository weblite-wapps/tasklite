// modules
import * as R from 'ramda'
import jMoment from 'moment-jalaali'
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
  CHANGE_ASSIGNEE_IN_ADD,
  RESET_INPUTS,
  CHANGE_IS_ERROR,
  CHANGE_IS_OPEN_ADD_DIALOG,
} from './Add.action'
// state
const initialState = {
  title: '',
  priority: '',
  deadline: null,
  queryTag: '',
  suggestions: [],
  selectedTags: [],
  assignee: {},
  tags: [],
  isError: {
    assignee: false,
    title: false,
    deadline: false,
  },
  isOpenAddDialog: false,
}

// lens
const titleLens = R.lensProp('title')
const priorityLens = R.lensProp('priority')
const deadlineLens = R.lensProp('deadline')
const queryTagLens = R.lensProp('queryTag')
const suggestionsLens = R.lensProp('suggestions')
const isErrorLens = R.lensProp('isError')
// views
export const titleView = () => R.path(['Add', 'title'])(getState())
export const priorityView = () => R.path(['Add', 'priority'])(getState())
export const deadlineView = () => R.path(['Add', 'deadline'])(getState())
export const queryTagView = () => R.path(['Add', 'queryTag'])(getState())
export const selectedTagsView = () =>
  R.path(['Add', 'selectedTags'])(getState())
export const assigneeView = () => R.path(['Add', 'assignee'])(getState())
export const tagsView = () => R.path(['Add', 'tags'])(getState())
export const isErrorView = () => R.path(['Add', 'isError'])(getState())
export const isOpenAddDialogView = () =>
  R.path(['Add', 'isOpenAddDialog'])(getState())

// reducers
const reducers = {
  [CHANGE_DEADLINE]: (state, value) => R.set(deadlineLens, value, state),

  [CHANGE_TITLE]: (state, value) => R.set(titleLens, value, state),

  [CHANGE_PRIORITY]: (state, value) => R.set(priorityLens, value, state),

  [LOAD_TAGS_DATA_IN_ADD]: (state, { tags }) => ({
    ...state,
    tags: R.map(tag => R.assoc('isSelected', false, tag), tags),
  }),

  [SET_QUERY_TAG_IN_ADD]: (state, queryTag) =>
    R.set(queryTagLens, queryTag)(state),

  [FETCH_TAGS_IN_ADD]: (state, { tags }) => R.set(suggestionsLens, tags, state),

  [ADD_TAG_IN_ADD]: state => ({
    ...state,
    selectedTags: R.append(R.toLower(state.queryTag), state.selectedTags),
    tags: R.append(
      {
        label: R.toLower(state.queryTag),
        _id: state.tags.length,
        isSelected: true,
      },
      state.tags,
    ),
    queryTag: '',
  }),

  [CHANGE_SELECTED_TAGS_IN_ADD]: (state, tag) => ({
    ...state,
    selectedTags: tag.isSelected
      ? R.remove(
          R.indexOf(tag.label, state.selectedTags),
          1,
          state.selectedTags,
        )
      : R.append(tag.label, state.selectedTags),
    tags: R.map(
      eachTag =>
        eachTag._id === tag._id
          ? {
              ...eachTag,
              isSelected: !eachTag.isSelected,
            }
          : eachTag,
      state.tags,
    ),
  }),

  [CHANGE_ASSIGNEE_IN_ADD]: (state, { id, name }) => ({
    ...state,
    assignee:
      state.assignee.id === id
        ? {}
        : {
            id,
            name,
          },
  }),

  [RESET_INPUTS]: state => ({
    ...state,
    title: '',
    priority: '',
    deadline: null,
    selectedTags: [],
    assignee: {
      name: '',
      id: '',
    },
    queryTag: '',
  }),

  [CHANGE_IS_ERROR]: (state, { value }) => R.set(isErrorLens, value, state),

  [CHANGE_IS_OPEN_ADD_DIALOG]: (state, value) => ({
    ...state,
    isOpenAddDialog: value,
  }),
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
