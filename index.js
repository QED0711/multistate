"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fs = require("fs");

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
}); // Get Arguments 

var argString = process.argv.slice(2).join(" "); // const nameSearch = /\s?\w+\s?/g

var nameSearch = /--name=\w+/;
var chainSearch = /\-[scmr]+/g;
var keywordSearch = /(state|setters|constants|methods|reducers)=\w+/g;
/* 
::::::::::::::::
:: ARG PARSER ::
::::::::::::::::
*/

var argParser = function argParser() {
  var FILES = {
    state: null,
    setters: null,
    methods: null,
    reducers: null,
    constants: null
  };
  var FLAG_MAP = {
    s: "state",
    c: "setters",
    m: "methods",
    r: "reducers",
    k: "constants"
  }; // 1. Search for flags

  var foundFlags = argString.match(chainSearch);
  foundFlags = foundFlags ? foundFlags.map(function (f) {
    return f.replace(/-/g, "");
  }).join("").split("").map(function (f) {
    return FLAG_MAP[f];
  }) : []; // 2. search for keyword arguments

  var keywords = argString.match(keywordSearch) || [];
  var foundKeywords = [];
  var foundKeywordValues = {};
  keywords.forEach(function (kwAssignment) {
    var _kwAssignment$split = kwAssignment.split('='),
        _kwAssignment$split2 = _slicedToArray(_kwAssignment$split, 2),
        kw = _kwAssignment$split2[0],
        val = _kwAssignment$split2[1];

    foundKeywords.push(kw);
    foundKeywordValues[kw] = val;
  }); // 3. combine flags and keyword arguments

  var allFlags = Array.from(new Set([].concat(_toConsumableArray(foundFlags), foundKeywords))); // 4. apply filenames (user specified from keyword arguments or default from flags)

  allFlags.forEach(function (f) {
    return FILES[f] = f ? foundKeywordValues[f] || f : null;
  }); // 5. return results

  return FILES;
};
/* 
::::::::::::::::::
:: FILE WRITERS ::
::::::::::::::::::
*/


var writeProvider = function writeProvider(name, supportFiles) {
  var supportImports = "";
  var sf;

  for (var _i2 = 0, _Object$keys = Object.keys(supportFiles); _i2 < _Object$keys.length; _i2++) {
    var sfKey = _Object$keys[_i2];
    sf = supportFiles[sfKey];
    if (sf) supportImports += "const ".concat(sf, " = require('./").concat(sf, "')\n");
  } // console.log(supportImports)


  var fileContents = "\nconst Multistate = require('multistate')\n\n".concat(supportImports, "\n\n").concat(supportFiles.state ? "const ".concat(name, " = new Multistate(state)") : "const ".concat(name, " = new Multistate({})"), "\n\n").concat(supportFiles.setters ? "".concat(name, ".addCustomSetters(").concat(supportFiles.setters, ")") : "", "\n").concat(supportFiles.methods ? "".concat(name, ".addMethods(").concat(supportFiles.methods, ")") : "", "\n").concat(supportFiles.reducers ? "".concat(name, ".addReducers(").concat(supportFiles.reducers, ")") : "", "\n").concat(supportFiles.constants ? "".concat(name, ".addConstants(").concat(supportFiles.constants, ")") : "", "\n\nmodule.exports = {\n    ").concat(name, "Context: ").concat(name, ".context,\n    ").concat(capName(name), "Provider: ").concat(name, ".createProvider()\n}\n    "); // create state directory if it doesn't exist

  !fs.existsSync("./src/state/") && fs.mkdirSync("./src/state"); // create/overwrite previous directory of named resource

  fs.mkdirSync("./src/state/".concat(name)); // create provider file

  fs.writeFileSync("./src/state/".concat(name, "/").concat(name, "Provider.js"), fileContents);
  console.log("created ./src/state/".concat(name, "/").concat(name, "Provider.js"));
};

var writeSupportFiles = function writeSupportFiles(name, files) {
  var sf, fileContents;

  for (var _i3 = 0, _Object$keys2 = Object.keys(files); _i3 < _Object$keys2.length; _i3++) {
    var sfKey = _Object$keys2[_i3];
    sf = files[sfKey];

    if (sf) {
      fileContents = genSupportFileTemplate(sf, sfKey);
      fs.writeFileSync("./src/state/".concat(name, "/").concat(sf, ".js"), fileContents);
      console.log("created ./src/state/".concat(name, "/").concat(sf, ".js"));
    }
  }
};
/* 
:::::::::::::
:: HELPERS ::
:::::::::::::
*/


var prompt = function prompt(question) {
  return new Promise(function (resolve) {
    return rl.question(question, function (input) {
      return resolve(input);
    });
  });
};

