/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./logic/components/tag/db.js":
/*!************************************!*\
  !*** ./logic/components/tag/db.js ***!
  \************************************/
/*! exports provided: fetchTags, saveTag, countTags, updateTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchTags\", function() { return fetchTags; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveTag\", function() { return saveTag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"countTags\", function() { return countTags; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateTag\", function() { return updateTag; });\n/* harmony import */ var _models_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/tag */ \"./models/tag.js\");\n// models\n\n\nconst fetchTags = async query => _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).sort({ number: -1 }).limit(5).exec();\n\nconst saveTag = async tag => new _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tag).save();\n\nconst countTags = async query => _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).count().exec();\n\nconst updateTag = async (query, updateObject) => _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"].update(query, updateObject).exec();\n\n//# sourceURL=webpack:///./logic/components/tag/db.js?");

/***/ }),

/***/ "./logic/components/tag/route.js":
/*!***************************************!*\
  !*** ./logic/components/tag/route.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db */ \"./logic/components/tag/db.js\");\n// modules\n\n// components\n\n// db helpers\n\n// const\nconst logger = console.log;\n\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get('/searchTags', ({ query: { wis, userId, label } }, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"fetchTags\"])({ wis, userId, label: { $regex: `.*${label}.*` } }).then(tags => res.json(tags)).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/saveTags', ({ body: { wis, userId, tags } }, res) => {\n  const addOrUpdateTag = tag => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"countTags\"])({ wis, userId, label: tag }).then(number => {\n    if (number === 0) {\n      Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"saveTag\"])({ label: tag, number: 1, userId, wis });\n    } else Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"updateTag\"])({ label: tag }, { $inc: { number: 1 } });\n  });\n  ramda__WEBPACK_IMPORTED_MODULE_0__[\"forEach\"](addOrUpdateTag, tags);\n  Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"fetchTags\"])({ wis, userId }).then(kinds => res.json(kinds)).catch(logger);\n});\n\n//# sourceURL=webpack:///./logic/components/tag/route.js?");

/***/ }),

/***/ "./logic/components/task/db.js":
/*!*************************************!*\
  !*** ./logic/components/task/db.js ***!
  \*************************************/
/*! exports provided: loadMorefetchTasks, fetchTasks, saveTask, updateTask, deleteTask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadMorefetchTasks\", function() { return loadMorefetchTasks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchTasks\", function() { return fetchTasks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveTask\", function() { return saveTask; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateTask\", function() { return updateTask; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deleteTask\", function() { return deleteTask; });\n/* harmony import */ var _models_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/task */ \"./models/task.js\");\n// models\n\n\nconst loadMorefetchTasks = async ({ query, skipLength }) => _models_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).sort({ deadline: 1 }).limit(5).skip(Number(skipLength)).exec();\n\nconst fetchTasks = async query => _models_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).exec();\n\nconst saveTask = async task => new _models_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"](task).save();\n\nconst updateTask = async (query, updateObject) => _models_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"].update(query, updateObject).exec();\n\nconst deleteTask = async query => _models_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"].remove(query).exec();\n\n//# sourceURL=webpack:///./logic/components/task/db.js?");

/***/ }),

/***/ "./logic/components/task/helper.js":
/*!*****************************************!*\
  !*** ./logic/components/task/helper.js ***!
  \*****************************************/
/*! exports provided: getToggledValue, nothing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getToggledValue\", function() { return getToggledValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nothing\", function() { return nothing; });\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);\n// modules\n\n\nconst getToggledValue = (task, todoId) => ramda__WEBPACK_IMPORTED_MODULE_0__[\"compose\"](ramda__WEBPACK_IMPORTED_MODULE_0__[\"prop\"]('completed'), ramda__WEBPACK_IMPORTED_MODULE_0__[\"find\"](ramda__WEBPACK_IMPORTED_MODULE_0__[\"propEq\"]('_id', todoId)), ramda__WEBPACK_IMPORTED_MODULE_0__[\"prop\"]('todos'))(task);\n\nconst nothing = null;\n\n//# sourceURL=webpack:///./logic/components/task/helper.js?");

/***/ }),

