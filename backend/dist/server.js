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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchTags\", function() { return fetchTags; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveTag\", function() { return saveTag; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"countTags\", function() { return countTags; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateTag\", function() { return updateTag; });\n/* harmony import */ var _models_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/tag */ \"./models/tag.js\");\n// models\n\nconst fetchTags = async query => _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).sort({\n  number: -1\n}).limit(10).exec();\nconst saveTag = async tag => new _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"](tag).save();\nconst countTags = async query => _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).count().exec();\nconst updateTag = async (query, updateObject) => _models_tag__WEBPACK_IMPORTED_MODULE_0__[\"default\"].update(query, updateObject).exec();\n\n//# sourceURL=webpack:///./logic/components/tag/db.js?");

/***/ }),

/***/ "./logic/components/tag/route.js":
/*!***************************************!*\
  !*** ./logic/components/tag/route.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db */ \"./logic/components/tag/db.js\");\n// modules\n // components\n\n // db helpers\n\n // const\n\nconst logger = console.log;\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get('/searchTags', ({\n  query: {\n    wis,\n    userId,\n    label\n  }\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"fetchTags\"])({\n  wis,\n  userId,\n  label: {\n    $regex: `.*${label}.*`\n  }\n}).then(tags => res.json(tags)).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/saveTags', ({\n  body: {\n    wis,\n    userId,\n    tags\n  }\n}, res) => {\n  const addOrUpdateTag = tag => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"countTags\"])({\n    wis,\n    userId,\n    label: tag\n  }).then(number => {\n    if (number === 0) {\n      Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"saveTag\"])({\n        label: tag,\n        number: 1,\n        userId,\n        wis\n      });\n    } else Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"updateTag\"])({\n      label: tag\n    }, {\n      $inc: {\n        number: 1\n      }\n    });\n  });\n\n  ramda__WEBPACK_IMPORTED_MODULE_0__[\"forEach\"](addOrUpdateTag, tags);\n  Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"fetchTags\"])({\n    wis,\n    userId\n  }).then(kinds => res.json(kinds)).catch(logger);\n});\n\n//# sourceURL=webpack:///./logic/components/tag/route.js?");

/***/ }),

/***/ "./logic/components/task/db.js":
/*!*************************************!*\
  !*** ./logic/components/task/db.js ***!
  \*************************************/
/*! exports provided: loadMoreFetchTasks, fetchTasks, saveTask, updateTask, deleteTask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadMoreFetchTasks\", function() { return loadMoreFetchTasks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchTasks\", function() { return fetchTasks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveTask\", function() { return saveTask; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateTask\", function() { return updateTask; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"deleteTask\", function() { return deleteTask; });\n/* harmony import */ var _models_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/task */ \"./models/task.js\");\n// models\n\nconst loadMoreFetchTasks = async ({\n  query,\n  skipLength\n}) => _models_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).sort({\n  deadline: 1\n}).limit(5).skip(Number(skipLength)).exec();\nconst fetchTasks = async query => _models_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).exec();\nconst saveTask = async task => new _models_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"](task).save();\nconst updateTask = async (query, updateObject) => _models_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"].update(query, updateObject).exec();\nconst deleteTask = async query => _models_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"].remove(query).exec();\n\n//# sourceURL=webpack:///./logic/components/task/db.js?");

/***/ }),

/***/ "./logic/components/task/helper.js":
/*!*****************************************!*\
  !*** ./logic/components/task/helper.js ***!
  \*****************************************/
/*! exports provided: getToggledValue, nothing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getToggledValue\", function() { return getToggledValue; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nothing\", function() { return nothing; });\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);\n// modules\n\nconst getToggledValue = (task, todoId) => ramda__WEBPACK_IMPORTED_MODULE_0__[\"compose\"](ramda__WEBPACK_IMPORTED_MODULE_0__[\"prop\"]('completed'), ramda__WEBPACK_IMPORTED_MODULE_0__[\"find\"](ramda__WEBPACK_IMPORTED_MODULE_0__[\"propEq\"]('_id', todoId)), ramda__WEBPACK_IMPORTED_MODULE_0__[\"prop\"]('todos'))(task);\nconst nothing = null;\n\n//# sourceURL=webpack:///./logic/components/task/helper.js?");

/***/ }),

