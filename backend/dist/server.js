/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/*! exports used: countTags, fetchTags, saveTag, updateTag */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_tag__ = __webpack_require__(/*! ../../../models/tag */ \"./models/tag.js\");\n// models\n\n\nconst fetchTags = async query => __WEBPACK_IMPORTED_MODULE_0__models_tag__[\"a\" /* default */].find(query).sort({ number: -1 }).limit(5).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"b\"] = fetchTags;\n\n\nconst saveTag = async tag => new __WEBPACK_IMPORTED_MODULE_0__models_tag__[\"a\" /* default */](tag).save();\n/* harmony export (immutable) */ __webpack_exports__[\"c\"] = saveTag;\n\n\nconst countTags = async query => __WEBPACK_IMPORTED_MODULE_0__models_tag__[\"a\" /* default */].find(query).count().exec();\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = countTags;\n\n\nconst updateTag = async (query, updateObject) => __WEBPACK_IMPORTED_MODULE_0__models_tag__[\"a\" /* default */].update(query, updateObject).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"d\"] = updateTag;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/components/tag/db.js\n// module id = ./logic/components/tag/db.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/components/tag/db.js?");

/***/ }),

/***/ "./logic/components/tag/route.js":
/*!***************************************!*\
  !*** ./logic/components/tag/route.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setup_server__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db__ = __webpack_require__(/*! ./db */ \"./logic/components/tag/db.js\");\n// modules\n\n// components\n\n// db helpers\n\n// const\nconst logger = console.log;\n\n// app.get('/fetchTags', ({ query: { wis, userId } }, res) =>\n//   fetchTags({ wis, userId })\n//     .then(tags => res.json(tags))\n//     .catch(logger))\n\n__WEBPACK_IMPORTED_MODULE_1__setup_server__[\"a\" /* default */].get('/searchTags', ({ query: { wis, userId, label } }, res) => Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"b\" /* fetchTags */])({ wis, userId, label: { $regex: `.*${label}.*` } }).then(tags => res.json(tags)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_1__setup_server__[\"a\" /* default */].post('/saveTags', ({ body: { wis, userId, tags } }, res) => {\n  const addOrUpdateTag = tag => Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"a\" /* countTags */])({ wis, userId, label: tag }).then(number => {\n    if (number === 0) {\n      Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"c\" /* saveTag */])({ label: tag, number: 1, userId, wis });\n    } else Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"d\" /* updateTag */])({ label: tag }, { $inc: { number: 1 } });\n  });\n  __WEBPACK_IMPORTED_MODULE_0_ramda__[\"forEach\"](addOrUpdateTag, tags);\n  Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"b\" /* fetchTags */])({ wis, userId }).then(kinds => res.json(kinds)).catch(logger);\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/components/tag/route.js\n// module id = ./logic/components/tag/route.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/components/tag/route.js?");

/***/ }),

/***/ "./logic/components/task/db.js":
/*!*************************************!*\
  !*** ./logic/components/task/db.js ***!
  \*************************************/
/*! exports provided: loadMorefetchTasks, fetchTasks, saveTask, updateTask, deleteTask */
/*! exports used: deleteTask, fetchTasks, loadMorefetchTasks, saveTask, updateTask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_task__ = __webpack_require__(/*! ../../../models/task */ \"./models/task.js\");\n// models\n\n\nconst loadMorefetchTasks = async ({ query, skipLength }) => __WEBPACK_IMPORTED_MODULE_0__models_task__[\"a\" /* default */].find(query).sort({ deadline: 1 }).limit(5).skip(Number(skipLength)).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"c\"] = loadMorefetchTasks;\n\n\nconst fetchTasks = async query => __WEBPACK_IMPORTED_MODULE_0__models_task__[\"a\" /* default */].find(query).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"b\"] = fetchTasks;\n\n\nconst saveTask = async task => new __WEBPACK_IMPORTED_MODULE_0__models_task__[\"a\" /* default */](task).save();\n/* harmony export (immutable) */ __webpack_exports__[\"d\"] = saveTask;\n\n\nconst updateTask = async (query, updateObject) => __WEBPACK_IMPORTED_MODULE_0__models_task__[\"a\" /* default */].update(query, updateObject).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"e\"] = updateTask;\n\n\nconst deleteTask = async query => __WEBPACK_IMPORTED_MODULE_0__models_task__[\"a\" /* default */].remove(query).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = deleteTask;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/components/task/db.js\n// module id = ./logic/components/task/db.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/components/task/db.js?");