var genSupportFileTemplate = function genSupportFileTemplate(supportFile, fileType) {
  return "\nconst ".concat(supportFile, " = {\n\n    // your ").concat(fileType, " here...\n\n}\n\nmodule.exports = ").concat(supportFile, "\n    ");
};

var capName = function capName(name) {
  var newName = name.split("");
  newName[0] = newName[0].toUpperCase();
  return newName.join("");
};

var noFiles = function noFiles(files) {
  for (var _i4 = 0, _Object$keys3 = Object.keys(files); _i4 < _Object$keys3.length; _i4++) {
    var file = _Object$keys3[_i4];
    if (files[file]) return false;
  }

  return true;
};
/* 
:::::::::::::::::::::
:: SCRIPT EXECUTOR ::
:::::::::::::::::::::
*/


var run = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var name, filesToMake, currentFile, _i5, _Object$keys4, file;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // 1. get the name of the state resource from the user (either from the --name flag or from prompt)
            name = argString.match(nameSearch);

            if (!name) {
              _context.next = 5;
              break;
            }

            _context.t0 = name[0].split("=")[1];
            _context.next = 8;
            break;

          case 5:
            _context.next = 7;
            return prompt("What would you like to name this state resource: ");

          case 7:
            _context.t0 = _context.sent;

          case 8:
            name = _context.t0;
            console.log("State Resource: ", name); // 2a. find any flags or keyword arguments in the argument string

            filesToMake = argParser(); // 2b. If no arguments given, walk through assigning values

            if (!noFiles(filesToMake)) {
              _context.next = 25;
              break;
            }

            console.log("\n=== No arguments detected ===");
            console.log("Initializing Setup Wizard");
            console.log("\nFor each support file listed, provide a name. If you want the default name, just press ENTER. If you do not want to include the support file, type 'n'.\n");
            _i5 = 0, _Object$keys4 = Object.keys(filesToMake);

          case 16:
            if (!(_i5 < _Object$keys4.length)) {
              _context.next = 25;
              break;
            }

            file = _Object$keys4[_i5];
            _context.next = 20;
            return prompt(file + ": ");

          case 20:
            currentFile = _context.sent;
            filesToMake[file] = currentFile.toLowerCase() === "n" ? null : currentFile.length ? currentFile : file;

          case 22:
            _i5++;
            _context.next = 16;
            break;

          case 25:
            rl.close(); // 3. write the main provider file

            writeProvider(name, filesToMake); // 4. write support files

            writeSupportFiles(name, filesToMake);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function run() {
    return _ref.apply(this, arguments);
  };
}();

run();
"use strict";

var _this2 = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import React, { createContext, Component } from "react";
var React = require('react');

var createContext = React.createContext,
    Component = React.Component; // ========================== HELPER METHODS ==========================

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