/***/ "./logic/components/task/route.js":
/*!****************************************!*\
  !*** ./logic/components/task/route.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./db */ \"./logic/components/task/db.js\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper */ \"./logic/components/task/helper.js\");\n// modules\n // components\n\n // db helpers\n\n // helpers\n\n // const\n\nconst logger = console.log;\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/saveTask', (req, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"saveTask\"])(req.body).then(task => res.send(task)).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/deleteTask', (req, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"deleteTask\"])({\n  _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(req.query._id)\n}).then(() => res.send('deleted successfully!')).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/changeLevel', ({\n  body\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"updateTask\"])({\n  _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(body._id)\n}, {\n  $set: {\n    level: body.nextLevel\n  }\n}).then(() => res.send(body)).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/setSentTime', ({\n  body: {\n    _id,\n    sentTime\n  }\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"updateTask\"])({\n  _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(_id)\n}, {\n  $set: {\n    sentTime\n  }\n}).then(() => res.send('sent time set!')).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/toggleTodo', ({\n  body: {\n    _id,\n    todoId,\n    task\n  }\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"updateTask\"])({\n  _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(_id),\n  'todos._id': todoId\n}, {\n  $set: {\n    'todos.$.completed': Object(_helper__WEBPACK_IMPORTED_MODULE_3__[\"getToggledValue\"])(task, todoId)\n  }\n}).then(() => res.send('toggled successfully!')).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/addTodo', ({\n  body: {\n    _id,\n    value\n  }\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"updateTask\"])({\n  _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(_id)\n}, {\n  $push: {\n    todos: {\n      $each: [{\n        title: value,\n        completed: false\n      }],\n      $position: 0\n    }\n  }\n}).then(() => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"fetchTasks\"])({\n  _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(_id)\n})).then(task => res.send(task)).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post('/deleteTodo', ({\n  body: {\n    _id,\n    todoId\n  }\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"updateTask\"])({\n  _id: mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Types.ObjectId(_id)\n}, {\n  $pull: {\n    todos: {\n      _id: todoId\n    }\n  }\n}).then(() => res.send('deleted successfully!')).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get('/loadMore', ({\n  query\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"loadMoreFetchTasks\"])(query).then(tasks => res.json(tasks)).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post(\"/editTask\", ({\n  body,\n  body: {\n    _id\n  }\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_2__[\"updateTask\"])({\n  _id\n}, body).then(task => res.send(task)).catch(logger));\n\n//# sourceURL=webpack:///./logic/components/task/route.js?");

/***/ }),

/***/ "./logic/components/user/db.js":
/*!*************************************!*\
  !*** ./logic/components/user/db.js ***!
  \*************************************/
/*! exports provided: fetchUsers, saveUser, countUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchUsers\", function() { return fetchUsers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveUser\", function() { return saveUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"countUser\", function() { return countUser; });\n/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/user */ \"./models/user.js\");\n// models\n\nconst fetchUsers = async query => _models_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).sort({\n  name: 1\n}).exec();\nconst saveUser = async user => new _models_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"](user).save();\nconst countUser = async query => _models_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).count().exec();\n\n//# sourceURL=webpack:///./logic/components/user/db.js?");

/***/ }),