/***/ }),

/***/ "./logic/components/task/helper.js":
/*!*****************************************!*\
  !*** ./logic/components/task/helper.js ***!
  \*****************************************/
/*! exports provided: getToggledValue, nothing */
/*! exports used: getToggledValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);\n// modules\n\n\nconst getToggledValue = (task, todoId) => __WEBPACK_IMPORTED_MODULE_0_ramda__[\"compose\"](__WEBPACK_IMPORTED_MODULE_0_ramda__[\"prop\"]('completed'), __WEBPACK_IMPORTED_MODULE_0_ramda__[\"find\"](__WEBPACK_IMPORTED_MODULE_0_ramda__[\"propEq\"]('_id', todoId)), __WEBPACK_IMPORTED_MODULE_0_ramda__[\"prop\"]('todos'))(task);\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = getToggledValue;\n\n\nconst nothing = null;\n/* unused harmony export nothing */\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/components/task/helper.js\n// module id = ./logic/components/task/helper.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/components/task/helper.js?");

/***/ }),

/***/ "./logic/components/task/route.js":
/*!****************************************!*\
  !*** ./logic/components/task/route.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setup_server__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__db__ = __webpack_require__(/*! ./db */ \"./logic/components/task/db.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helper__ = __webpack_require__(/*! ./helper */ \"./logic/components/task/helper.js\");\n// modules\n\n// components\n\n// db helpers\n\n// helpers\n\n// const\nconst logger = console.log;\n\n__WEBPACK_IMPORTED_MODULE_1__setup_server__[\"a\" /* default */].post('/saveTask', (req, res) => Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"d\" /* saveTask */])(req.body).then(task => res.send(task)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_1__setup_server__[\"a\" /* default */].post('/deleteTask', (req, res) => Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"a\" /* deleteTask */])({ _id: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Types.ObjectId(req.query._id) }).then(() => res.send('deleted successfully!')).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_1__setup_server__[\"a\" /* default */].post('/changeLevel', ({ body }, res) => Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"e\" /* updateTask */])({ _id: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Types.ObjectId(body._id) }, { $set: { level: body.nextLevel } }).then(() => res.send(body)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_1__setup_server__[\"a\" /* default */].post('/setSentTime', ({ body: { _id, sentTime } }, res) => Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"e\" /* updateTask */])({ _id: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Types.ObjectId(_id) }, { $set: { sentTime } }).then(() => res.send('sent time set!')).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_1__setup_server__[\"a\" /* default */].post('/toggleTodo', ({ body: { _id, todoId, task } }, res) => Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"e\" /* updateTask */])({ _id: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Types.ObjectId(_id), 'todos._id': todoId }, { $set: { 'todos.$.completed': Object(__WEBPACK_IMPORTED_MODULE_3__helper__[\"a\" /* getToggledValue */])(task, todoId) } }).then(() => res.send('toggled successfully!')).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_1__setup_server__[\"a\" /* default */].post('/addTodo', ({ body: { _id, value } }, res) => Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"e\" /* updateTask */])({ _id: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Types.ObjectId(_id) }, { $push: { todos: { $each: [{ title: value, completed: false }], $position: 0 } } }).then(() => Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"b\" /* fetchTasks */])({ _id: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Types.ObjectId(_id) })).then(task => res.send(task)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_1__setup_server__[\"a\" /* default */].post('/deleteTodo', ({ body: { _id, todoId } }, res) => Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"e\" /* updateTask */])({ _id: __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Types.ObjectId(_id) }, { $pull: { todos: { _id: todoId } } }).then(() => res.send('deleted successfully!')).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_1__setup_server__[\"a\" /* default */].get('/loadMore', ({ query }, res) => Object(__WEBPACK_IMPORTED_MODULE_2__db__[\"c\" /* loadMorefetchTasks */])(query).then(tasks => res.json(tasks)).catch(logger));\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/components/task/route.js\n// module id = ./logic/components/task/route.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/components/task/route.js?");