/***/ "./logic/components/task/route.js":
/*!****************************************!*\
  !*** ./logic/components/task/route.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db */ \"./logic/components/task/db.js\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper */ \"./logic/components/task/helper.js\");\n// modules\n\n// components\n\n// db helpers\n\n// helpers\n\n// const\nconst logger = console.log;\n\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/saveTask', (req, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"saveTask\"])(req.body).then(task => res.send(task)).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/deleteTask', (req, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"deleteTask\"])({ _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(req.query._id) }).then(() => res.send('deleted successfully!')).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/changeLevel', ({ body }, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"updateTask\"])({ _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(body._id) }, { $set: { level: body.nextLevel } }).then(() => res.send(body)).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/setSentTime', ({ body: { _id, sentTime } }, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"updateTask\"])({ _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(_id) }, { $set: { sentTime } }).then(() => res.send('sent time set!')).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/toggleTodo', ({ body: { _id, todoId, task } }, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"updateTask\"])({ _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(_id), 'todos._id': todoId }, { $set: { 'todos.$.completed': Object(_helper__WEBPACK_IMPORTED_MODULE_3__[\"getToggledValue\"])(task, todoId) } }).then(() => res.send('toggled successfully!')).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/addTodo', ({ body: { _id, value } }, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"updateTask\"])({ _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(_id) }, { $push: { todos: { $each: [{ title: value, completed: false }], $position: 0 } } }).then(() => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"fetchTasks\"])({ _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(_id) })).then(task => res.send(task)).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/deleteTodo', ({ body: { _id, todoId } }, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"updateTask\"])({ _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(_id) }, { $pull: { todos: { _id: todoId } } }).then(() => res.send('deleted successfully!')).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get('/loadMore', ({ query }, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"loadMorefetchTasks\"])(query).then(tasks => res.json(tasks)).catch(logger));\n\n//# sourceURL=webpack:///./logic/components/task/route.js?");

/***/ }),

/***/ "./logic/components/user/db.js":
/*!*************************************!*\
  !*** ./logic/components/user/db.js ***!
  \*************************************/
/*! exports provided: fetchUsers, saveUser, countUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchUsers\", function() { return fetchUsers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveUser\", function() { return saveUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"countUser\", function() { return countUser; });\n/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/user */ \"./models/user.js\");\n// models\n\n\nconst fetchUsers = async query => _models_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).sort({ name: 1 }).exec();\n\nconst saveUser = async user => new _models_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"](user).save();\n\nconst countUser = async query => _models_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).count().exec();\n\n//# sourceURL=webpack:///./logic/components/user/db.js?");

/***/ }),

/***/ "./logic/components/user/route.js":
/*!****************************************!*\
  !*** ./logic/components/user/route.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./db */ \"./logic/components/user/db.js\");\n// components\n\n// db helpers\n\n// const\nconst logger = console.log;\n\n_setup_server__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get('/fetchUsers', (req, res) => Object(_db__WEBPACK_IMPORTED_MODULE_1__[\"fetchUsers\"])({ wis: req.query.wis }).then(users => res.json(users)).catch(logger));\n\n_setup_server__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post('/saveUser', ({ body: { wis, userId, username } }, res) => {\n  Object(_db__WEBPACK_IMPORTED_MODULE_1__[\"countUser\"])({ wis, id: userId }).then(number => {\n    if (number === 0) {\n      Object(_db__WEBPACK_IMPORTED_MODULE_1__[\"saveUser\"])({ wis, name: username, id: userId }).then(user => res.json(user)).catch(logger);\n    } else res.send('user was saved before!');\n  });\n});\n\n_setup_server__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get('/searchUsers', ({ query: { wis, name } }, res) => Object(_db__WEBPACK_IMPORTED_MODULE_1__[\"fetchUsers\"])({ wis, name: { $regex: `.*${name}.*` } }).then(users => res.json(users)).catch(logger));\n\n//# sourceURL=webpack:///./logic/components/user/route.js?");

/***/ }),

/***/ "./logic/main/db.js":
/*!**************************!*\
  !*** ./logic/main/db.js ***!
  \**************************/
/*! exports provided: fetchTasks, fetchTags, countTasks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchTasks\", function() { return fetchTasks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchTags\", function() { return fetchTags; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"countTasks\", function() { return countTasks; });\n/* harmony import */ var _models_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/task */ \"./models/task.js\");\n/* harmony import */ var _models_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/tag */ \"./models/tag.js\");\n// models\n\n\n\nconst fetchTasks = async query => _models_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).sort({ created_at: -1 }).limit(5).exec();\n\nconst fetchTags = async query => _models_tag__WEBPACK_IMPORTED_MODULE_1__[\"default\"].find(query).sort({ number: -1 }).limit(5).exec();\n\nconst countTasks = async query => _models_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).count().exec();\n\n//# sourceURL=webpack:///./logic/main/db.js?");

/***/ }),