/***/ "./logic/components/user/route.js":
/*!****************************************!*\
  !*** ./logic/components/user/route.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./db */ \"./logic/components/user/db.js\");\n// components\n // db helpers\n\n // const\n\nconst logger = console.log;\n_setup_server__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get('/fetchUsers', (req, res) => Object(_db__WEBPACK_IMPORTED_MODULE_1__[\"fetchUsers\"])({\n  wis: req.query.wis\n}).then(users => res.json(users)).catch(logger));\n_setup_server__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post('/saveUser', ({\n  body: {\n    wis,\n    userId,\n    username\n  }\n}, res) => {\n  Object(_db__WEBPACK_IMPORTED_MODULE_1__[\"countUser\"])({\n    wis,\n    id: userId\n  }).then(number => {\n    if (number === 0) {\n      Object(_db__WEBPACK_IMPORTED_MODULE_1__[\"saveUser\"])({\n        wis,\n        name: username,\n        id: userId\n      }).then(user => res.json(user)).catch(logger);\n    } else res.send('user was saved before!');\n  });\n});\n_setup_server__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get('/searchUsers', ({\n  query: {\n    wis,\n    name\n  }\n}, res) => Object(_db__WEBPACK_IMPORTED_MODULE_1__[\"fetchUsers\"])({\n  wis,\n  name: {\n    $regex: `.*${name}.*`\n  }\n}).then(users => res.json(users)).catch(logger));\n\n//# sourceURL=webpack:///./logic/components/user/route.js?");

/***/ }),

/***/ "./logic/main/db.js":
/*!**************************!*\
  !*** ./logic/main/db.js ***!
  \**************************/
/*! exports provided: fetchTasks, fetchTags, countTasks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchTasks\", function() { return fetchTasks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fetchTags\", function() { return fetchTags; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"countTasks\", function() { return countTasks; });\n/* harmony import */ var _models_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/task */ \"./models/task.js\");\n/* harmony import */ var _models_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/tag */ \"./models/tag.js\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper */ \"./logic/main/helper.js\");\n// models\n\n // helpers\n\n\nconst fetchTasks = async query => _models_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).sort({\n  created_at: -1\n}).limit(Object(_helper__WEBPACK_IMPORTED_MODULE_2__[\"getLimit\"])(query.level)).exec();\nconst fetchTags = async query => _models_tag__WEBPACK_IMPORTED_MODULE_1__[\"default\"].find(query).sort({\n  number: -1\n}).limit(10).exec();\nconst countTasks = async query => _models_task__WEBPACK_IMPORTED_MODULE_0__[\"default\"].find(query).count().exec();\n\n//# sourceURL=webpack:///./logic/main/db.js?");

/***/ }),

/***/ "./logic/main/helper.js":
/*!******************************!*\
  !*** ./logic/main/helper.js ***!
  \******************************/
/*! exports provided: getLimit, nothing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLimit\", function() { return getLimit; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"nothing\", function() { return nothing; });\nconst getLimit = level => {\n  switch (level) {\n    case 'ICE BOX':\n      return 10;\n\n    case 'IN PROGRESS':\n      return 5;\n\n    case 'EVALUTE':\n      return 5;\n\n    case 'DONE':\n      return 5;\n\n    default:\n      return 0;\n  }\n};\nconst nothing = null;\n\n//# sourceURL=webpack:///./logic/main/helper.js?");

/***/ }),

/***/ "./logic/main/route.js":
/*!*****************************!*\
  !*** ./logic/main/route.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ \"ramda\");\n/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ramda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _setup_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../setup/server */ \"./setup/server.js\");\n/* harmony import */ var _components_user_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/user/route */ \"./logic/components/user/route.js\");\n/* harmony import */ var _components_task_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/task/route */ \"./logic/components/task/route.js\");\n/* harmony import */ var _components_tag_route__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/tag/route */ \"./logic/components/tag/route.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./db */ \"./logic/main/db.js\");\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n// modules\n // components\n\n\n\n\n // db helpers\n\n // const\n\nconst logger = console.log;\n_setup_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get('/initialFetch', ({\n  query\n}, res) => Promise.all([Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"fetchTasks\"])(_objectSpread({}, query, {\n  level: 'ICE BOX'\n})), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"fetchTasks\"])(_objectSpread({}, query, {\n  level: 'IN PROGRESS'\n})), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"fetchTasks\"])(_objectSpread({}, query, {\n  level: 'EVALUATE'\n})), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"fetchTasks\"])(_objectSpread({}, query, {\n  level: 'DONE'\n})), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"fetchTags\"])(query), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"countTasks\"])(_objectSpread({}, query, {\n  level: 'ICE BOX'\n})), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"countTasks\"])(_objectSpread({}, query, {\n  level: 'IN PROGRESS'\n})), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"countTasks\"])(_objectSpread({}, query, {\n  level: 'EVALUATE'\n})), Object(_db__WEBPACK_IMPORTED_MODULE_5__[\"countTasks\"])(_objectSpread({}, query, {\n  level: 'DONE'\n}))]).then(success => res.json({\n  tasks: ramda__WEBPACK_IMPORTED_MODULE_0__[\"unnest\"]([success[0], success[1], success[2], success[3]]),\n  tags: success[4],\n  numberOfTasks: {\n    'ICE BOX': success[5],\n    'IN PROGRESS': success[6],\n    EVALUATE: success[7],\n    DONE: success[8]\n  }\n})).catch(logger));\n\n//# sourceURL=webpack:///./logic/main/route.js?");

