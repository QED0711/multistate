"use strict";

var _react = _interopRequireWildcard(require("react"));

var _this3 = void 0;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// const React = require('react')
// const { createContext, Component } = React
// ========================== HELPER METHODS ==========================
var bindMethods = function bindMethods(methods, self) {
  /* 
  takes an object of methods and binds them to a given "self"
  */
  var bound = {};

  for (var method in methods) {
    bound[method] = methods[method].bind(self);
  }

  return bound;
};

var formatStateName = function formatStateName(name) {
  /* 
  Takes an object key (name) as an input, and returns that name capitalized with the word "set" prepended to it.
  If the word already starts with a capital letter (or and underscore _), returns null. 
   This functionality allows for standard key names to automatically get setters, while also allowing for users to specify key names that should not be changed or should not get setters. 
  */
  name = name.split("");
  if (name[0] === name[0].toUpperCase()) return null;
  name[0] = name[0].toUpperCase();
  return "set" + name.join("");
};

var getNestedRoutes = function getNestedRoutes(state) {
  /* 
  takes a state object and returns paths (as arrays) of all routes, including nested object structures
  */
  var paths = [];

  var traverse = function traverse(element) {
    var currentPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    // base cases
    if (_typeof(element) !== "object" || Array.isArray(element) || !element) {
      currentPath.length > 1 && paths.push(currentPath);
      return;
    }

    currentPath.length > 1 && paths.push(currentPath);

    for (var _i = 0, _Object$keys = Object.keys(element); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      traverse(element[key], [].concat(_toConsumableArray(currentPath), [key]));
    }
  };

  traverse(state);
  return paths;
};

var nestedSetterFactory = function nestedSetterFactory(state, nsPath) {
  return function (newValue) {
    var copy = _objectSpread({}, state);

    var currentPath = copy;
    var key;

    for (var i = 0; i < nsPath.length; i++) {
      key = nsPath[i];

      if (i < nsPath.length - 1) {
        // if not on the last key in the provided path
        currentPath[key] = _objectSpread({}, currentPath[key]);
      } else {
        // if on last key, reassign value to the new value
        currentPath[key] = newValue;
      }

      currentPath = currentPath[key];
    }

    return copy;
  };
};

var createStateSetters = function createStateSetters(state) {
  var ignoredSetters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var nestedSetters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var setters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  /* 
  iterates through a provided state object, and takes each key name (state value) and creates a setter method for that value. 
  Following the standard React convention, a key called "myKey" would get a setter method called "setMyKey".
   If bindToLocalStorage is truthy, will also add logic to set localStorage items
  */
  var formattedName;

  var _loop = function _loop(s) {
    formattedName = formatStateName(s);

    if (formattedName && !ignoredSetters.includes(s)) {
      setters[formattedName] = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(value) {
          var _this2 = this;

          var newState;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  newState = {};
                  newState[s] = value;
                  return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
                    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve) {
                      return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              _context3.t0 = resolve;
                              _context3.next = 3;
                              return _this2.setState(newState);

                            case 3:
                              _context3.t1 = _context3.sent;
                              (0, _context3.t0)(_context3.t1);

                            case 5:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      }, _callee3);
                    }));

                    return function (_x4) {
                      return _ref4.apply(this, arguments);
                    };
                  }()));

                case 3:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }();
    }
  };

  for (var s in state) {
    _loop(s);
  } // handle creation of nested setters


  if (nestedSetters) {
    var nestedPaths = getNestedRoutes(state);
    var nestedName;

    var _iterator = _createForOfIteratorHelper(nestedPaths),
        _step;

    try {
      var _loop2 = function _loop2() {
        var nsPath = _step.value;
        nestedName = nsPath.join("_");
        formattedName = formatStateName(nestedName);

        if (formattedName && !ignoredSetters.includes(nestedName)) {
          setters[formattedName] = /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
              var _this = this;

              var newState;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      newState = nestedSetterFactory(this.state, nsPath)(value); // reassign the nested value and return whole state object;

                      return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
                          return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.t0 = resolve;
                                  _context.next = 3;
                                  return _this.setState(newState);

                                case 3:
                                  _context.t1 = _context.sent;
                                  (0, _context.t0)(_context.t1);

                                case 5:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee);
                        }));

                        return function (_x2) {
                          return _ref2.apply(this, arguments);
                        };
                      }()));

                    case 2:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));

            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }();
        }
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop2();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  return setters;
};

var createReducerDispatchers = function createReducerDispatchers(reducers) {
  var reducerMethods = {};

  var _loop3 = function _loop3(r) {
    // console.log(r)
    reducerMethods[r] = function (state, action) {
      _this3.setState(reducers[r](state, action));
    };
  };

  for (var r in reducers) {
    _loop3(r);
  } // console.log(reducerMethods.stateReducer)


  return reducerMethods;
}; // ========================== DEFAULT OPTIONS ==========================