/***/ }),

/***/ "./logic/components/user/db.js":
/*!*************************************!*\
  !*** ./logic/components/user/db.js ***!
  \*************************************/
/*! exports provided: fetchUsers, saveUser, countUser */
/*! exports used: countUser, fetchUsers, saveUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_user__ = __webpack_require__(/*! ../../../models/user */ \"./models/user.js\");\n// models\n\n\nconst fetchUsers = async query => __WEBPACK_IMPORTED_MODULE_0__models_user__[\"a\" /* default */].find(query).sort({ name: 1 }).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"b\"] = fetchUsers;\n\n\nconst saveUser = async user => new __WEBPACK_IMPORTED_MODULE_0__models_user__[\"a\" /* default */](user).save();\n/* harmony export (immutable) */ __webpack_exports__[\"c\"] = saveUser;\n\n\nconst countUser = async query => __WEBPACK_IMPORTED_MODULE_0__models_user__[\"a\" /* default */].find(query).count().exec();\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = countUser;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/components/user/db.js\n// module id = ./logic/components/user/db.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/components/user/db.js?");

/***/ }),

/***/ "./logic/components/user/route.js":
/*!****************************************!*\
  !*** ./logic/components/user/route.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__setup_server__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__db__ = __webpack_require__(/*! ./db */ \"./logic/components/user/db.js\");\n// components\n\n// db helpers\n\n// const\nconst logger = console.log;\n\n__WEBPACK_IMPORTED_MODULE_0__setup_server__[\"a\" /* default */].get('/fetchUsers', (req, res) => Object(__WEBPACK_IMPORTED_MODULE_1__db__[\"b\" /* fetchUsers */])({ wis: req.query.wis }).then(users => res.json(users)).catch(logger));\n\n__WEBPACK_IMPORTED_MODULE_0__setup_server__[\"a\" /* default */].post('/saveUser', ({ body: { wis, userId, username } }, res) => {\n  Object(__WEBPACK_IMPORTED_MODULE_1__db__[\"a\" /* countUser */])({ wis, id: userId }).then(number => {\n    if (number === 0) {\n      Object(__WEBPACK_IMPORTED_MODULE_1__db__[\"c\" /* saveUser */])({ wis, name: username, id: userId }).then(user => res.json(user)).catch(logger);\n    } else res.send('user was saved before!');\n  });\n});\n\n__WEBPACK_IMPORTED_MODULE_0__setup_server__[\"a\" /* default */].get('/searchUsers', ({ query: { wis, name } }, res) => Object(__WEBPACK_IMPORTED_MODULE_1__db__[\"b\" /* fetchUsers */])({ wis, name: { $regex: `.*${name}.*` } }).then(users => res.json(users)).catch(logger));\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/components/user/route.js\n// module id = ./logic/components/user/route.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/components/user/route.js?");

/***/ }),

/***/ "./logic/main/db.js":
/*!**************************!*\
  !*** ./logic/main/db.js ***!
  \**************************/
