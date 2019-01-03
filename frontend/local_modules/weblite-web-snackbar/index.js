!function(e,r){if("object"==typeof exports&&"object"==typeof module)module.exports=r(require("ramda"),require("prop-types"),require("rxjs/operators"),require("react"),require("redux-observable"),require("redux"),require("react-redux"),require("redux-actions"),require("weblite-web-relite"),require("reselect"));else if("function"==typeof define&&define.amd)define(["ramda","prop-types","rxjs/operators","react","redux-observable","redux","react-redux","redux-actions","weblite-web-relite","reselect"],r);else{var t="object"==typeof exports?r(require("ramda"),require("prop-types"),require("rxjs/operators"),require("react"),require("redux-observable"),require("redux"),require("react-redux"),require("redux-actions"),require("weblite-web-relite"),require("reselect")):r(e.ramda,e["prop-types"],e["rxjs/operators"],e.react,e["redux-observable"],e.redux,e["react-redux"],e["redux-actions"],e["weblite-web-relite"],e.reselect);for(var n in t)("object"==typeof exports?exports:e)[n]=t[n]}}(window,function(e,r,t,n,o,a,u,i,c,p){return function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="/",t(t.s=10)}([function(r,t){r.exports=e},function(e,t){e.exports=r},function(e,r){e.exports=t},function(e,r){e.exports=n},function(e,r){e.exports=o},function(e,r){e.exports=a},function(e,r){e.exports=u},function(e,r){e.exports=i},function(e,r){e.exports=c},function(e,r){e.exports=p},function(e,r,t){e.exports=t(11)},function(e,r,t){"use strict";t.r(r);var n,o=t(3),a=t.n(o),u=t(6),i=t(5),c=t(4),p=t(0),s=t(2),l=t(7),f=Object(l.createAction)("SET_SNACKBAR_OPEN"),d=Object(l.createAction)("PUSH_SNACKBAR_QUEUE",function(e){return{message:e}}),b=function(){return A(d.apply(void 0,arguments))},x=Object(l.createAction)("SHIFT_SNACKBAR_QUEUE"),O=function(){return A(x.apply(void 0,arguments))},y={queue:[],open:!1},_=p.lensProp("queue"),j=p.lensProp("open"),v=function(){return p.path(["snackbar","queue"])(P())},E=function(){return p.path(["snackbar","open"])(P())},S=((n={}).SET_SNACKBAR_OPEN=function(e,r){return p.set(j,r)(e)},n.PUSH_SNACKBAR_QUEUE=function(e,r){var t=r.message;return p.over(_,p.append(t))(e)},n.SHIFT_SNACKBAR_QUEUE=function(e){return p.over(_,p.drop(1))(e)},n);var m=Object(c.combineEpics)(function(e){return e.pipe(Object(c.ofType)("SET_SNACKBAR_OPEN"),Object(s.filter)(function(e){return!p.path(["payload"])(e)}),Object(s.delay)(400),Object(s.map)(O),Object(s.filter)(function(){return 0!==v().length}),Object(s.mapTo)(f(!0)))},function(e){return e.pipe(Object(c.ofType)("PUSH_SNACKBAR_QUEUE"),Object(s.filter)(function(){return!E()}),Object(s.mapTo)(f(!0)))}),g="object"==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({name:"snackbar"}):i.compose,q=Object(c.createEpicMiddleware)(),w=Object(i.createStore)(Object(i.combineReducers)({snackbar:function(e,r){void 0===e&&(e=y);var t=r.type,n=r.payload;return S[t]?S[t](e,n):e}}),g(Object(i.applyMiddleware)(q)));q.run(m);var A=w.dispatch,P=w.getState,C=w,T=t(1),N=t.n(T),U=t(8),h=function(e){var r=e.open,t=e.message,n=t.title,o=t.body,u=t.autoHideDuration,i=t.avatar,c=e.location,p=e.onClose;return a.a.createElement(U.Snackbar,{autoHideDuration:u||3e3,open:r,anchorOrigin:c},a.a.createElement(U.SnackbarContent,{style:{backgroundColor:"rgba(0, 0, 0, 0.8)",zIndex:"102"},avatarProps:{full:!0,src:i},snackContentProps:{title:n,body:o,onCloseClick:p}}))};h.propTypes={open:N.a.bool.isRequired,message:N.a.shape({title:N.a.string,body:N.a.string,autoHideDuration:N.a.number,avatar:N.a.string}),location:N.a.shape({vertical:N.a.string,horizontal:N.a.string}),onClose:N.a.func.isRequired},h.defaultProps={message:{title:"",body:"",autoHideDuration:3e3,avatar:""},location:{vertical:"top",horizontal:"right"}};var R=h,k=t(9),H=Object(k.createSelector)([v],function(e){return e.length?e[0]:{}}),M=Object(u.connect)(function(e){return{open:E(),message:H(e)}},function(){return{onClose:function(){return function(){return A(f.apply(void 0,arguments))}(!1)}}})(R);t.d(r,"snackbarMessage",function(){return b});r.default=function(e){return a.a.createElement(u.Provider,{store:C},a.a.createElement(M,e))}}])});
//# sourceMappingURL=index.js.map