/***/ }),

/***/ "./models/tag.js":
/*!***********************!*\
  !*** ./models/tag.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// module\n\nconst {\n  Schema\n} = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a;\nconst TagSchema = new Schema({\n  label: String,\n  number: Number,\n  userId: String,\n  wis: String\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Tag', TagSchema));\n\n//# sourceURL=webpack:///./models/tag.js?");

/***/ }),

/***/ "./models/task.js":
/*!************************!*\
  !*** ./models/task.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// module\n\nconst {\n  Schema\n} = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a;\nconst TaskSchema = new Schema({\n  title: String,\n  tags: [String],\n  priority: String,\n  deadline: Date,\n  sentTime: Date,\n  level: String,\n  assignee: {\n    name: String,\n    id: String\n  },\n  todos: [{\n    title: String,\n    completed: Boolean\n  }],\n  created_at: Date,\n  userId: String,\n  wis: String\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('Task', TaskSchema));\n\n//# sourceURL=webpack:///./models/task.js?");

/***/ }),

/***/ "./models/user.js":
/*!************************!*\
  !*** ./models/user.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// module\n\nconst {\n  Schema\n} = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a;\nconst UserSchema = new Schema({\n  id: String,\n  name: String,\n  wis: String\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.model('User', UserSchema));\n\n//# sourceURL=webpack:///./models/user.js?");

/***/ }),

/***/ "./setup/dev.index.js":
/*!****************************!*\
  !*** ./setup/dev.index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server */ \"./setup/server.js\");\n/* harmony import */ var _mongodb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mongodb */ \"./setup/mongodb.js\");\n/* harmony import */ var _logic_main_route__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../logic/main/route */ \"./logic/main/route.js\");\n// modules\n // components\n\n\n\n\nhttp__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(_server__WEBPACK_IMPORTED_MODULE_1__[\"default\"]).listen(3030);\n\n//# sourceURL=webpack:///./setup/dev.index.js?");

/***/ }),

/***/ "./setup/mongodb.js":
/*!**************************!*\
  !*** ./setup/mongodb.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n// modules\n\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connect('mongodb://localhost:27017/Tasklite');\nmongoose__WEBPACK_IMPORTED_MODULE_0___default.a.Promise = Promise;\nconst db = mongoose__WEBPACK_IMPORTED_MODULE_0___default.a.connection;\ndb.on('error', console.log);\n\n//# sourceURL=webpack:///./setup/mongodb.js?");

/***/ }),

/***/ "./setup/server.js":
/*!*************************!*\
  !*** ./setup/server.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n// modules\n\n\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\napp.use(cors__WEBPACK_IMPORTED_MODULE_1___default()({\n  origin: '*'\n}));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({\n  extended: true\n}));\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./setup/server.js?");

/***/ }),

/***/ 0:
/*!**********************************!*\
  !*** multi ./setup/dev.index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./setup/dev.index.js */\"./setup/dev.index.js\");\n\n\n//# sourceURL=webpack:///multi_./setup/dev.index.js?");

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

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

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