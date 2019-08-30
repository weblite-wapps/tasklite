// modules
import * as R from 'ramda'
import jMoment from 'moment-jalaali'
// local modules
import { getState } from '../../../../setup/redux'
// actions
import {
  INSERT_TASK,
  CHANGE_EDIT_TITLE,
  CHANGE_EDIT_DEADLINE,
  CHANGE_EDIT_ASSIGNEE,
  CHANGE_EDIT_PRIORITY,
  CHANGE_TITLE_IS_ERROR,
  CHANGE_IS_OPEN_DIALOG,
  FETCH_TAGS_IN_EDIT,
  CHANGE_SELECTED_TAGS_IN_EDIT,
  LOAD_TAGS_DATA_IN_EDIT,
  UPDATE_TAGS_DATA_IN_EDIT,
  SET_TAG_QUERY_IN_EDIT,
  HANDLE_ADD_TAG_IN_EDIT,
} from './Edit.action'

// state
const initialState = {
  task: {},
  title: '',
  deadline: null,
  assignee: '',
  priority: '',
  isError: { title: false },
  anchorEl: null,
  popoverId: '',
  isOpenDialog: false,
  queryTag: '',
  suggestions: [],
  selectedTags: [],
  tags: [],
}

// lens
const queryTagLens = R.lensProp('queryTag')
const suggestionsLens = R.lensProp('suggestions')

// views
export const taskView = () => R.path(['Edit', 'task'])(getState())
export const titleView = () => R.path(['Edit', 'title'])(getState())
export const deadlineView = () => R.path(['Edit', 'deadline'])(getState())
export const assigneeView = () => R.path(['Edit', 'assignee'])(getState())
export const priorityView = () => R.path(['Edit', 'priority'])(getState())
export const isErrorView = () => R.path(['Edit', 'isError'])(getState())
export const anchorElView = () => R.path(['Edit', 'anchorEl'])(getState())
export const popoverIdView = () => R.path(['Edit', 'popoverId'])(getState())
export const isOpenDialogView = () =>
  R.path(['Edit', 'isOpenDialog'])(getState())

export const queryTagView = () => R.path(['Edit', 'queryTag'])(getState())
export const selectedTagsView = () =>
  R.path(['Edit', 'selectedTags'])(getState())
export const tagsView = () => R.path(['Edit', 'tags'])(getState())
// reducers
const reducers = {
  [INSERT_TASK]: (state, task) => ({
    ...state,
    task,
    title: R.prop('title', task),
    assignee: R.prop('assignee', task),
    selectedTags: R.prop('tags', task),
    priority: R.prop('priority', task),
    deadline: R.prop('deadline', task)
      ? jMoment(R.prop('deadline', task))
      : null,
  }),

  [CHANGE_EDIT_TITLE]: (state, title) => ({
    ...state,
    title,
  }),

  [CHANGE_EDIT_DEADLINE]: (state, deadline) => ({
    ...state,
    deadline,
  }),

  [CHANGE_EDIT_ASSIGNEE]: (state, assignee) => ({
    ...state,
    assignee,
  }),

  [CHANGE_EDIT_PRIORITY]: (state, priority) => ({
    ...state,
    priority,
  }),

  [CHANGE_TITLE_IS_ERROR]: (state, value) => ({
    ...state,
    isError: {
      ...state.isError,
      title: value,
    },
  }),

  [CHANGE_IS_OPEN_DIALOG]: (state, value) => ({
    ...state,
    isOpenDialog: value,
  }),

  [LOAD_TAGS_DATA_IN_EDIT]: (state, { tags }) => ({
    ...state,
    tags: R.map(tag => R.assoc('isSelected', false, tag), tags),
  }),

  [UPDATE_TAGS_DATA_IN_EDIT]: (state, { tags }) => ({
    ...state,
    tags: R.map(
      tag => R.assoc('isSelected', R.includes(tag.label, tags), tag),
      state.tags,
    ),
  }),

  [FETCH_TAGS_IN_EDIT]: (state, { tags }) =>
    R.set(suggestionsLens, tags, state),

  [SET_TAG_QUERY_IN_EDIT]: (state, queryTag) =>
    R.set(queryTagLens, queryTag)(state),

  [HANDLE_ADD_TAG_IN_EDIT]: state =>
    !R.includes(state.queryTag, state.selectedTags)
      ? {
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
        }
      : state,

  [CHANGE_SELECTED_TAGS_IN_EDIT]: (state, tag) => ({
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
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