/*! exports provided: fetchTasks, fetchTags, countTasks */
/*! exports used: countTasks, fetchTags, fetchTasks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_task__ = __webpack_require__(/*! ../../models/task */ \"./models/task.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_tag__ = __webpack_require__(/*! ../../models/tag */ \"./models/tag.js\");\n// models\n\n\n\nconst fetchTasks = async query => __WEBPACK_IMPORTED_MODULE_0__models_task__[\"a\" /* default */].find(query).sort({ deadline: 1 }).limit(5).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"c\"] = fetchTasks;\n\n\nconst fetchTags = async query => __WEBPACK_IMPORTED_MODULE_1__models_tag__[\"a\" /* default */].find(query).sort({ number: -1 }).limit(5).exec();\n/* harmony export (immutable) */ __webpack_exports__[\"b\"] = fetchTags;\n\n\nconst countTasks = async query => __WEBPACK_IMPORTED_MODULE_0__models_task__[\"a\" /* default */].find(query).count().exec();\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = countTasks;\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/main/db.js\n// module id = ./logic/main/db.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/main/db.js?");

/***/ }),

/***/ "./logic/main/route.js":
/*!*****************************!*\
  !*** ./logic/main/route.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ramda__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setup_server__ = __webpack_require__(/*! ../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_user_route__ = __webpack_require__(/*! ../components/user/route */ \"./logic/components/user/route.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_task_route__ = __webpack_require__(/*! ../components/task/route */ \"./logic/components/task/route.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_tag_route__ = __webpack_require__(/*! ../components/tag/route */ \"./logic/components/tag/route.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__db__ = __webpack_require__(/*! ./db */ \"./logic/main/db.js\");\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\n// modules\n\n// components\n\n\n\n\n// db helpers\n\n// const\nconst logger = console.log;\n\n__WEBPACK_IMPORTED_MODULE_1__setup_server__[\"a\" /* default */].get('/initialFetch', ({ query }, res) => Promise.all([Object(__WEBPACK_IMPORTED_MODULE_5__db__[\"c\" /* fetchTasks */])(_extends({}, query, { level: 'ICE BOX' })), Object(__WEBPACK_IMPORTED_MODULE_5__db__[\"c\" /* fetchTasks */])(_extends({}, query, { level: 'IN PROGRESS' })), Object(__WEBPACK_IMPORTED_MODULE_5__db__[\"c\" /* fetchTasks */])(_extends({}, query, { level: 'EVALUTE' })), Object(__WEBPACK_IMPORTED_MODULE_5__db__[\"c\" /* fetchTasks */])(_extends({}, query, { level: 'DONE' })), Object(__WEBPACK_IMPORTED_MODULE_5__db__[\"b\" /* fetchTags */])(query), Object(__WEBPACK_IMPORTED_MODULE_5__db__[\"a\" /* countTasks */])(_extends({}, query, { level: 'ICE BOX' })), Object(__WEBPACK_IMPORTED_MODULE_5__db__[\"a\" /* countTasks */])(_extends({}, query, { level: 'IN PROGRESS' })), Object(__WEBPACK_IMPORTED_MODULE_5__db__[\"a\" /* countTasks */])(_extends({}, query, { level: 'EVALUTE' })), Object(__WEBPACK_IMPORTED_MODULE_5__db__[\"a\" /* countTasks */])(_extends({}, query, { level: 'DONE' }))]).then(success => res.json({\n  tasks: __WEBPACK_IMPORTED_MODULE_0_ramda__[\"unnest\"]([success[0], success[1], success[2], success[3]]),\n  tags: success[4],\n  numberOfTasks: {\n    'ICE BOX': success[5], 'IN PROGRESS': success[6], EVALUTE: success[7], DONE: success[8]\n  }\n})).catch(logger));\n\n//////////////////\n// WEBPACK FOOTER\n// ./logic/main/route.js\n// module id = ./logic/main/route.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./logic/main/route.js?");

/***/ }),

/***/ "./models/tag.js":
/*!***********************!*\
  !*** ./models/tag.js ***!
  \***********************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);\n// module\n\n\nconst { Schema } = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a;\n\nconst TagSchema = new Schema({\n  label: String,\n  number: Number,\n  userId: String,\n  wis: String\n});\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Tag', TagSchema));\n\n//////////////////\n// WEBPACK FOOTER\n// ./models/tag.js\n// module id = ./models/tag.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./models/tag.js?");

/***/ }),