var DEFAULT_OPTIONS = {
  dynamicSetters: true,
  allowSetterOverwrite: true,
  developmentWarnings: true,
  overwriteProtectionLevel: 1,
  nestedSetters: false
};
var DEFAULT_STORAGE_OPTIONS = {
  name: null,
  unmountBehavior: "all"
}; // ========================== multistate CLASS ==========================

var Multistate = /*#__PURE__*/function () {
  function Multistate(state) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Multistate);

    this.context = (0, _react.createContext)(null);
    this.state = state;
    this.setters = {};
    this.reducers = {};
    this.constants = {};
    this.methods = {}; // OPTIONS

    this.options = _objectSpread({}, DEFAULT_OPTIONS, {}, options);
    this.dynamicSetters = this.options.dynamicSetters;
    this.allowSetterOverwrite = this.options.allowSetterOverwrite;
    this.developmentWarnings = this.options.developmentWarnings;
    this.overwriteProtectionLevel = this.options.overwriteProtectionLevel;
    this.nestedSetters = this.options.nestedSetters; // initialize blank storageOptions (will be populated later if user chooses)

    this.storageOptions = {}; // Local Storage Connection

    this.bindToLocalStorage = false;
  }

  _createClass(Multistate, [{
    key: "addCustomSetters",
    value: function addCustomSetters(setters) {
      this.setters = setters;
    }
  }, {
    key: "ignoreSetters",
    value: function ignoreSetters(settersArr) {
      this.ignoredSetters = settersArr || [];
    }
  }, {
    key: "addReducers",
    value: function addReducers(reducers) {
      this.reducers = reducers;
    }
  }, {
    key: "addConstants",
    value: function addConstants(newConstants) {
      this.constants = _objectSpread({}, this.constants, {}, newConstants);
    }
  }, {
    key: "addMethods",
    value: function addMethods(methods) {
      this.methods = methods;
    }
  }, {
    key: "rename",
    value: function rename(nameMap) {
      this.renameMap = nameMap || {};
    }
  }, {
    key: "connectToLocalStorage",
    value: function connectToLocalStorage() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.bindToLocalStorage = true;
      this.storageOptions = _objectSpread({}, DEFAULT_STORAGE_OPTIONS, {}, options);
      if (!this.storageOptions.name) throw new Error("When connecting your multistate instance to the local storage, you must provide an unique name (string) to avoid conflicts with other local storage parameters.");
    }
  }, {
    key: "clearStateFromStorage",
    value: function clearStateFromStorage() {
      var _this4 = this;

      var handleUnload = function handleUnload(e) {
        _this4.storageOptions.name && localStorage.removeItem(_this4.storageOptions.name);
      };

      window.onbeforeunload = handleUnload;
      window.onunload = handleUnload;
    }
  }, {
    key: "createProvider",
    value: function createProvider() {
      // copy instance properties/methods
      var Context = this.context;
      var state = this.state;
      var constants = this.constants;
      var reducers = this.reducers;
      var methods = this.methods;
      var ignoredSetters = this.ignoredSetters;
      var renameMap = this.renameMap || {};
      var bindToLocalStorage = this.bindToLocalStorage;
      var storageOptions = this.storageOptions;
      var setters; // initialize local storage with state

      storageOptions.name && localStorage.setItem(storageOptions.name, JSON.stringify(state)); // Pre class definition setup

      if (this.allowSetterOverwrite) {
        setters = this.dynamicSetters ? _objectSpread({}, createStateSetters(state, ignoredSetters, this.nestedSetters), {}, this.setters) : _objectSpread({}, this.setters);
      } else {
        var dynamicSetters = createStateSetters(state, ignoredSetters);
        var dynamicKeys = Object.keys(dynamicSetters);

        for (var _i2 = 0, _Object$keys2 = Object.keys(this.setters); _i2 < _Object$keys2.length; _i2++) {
          var key = _Object$keys2[_i2];

          if (dynamicKeys.includes(key)) {
            if (this.developmentWarnings) {
              this.overwriteProtectionLevel === 1 && console.warn("The user defined setter, '".concat(key, "', was blocked from overwriting a dynamically generated setter of the same name. To change this behavior, set allowSetterOverwrite to true in the multistate options."));

              if (this.overwriteProtectionLevel >= 2) {
                throw new Error("The user defined setter, '".concat(key, "', was blocked from overwriting a dynamically generated setter of the same name. To change this behavior, set allowSetterOverwrite to true in the multistate options."));
              }
            }

            delete this.setters[key];
          }
        }

        setters = this.dynamicSetters ? _objectSpread({}, createStateSetters(state, ignoredSetters, this.nestedSetters), {}, this.setters) : _objectSpread({}, this.setters);
      } // define Provider class component


      var Provider = /*#__PURE__*/function (_Component) {
        _inherits(Provider, _Component);

        var _super = _createSuper(Provider);

        function Provider(props) {
          var _this5;

          _classCallCheck(this, Provider);

          _this5 = _super.call(this, props);
          _this5.state = state;
          _this5.setters = bindMethods(setters, _assertThisInitialized(_this5)); // set this.reducers to the reducered added in the multistate Class 

          _this5.reducers = reducers; // bind generatDispatchers

          _this5.generateDispatchers = _this5.generateDispatchers.bind(_assertThisInitialized(_this5)); // Create reducers that are copies in name of the previously added reducers
          // Then, give a dispatch method to each that will execute the actual reducer

          _this5.reducersWithDispatchers = _this5.generateDispatchers(reducers);
          _this5.methods = bindMethods(methods, _assertThisInitialized(_this5));
          _this5.bindToLocalStorage = bindToLocalStorage;
          _this5.storageOptions = storageOptions;
          _this5.updateStateFromLocalStorage = _this5.updateStateFromLocalStorage.bind(_assertThisInitialized(_this5)); // Save master version of setState prior to reassignment

          _this5.setStateMaster = _this5.setState; // Reassign setState function to return a promise, and by default, handle localStorage changes

          _this5.setState = function (state) {
            var _this6 = this;

            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
            return new Promise(function (resolve) {
              _this6.setStateMaster(state, function () {
                _this6.bindToLocalStorage && localStorage.setItem(_this6.storageOptions.name, JSON.stringify(_this6.state));
                callback(_this6.state);
                resolve(_this6.state);
              });
            });
          };

          _this5.setState = _this5.setState.bind(_assertThisInitialized(_this5));
          return _this5;
        }

        _createClass(Provider, [{
          key: "generateDispatchers",
          value: function generateDispatchers(reducers) {
            var reducersWithDispatchers = {}; // define a dispatcher factory to handle the creation of new dispatchers

            var dispatcherFactory = function dispatcherFactory(reducerKey) {
              return function (state, action) {
                this.setState(this.reducers[reducerKey](state, action));
              };
            };

            var dispatch;

            for (var reducer in reducers) {
              dispatch = dispatcherFactory(reducer).bind(this);
              reducersWithDispatchers[reducer] = {
                dispatch: dispatch
              };
            }

            return reducersWithDispatchers;
          }
        }, {
          key: "updateStateFromLocalStorage",
          value: function updateStateFromLocalStorage() {
            var _this7 = this;

            try {
              this.setState(_objectSpread({}, this.state, {}, JSON.parse(localStorage[storageOptions.name])));
            } catch (err) {
              var updatedState = typeof localStorage[storageOptions.name] === "string" ? _objectSpread({}, this.state, {}, JSON.parse(localStorage[storageOptions.name])) : _objectSpread({}, this.state);
              this.setState(updatedState, function () {
                localStorage.setItem(storageOptions.name, JSON.stringify(_this7.state));
              });
            }
          }
        }, {
          key: "componentDidMount",
          value: function componentDidMount() {
            var _this8 = this;

            // When component mounts, if bindToLocalStorage has been set to true, make the window listen for storage change events and update the state 
            // if the window is already listening for storage events, then do nothing
            if (bindToLocalStorage && !window.onstorage) {
              window.onstorage = function (e) {
                _this8.updateStateFromLocalStorage();
              };
            }
          }
        }, {
          key: "render",
          value: function render() {
            var value = {
              state: this.state,
              setters: this.setters,
              constants: constants,
              methods: this.methods
            }; // add reducers with dispatchers

            if (Object.keys(reducers).length) value.reducers = this.reducersWithDispatchers; // rename value keys to user specifications

            for (var _i3 = 0, _Object$keys3 = Object.keys(renameMap); _i3 < _Object$keys3.length; _i3++) {
              var _key = _Object$keys3[_i3];

              if (value[_key]) {
                value[renameMap[_key]] = value[_key];
                delete value[_key]; // reassign the value in 'this' for reference in across method types (setters, methods, etc.)

                this[renameMap[_key]] = this[_key];
              }
            }

            return /*#__PURE__*/_react["default"].createElement(Context.Provider, {
              value: value
            }, this.props.children);
          }
        }]);

        return Provider;
      }(_react.Component); // return provider class


      return Provider;
    }
  }]);

  return Multistate;
}();

module.exports = Multistate;