/***/ "./logic/main/route.js":
/*!*****************************!*\
  !*** ./logic/main/route.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _components_user_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/user/route */ \"./logic/components/user/route.js\");\n/* harmony import */ var _components_task_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/task/route */ \"./logic/components/task/route.js\");\n/* harmony import */ var _components_tag_route__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/tag/route */ \"./logic/components/tag/route.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./db */ \"./logic/main/db.js\");\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n// modules\n\n// components\n\n\n\n\n// db helpers\n\n// const\nconst logger = console.log;\n\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get('/initialFetch', ({ query }, res) => Promise.all([Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"fetchTasks\"])(_extends({}, query, { level: 'ICE BOX' })), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"fetchTasks\"])(_extends({}, query, { level: 'IN PROGRESS' })), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"fetchTasks\"])(_extends({}, query, { level: 'EVALUATE' })), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"fetchTasks\"])(_extends({}, query, { level: 'DONE' })), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"fetchTags\"])(query), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"countTasks\"])(_extends({}, query, { level: 'ICE BOX' })), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"countTasks\"])(_extends({}, query, { level: 'IN PROGRESS' })), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"countTasks\"])(_extends({}, query, { level: 'EVALUATE' })), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"countTasks\"])(_extends({}, query, { level: 'DONE' }))]).then(success => res.json({\n  tasks: ramda__WEBPACK_IMPORTED_MODULE_0__[\"unnest\"]([success[0], success[1], success[2], success[3]]),\n  tags: success[4],\n  numberOfTasks: {\n    'ICE BOX': success[5], 'IN PROGRESS': success[6], EVALUATE: success[7], DONE: success[8]\n  }\n})).catch(logger));\n\n//# sourceURL=webpack:///./logic/main/route.js?");

/***/ }),

/***/ "./models/tag.js":
/*!***********************!*\
  !*** ./models/tag.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// module\n\n\nconst { Schema } = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a;\n\nconst TagSchema = new Schema({\n  label: String,\n  number: Number,\n  userId: String,\n  wis: String\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Tag', TagSchema));\n\n//# sourceURL=webpack:///./models/tag.js?");

/***/ }),

/***/ "./models/task.js":
/*!************************!*\
  !*** ./models/task.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// module\n\n\nconst { Schema } = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a;\n\nconst TaskSchema = new Schema({\n  title: String,\n  tags: [String],\n  priority: String,\n  deadline: Date,\n  sentTime: Date,\n  level: String,\n  assignee: String,\n  todos: [{\n    title: String,\n    completed: Boolean\n  }],\n  created_at: Date,\n  userId: String,\n  wis: String\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Task', TaskSchema));\n\n//# sourceURL=webpack:///./models/task.js?");

/***/ }),

/***/ "./models/user.js":
/*!************************!*\
  !*** ./models/user.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// module\n\n\nconst { Schema } = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a;\n\nconst UserSchema = new Schema({\n  id: String,\n  name: String,\n  wis: String\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('User', UserSchema));\n\n//# sourceURL=webpack:///./models/user.js?");

/***/ }),

/***/ "./setup/mongodb.js":
/*!**************************!*\
  !*** ./setup/mongodb.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// modules\n\n\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connect('mongodb://localhost:27017/Tasklite');\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Promise = Promise;\nconst db = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connection;\ndb.on('error', console.log);\n\n//# sourceURL=webpack:///./setup/mongodb.js?");

/***/ }),

/***/ "./setup/prod.index.js":
/*!*****************************!*\
  !*** ./setup/prod.index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! https */ \"https\");\n/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(https__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./server */ \"./setup/server.js\");\n/* harmony import */ var _mongodb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mongodb */ \"./setup/mongodb.js\");\n/* harmony import */ var _logic_main_route__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../logic/main/route */ \"./logic/main/route.js\");\n// modules\n\n\n\n// components\n\n\n\n\nconst privateKey = fs__WEBPACK_IMPORTED_MODULE_2___default.a.readFileSync(path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve('./src/certs/express.key'), 'utf8');\nconst certificate = fs__WEBPACK_IMPORTED_MODULE_2___default.a.readFileSync(path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve('./src/certs/express.crt'), 'utf8');\n\nhttps__WEBPACK_IMPORTED_MODULE_1___default.a.createServer({ key: privateKey, cert: certificate }, _server__WEBPACK_IMPORTED_MODULE_3__[\"default\"]).listen(3030);\n\n//# sourceURL=webpack:///./setup/prod.index.js?");

/***/ }),

/***/ "./setup/server.js":
/*!*************************!*\
  !*** ./setup/server.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n// modules\n\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\n\napp.use(cors__WEBPACK_IMPORTED_MODULE_1___default()({ origin: '*' }));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({ extended: true }));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./setup/server.js?");

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./setup/prod.index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./setup/prod.index.js */\"./setup/prod.index.js\");\n\n\n//# sourceURL=webpack:///multi_./setup/prod.index.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"https\");\n\n//# sourceURL=webpack:///external_%22https%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "ramda":
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ramda\");\n\n//# sourceURL=webpack:///external_%22ramda%22?");

/***/ })

/******/ });