var createStateSetters = function createStateSetters(state, bindToLocalStorage) {
  var storageName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var setters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  /* 
  iterates through a provided state object, and takes each key name (state value) and creates a setter method for that value. 
  Following the standard React convention, a key called "myKey" would get a setter method called "setMyKey".
   If bindToLocalStorage is truthy, will also add logic to set localStorage items
  */
  var formattedName;

  var _loop = function _loop(s) {
    formattedName = formatStateName(s);

    if (formattedName) {
      setters[formattedName] = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(value) {
          var _this = this;

          var newState;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  newState = {};
                  newState[s] = value;
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

                case 3:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();
    }
  };

  for (var s in state) {
    _loop(s);
  }

  return setters;
};

var createReducerDispatchers = function createReducerDispatchers(reducers) {
  var reducerMethods = {};

  var _loop2 = function _loop2(r) {
    // console.log(r)
    reducerMethods[r] = function (state, action) {
      _this2.setState(reducers[r](state, action));
    };
  };

  for (var r in reducers) {
    _loop2(r);
  } // console.log(reducerMethods.stateReducer)


  return reducerMethods;
}; // ========================== DEFAULT OPTIONS ==========================


var DEFAULT_OPTIONS = {
  dynamicSetters: true,
  allowSetterOverwrite: true,
  developmentWarnings: true,
  overwriteProtectionLevel: 1
};
var DEFAULT_STORAGE_OPTIONS = {
  name: null,
  unmountBehavior: "all"
}; // ========================== multistate CLASS ==========================

var Multistate = /*#__PURE__*/function () {
  function Multistate(state) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Multistate);

    this.context = createContext(null);
    this.state = state;
    this.setters = {};
    this.reducers = {};
    this.constants = {};
    this.methods = {}; // OPTIONS

    this.options = _objectSpread({}, DEFAULT_OPTIONS, {}, options);
    this.dynamicSetters = this.options.dynamicSetters;
    this.allowSetterOverwrite = this.options.allowSetterOverwrite;
    this.developmentWarnings = this.options.developmentWarnings;
    this.overwriteProtectionLevel = this.options.overwriteProtectionLevel; // initialize blank storageOptions (will be populated later if user chooses)

    this.storageOptions = {}; // Local Storage Connection

    this.bindToLocalStorage = false;
  }

  _createClass(Multistate, [{
    key: "addCustomSetters",
    value: function addCustomSetters(setters) {
      this.setters = setters;
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
      var _this3 = this;

      var handleUnload = function handleUnload(e) {
        _this3.storageOptions.name && localStorage.removeItem(_this3.storageOptions.name);
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
      var bindToLocalStorage = this.bindToLocalStorage;
      var storageOptions = this.storageOptions;
      var setters; // initialize local storage with state

      storageOptions.name && localStorage.setItem(storageOptions.name, JSON.stringify(state)); // Pre class definition setup

      if (this.allowSetterOverwrite) {
        setters = this.dynamicSetters ? _objectSpread({}, createStateSetters(state, bindToLocalStorage, storageOptions.name), {}, this.setters) : _objectSpread({}, this.setters);
      } else {
        var dynamicSetters = createStateSetters(state, bindToLocalStorage, storageOptions.name);
        var dynamicKeys = Object.keys(dynamicSetters);

        for (var _i = 0, _Object$keys = Object.keys(this.setters); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];

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

        setters = this.dynamicSetters ? _objectSpread({}, createStateSetters(state, bindToLocalStorage, storageOptions.name), {}, this.setters) : _objectSpread({}, this.setters);
      } // define Provider class component


      var Provider = /*#__PURE__*/function (_Component) {
        _inherits(Provider, _Component);

        function Provider(props) {
          var _this4;

          _classCallCheck(this, Provider);

          _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Provider).call(this, props));
          _this4.state = state;
          _this4.setters = bindMethods(setters, _assertThisInitialized(_this4)); // set this.reducers to the reducered added in the multistate Class 

          _this4.reducers = reducers; // bind generatDispatchers

          _this4.generateDispatchers = _this4.generateDispatchers.bind(_assertThisInitialized(_this4)); // Create reducers that are copies in name of the previously added reducers
          // Then, give a dispatch method to each that will execute the actual reducer

          _this4.reducersWithDispatchers = _this4.generateDispatchers(reducers);
          _this4.methods = bindMethods(methods, _assertThisInitialized(_this4));
          _this4.bindToLocalStorage = bindToLocalStorage;
          _this4.storageOptions = storageOptions;
          _this4.updateStateFromLocalStorage = _this4.updateStateFromLocalStorage.bind(_assertThisInitialized(_this4)); // Save master version of setState prior to reassignment

          _this4.setStateMaster = _this4.setState; // Reassign setState function to return a promise, and by default, handle localStorage changes

          _this4.setState = function (state) {
            var _this5 = this;

            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
            return new Promise(function (resolve) {
              _this5.setStateMaster(state, function () {
                _this5.bindToLocalStorage && localStorage.setItem(_this5.storageOptions.name, JSON.stringify(_this5.state));
                callback(_this5.state);
                resolve(_this5.state);
              });
            });
          };

          _this4.setState = _this4.setState.bind(_assertThisInitialized(_this4));
          return _this4;
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
            var _this6 = this;

            try {
              this.setState(_objectSpread({}, this.state, {}, JSON.parse(localStorage[storageOptions.name])));
            } catch (err) {
              var updatedState = typeof localStorage[storageOptions.name] === "string" ? _objectSpread({}, this.state, {}, JSON.parse(localStorage[storageOptions.name])) : _objectSpread({}, this.state);
              this.setState(updatedState, function () {
                localStorage.setItem(storageOptions.name, JSON.stringify(_this6.state));
              });
            }
          }
        }, {
          key: "componentDidMount",
          value: function componentDidMount() {
            var _this7 = this;

            // When component mounts, if bindToLocalStorage has been set to true, make the window listen for storage change events and update the state 
            // if the window is already listening for storage events, then do nothing
            if (bindToLocalStorage && !window.onstorage) {
              window.onstorage = function (e) {
                _this7.updateStateFromLocalStorage();
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
            };
            if (Object.keys(reducers).length) value.reducers = this.reducersWithDispatchers;
            return React.createElement(Context.Provider, {
              value: value
            }, this.props.children);
          }
        }]);

        return Provider;
      }(Component); // return provider class


      return Provider;
    }
  }]);

  return Multistate;
}();

module.exports = Multistate;