/***/ "./models/task.js":
/*!************************!*\
  !*** ./models/task.js ***!
  \************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);\n// module\n\n\nconst { Schema } = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a;\n\nconst TaskSchema = new Schema({\n  title: String,\n  tags: [String],\n  priority: String,\n  deadline: Date,\n  sentTime: Date,\n  level: String,\n  assignee: String,\n  todos: [{\n    title: String,\n    completed: Boolean\n  }],\n  userId: String,\n  wis: String\n});\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Task', TaskSchema));\n\n//////////////////\n// WEBPACK FOOTER\n// ./models/task.js\n// module id = ./models/task.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./models/task.js?");

/***/ }),

/***/ "./models/user.js":
/*!************************!*\
  !*** ./models/user.js ***!
  \************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);\n// module\n\n\nconst { Schema } = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a;\n\nconst UserSchema = new Schema({\n  id: String,\n  name: String,\n  wis: String\n});\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('User', UserSchema));\n\n//////////////////\n// WEBPACK FOOTER\n// ./models/user.js\n// module id = ./models/user.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./models/user.js?");

/***/ }),

/***/ "./setup/dev.index.js":
/*!****************************!*\
  !*** ./setup/dev.index.js ***!
  \****************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_http__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__server__ = __webpack_require__(/*! ./server */ \"./setup/server.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mongodb__ = __webpack_require__(/*! ./mongodb */ \"./setup/mongodb.js\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__logic_main_route__ = __webpack_require__(/*! ../logic/main/route */ \"./logic/main/route.js\");\n// modules\n\n\n\n\n\n__WEBPACK_IMPORTED_MODULE_0_http___default.a.createServer(__WEBPACK_IMPORTED_MODULE_1__server__[\"a\" /* default */]).listen(3030);\n\n//////////////////\n// WEBPACK FOOTER\n// ./setup/dev.index.js\n// module id = ./setup/dev.index.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./setup/dev.index.js?");

/***/ }),

/***/ "./setup/mongodb.js":
/*!**************************!*\
  !*** ./setup/mongodb.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);\n\n\n__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connect('mongodb://localhost:27017/Tasklite');\n__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Promise = Promise;\nconst db = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connection;\ndb.on('error', console.log);\n\n//////////////////\n// WEBPACK FOOTER\n// ./setup/mongodb.js\n// module id = ./setup/mongodb.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./setup/mongodb.js?");

/***/ }),

/***/ "./setup/server.js":
/*!*************************!*\
  !*** ./setup/server.js ***!
  \*************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cors__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cors__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_body_parser__);\n// modules\n\n\n\n\nconst app = __WEBPACK_IMPORTED_MODULE_0_express___default()();\n\napp.use(__WEBPACK_IMPORTED_MODULE_1_cors___default()({ origin: '*' }));\napp.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.json());\napp.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.urlencoded({ extended: true }));\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (app);\n\n//////////////////\n// WEBPACK FOOTER\n// ./setup/server.js\n// module id = ./setup/server.js\n// module chunks = 0\n\n//# sourceURL=webpack:///./setup/server.js?");

/***/ }),

/***/ 0:
/*!**********************************!*\
  !*** multi ./setup/dev.index.js ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./setup/dev.index.js */\"./setup/dev.index.js\");\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi ./setup/dev.index.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///multi_./setup/dev.index.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"body-parser\"\n// module id = body-parser\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"cors\"\n// module id = cors\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"express\"\n// module id = express\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"http\"\n// module id = http\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"mongoose\"\n// module id = mongoose\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "ramda":
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/*! dynamic exports provided */
/*! exports used: compose, find, forEach, prop, propEq, unnest */
/***/ (function(module, exports) {

eval("module.exports = require(\"ramda\");\n\n//////////////////\n// WEBPACK FOOTER\n// external \"ramda\"\n// module id = ramda\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22ramda%22?");

/***/ })

/******/ });