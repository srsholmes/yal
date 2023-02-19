#! /usr/bin/env node
import { createRequire as topLevelCreateRequire } from "module"; const require = topLevelCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/prompts/node_modules/kleur/index.js
var require_kleur = __commonJS({
  "../../node_modules/prompts/node_modules/kleur/index.js"(exports, module2) {
    "use strict";
    var { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = process.env;
    var $ = {
      enabled: !NODE_DISABLE_COLORS && TERM !== "dumb" && FORCE_COLOR !== "0",
      reset: init(0, 0),
      bold: init(1, 22),
      dim: init(2, 22),
      italic: init(3, 23),
      underline: init(4, 24),
      inverse: init(7, 27),
      hidden: init(8, 28),
      strikethrough: init(9, 29),
      black: init(30, 39),
      red: init(31, 39),
      green: init(32, 39),
      yellow: init(33, 39),
      blue: init(34, 39),
      magenta: init(35, 39),
      cyan: init(36, 39),
      white: init(37, 39),
      gray: init(90, 39),
      grey: init(90, 39),
      bgBlack: init(40, 49),
      bgRed: init(41, 49),
      bgGreen: init(42, 49),
      bgYellow: init(43, 49),
      bgBlue: init(44, 49),
      bgMagenta: init(45, 49),
      bgCyan: init(46, 49),
      bgWhite: init(47, 49)
    };
    function run(arr, str) {
      let i = 0, tmp, beg = "", end = "";
      for (; i < arr.length; i++) {
        tmp = arr[i];
        beg += tmp.open;
        end += tmp.close;
        if (str.includes(tmp.close)) {
          str = str.replace(tmp.rgx, tmp.close + tmp.open);
        }
      }
      return beg + str + end;
    }
    function chain(has, keys) {
      let ctx = { has, keys };
      ctx.reset = $.reset.bind(ctx);
      ctx.bold = $.bold.bind(ctx);
      ctx.dim = $.dim.bind(ctx);
      ctx.italic = $.italic.bind(ctx);
      ctx.underline = $.underline.bind(ctx);
      ctx.inverse = $.inverse.bind(ctx);
      ctx.hidden = $.hidden.bind(ctx);
      ctx.strikethrough = $.strikethrough.bind(ctx);
      ctx.black = $.black.bind(ctx);
      ctx.red = $.red.bind(ctx);
      ctx.green = $.green.bind(ctx);
      ctx.yellow = $.yellow.bind(ctx);
      ctx.blue = $.blue.bind(ctx);
      ctx.magenta = $.magenta.bind(ctx);
      ctx.cyan = $.cyan.bind(ctx);
      ctx.white = $.white.bind(ctx);
      ctx.gray = $.gray.bind(ctx);
      ctx.grey = $.grey.bind(ctx);
      ctx.bgBlack = $.bgBlack.bind(ctx);
      ctx.bgRed = $.bgRed.bind(ctx);
      ctx.bgGreen = $.bgGreen.bind(ctx);
      ctx.bgYellow = $.bgYellow.bind(ctx);
      ctx.bgBlue = $.bgBlue.bind(ctx);
      ctx.bgMagenta = $.bgMagenta.bind(ctx);
      ctx.bgCyan = $.bgCyan.bind(ctx);
      ctx.bgWhite = $.bgWhite.bind(ctx);
      return ctx;
    }
    function init(open, close) {
      let blk = {
        open: `\x1B[${open}m`,
        close: `\x1B[${close}m`,
        rgx: new RegExp(`\\x1b\\[${close}m`, "g")
      };
      return function(txt) {
        if (this !== void 0 && this.has !== void 0) {
          this.has.includes(open) || (this.has.push(open), this.keys.push(blk));
          return txt === void 0 ? this : $.enabled ? run(this.keys, txt + "") : txt + "";
        }
        return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt + "") : txt + "";
      };
    }
    module2.exports = $;
  }
});

// ../../node_modules/prompts/dist/util/action.js
var require_action = __commonJS({
  "../../node_modules/prompts/dist/util/action.js"(exports, module2) {
    "use strict";
    module2.exports = (key, isSelect) => {
      if (key.meta && key.name !== "escape")
        return;
      if (key.ctrl) {
        if (key.name === "a")
          return "first";
        if (key.name === "c")
          return "abort";
        if (key.name === "d")
          return "abort";
        if (key.name === "e")
          return "last";
        if (key.name === "g")
          return "reset";
      }
      if (isSelect) {
        if (key.name === "j")
          return "down";
        if (key.name === "k")
          return "up";
      }
      if (key.name === "return")
        return "submit";
      if (key.name === "enter")
        return "submit";
      if (key.name === "backspace")
        return "delete";
      if (key.name === "delete")
        return "deleteForward";
      if (key.name === "abort")
        return "abort";
      if (key.name === "escape")
        return "exit";
      if (key.name === "tab")
        return "next";
      if (key.name === "pagedown")
        return "nextPage";
      if (key.name === "pageup")
        return "prevPage";
      if (key.name === "home")
        return "home";
      if (key.name === "end")
        return "end";
      if (key.name === "up")
        return "up";
      if (key.name === "down")
        return "down";
      if (key.name === "right")
        return "right";
      if (key.name === "left")
        return "left";
      return false;
    };
  }
});

// ../../node_modules/prompts/dist/util/strip.js
var require_strip = __commonJS({
  "../../node_modules/prompts/dist/util/strip.js"(exports, module2) {
    "use strict";
    module2.exports = (str) => {
      const pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"].join("|");
      const RGX = new RegExp(pattern, "g");
      return typeof str === "string" ? str.replace(RGX, "") : str;
    };
  }
});

// ../../node_modules/sisteransi/src/index.js
var require_src = __commonJS({
  "../../node_modules/sisteransi/src/index.js"(exports, module2) {
    "use strict";
    var ESC = "\x1B";
    var CSI = `${ESC}[`;
    var beep = "\x07";
    var cursor = {
      to(x, y) {
        if (!y)
          return `${CSI}${x + 1}G`;
        return `${CSI}${y + 1};${x + 1}H`;
      },
      move(x, y) {
        let ret = "";
        if (x < 0)
          ret += `${CSI}${-x}D`;
        else if (x > 0)
          ret += `${CSI}${x}C`;
        if (y < 0)
          ret += `${CSI}${-y}A`;
        else if (y > 0)
          ret += `${CSI}${y}B`;
        return ret;
      },
      up: (count = 1) => `${CSI}${count}A`,
      down: (count = 1) => `${CSI}${count}B`,
      forward: (count = 1) => `${CSI}${count}C`,
      backward: (count = 1) => `${CSI}${count}D`,
      nextLine: (count = 1) => `${CSI}E`.repeat(count),
      prevLine: (count = 1) => `${CSI}F`.repeat(count),
      left: `${CSI}G`,
      hide: `${CSI}?25l`,
      show: `${CSI}?25h`,
      save: `${ESC}7`,
      restore: `${ESC}8`
    };
    var scroll = {
      up: (count = 1) => `${CSI}S`.repeat(count),
      down: (count = 1) => `${CSI}T`.repeat(count)
    };
    var erase = {
      screen: `${CSI}2J`,
      up: (count = 1) => `${CSI}1J`.repeat(count),
      down: (count = 1) => `${CSI}J`.repeat(count),
      line: `${CSI}2K`,
      lineEnd: `${CSI}K`,
      lineStart: `${CSI}1K`,
      lines(count) {
        let clear = "";
        for (let i = 0; i < count; i++)
          clear += this.line + (i < count - 1 ? cursor.up() : "");
        if (count)
          clear += cursor.left;
        return clear;
      }
    };
    module2.exports = { cursor, scroll, erase, beep };
  }
});

// ../../node_modules/prompts/dist/util/clear.js
var require_clear = __commonJS({
  "../../node_modules/prompts/dist/util/clear.js"(exports, module2) {
    "use strict";
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          var F = function F2() {
          };
          return { s: F, n: function n() {
            if (i >= o.length)
              return { done: true };
            return { done: false, value: o[i++] };
          }, e: function e(_e) {
            throw _e;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return { s: function s() {
        it = it.call(o);
      }, n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      }, e: function e(_e2) {
        didErr = true;
        err = _e2;
      }, f: function f() {
        try {
          if (!normalCompletion && it.return != null)
            it.return();
        } finally {
          if (didErr)
            throw err;
        }
      } };
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    var strip = require_strip();
    var _require = require_src();
    var erase = _require.erase;
    var cursor = _require.cursor;
    var width = (str) => [...strip(str)].length;
    module2.exports = function(prompt, perLine) {
      if (!perLine)
        return erase.line + cursor.to(0);
      let rows = 0;
      const lines = prompt.split(/\r?\n/);
      var _iterator = _createForOfIteratorHelper(lines), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          let line = _step.value;
          rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return erase.lines(rows);
    };
  }
});

// ../../node_modules/prompts/dist/util/figures.js
var require_figures = __commonJS({
  "../../node_modules/prompts/dist/util/figures.js"(exports, module2) {
    "use strict";
    var main = {
      arrowUp: "\u2191",
      arrowDown: "\u2193",
      arrowLeft: "\u2190",
      arrowRight: "\u2192",
      radioOn: "\u25C9",
      radioOff: "\u25EF",
      tick: "\u2714",
      cross: "\u2716",
      ellipsis: "\u2026",
      pointerSmall: "\u203A",
      line: "\u2500",
      pointer: "\u276F"
    };
    var win = {
      arrowUp: main.arrowUp,
      arrowDown: main.arrowDown,
      arrowLeft: main.arrowLeft,
      arrowRight: main.arrowRight,
      radioOn: "(*)",
      radioOff: "( )",
      tick: "\u221A",
      cross: "\xD7",
      ellipsis: "...",
      pointerSmall: "\xBB",
      line: "\u2500",
      pointer: ">"
    };
    var figures = process.platform === "win32" ? win : main;
    module2.exports = figures;
  }
});

// ../../node_modules/prompts/dist/util/style.js
var require_style = __commonJS({
  "../../node_modules/prompts/dist/util/style.js"(exports, module2) {
    "use strict";
    var c = require_kleur();
    var figures = require_figures();
    var styles = Object.freeze({
      password: {
        scale: 1,
        render: (input) => "*".repeat(input.length)
      },
      emoji: {
        scale: 2,
        render: (input) => "\u{1F603}".repeat(input.length)
      },
      invisible: {
        scale: 0,
        render: (input) => ""
      },
      default: {
        scale: 1,
        render: (input) => `${input}`
      }
    });
    var render = (type) => styles[type] || styles.default;
    var symbols = Object.freeze({
      aborted: c.red(figures.cross),
      done: c.green(figures.tick),
      exited: c.yellow(figures.cross),
      default: c.cyan("?")
    });
    var symbol = (done, aborted, exited) => aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default;
    var delimiter = (completing) => c.gray(completing ? figures.ellipsis : figures.pointerSmall);
    var item = (expandable, expanded) => c.gray(expandable ? expanded ? figures.pointerSmall : "+" : figures.line);
    module2.exports = {
      styles,
      render,
      symbols,
      symbol,
      delimiter,
      item
    };
  }
});

// ../../node_modules/prompts/dist/util/lines.js
var require_lines = __commonJS({
  "../../node_modules/prompts/dist/util/lines.js"(exports, module2) {
    "use strict";
    var strip = require_strip();
    module2.exports = function(msg, perLine) {
      let lines = String(strip(msg) || "").split(/\r?\n/);
      if (!perLine)
        return lines.length;
      return lines.map((l) => Math.ceil(l.length / perLine)).reduce((a, b) => a + b);
    };
  }
});

// ../../node_modules/prompts/dist/util/wrap.js
var require_wrap = __commonJS({
  "../../node_modules/prompts/dist/util/wrap.js"(exports, module2) {
    "use strict";
    module2.exports = (msg, opts = {}) => {
      const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(" ").join("") : opts.margin || "";
      const width = opts.width;
      return (msg || "").split(/\r?\n/g).map((line) => line.split(/\s+/g).reduce((arr, w) => {
        if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width)
          arr[arr.length - 1] += ` ${w}`;
        else
          arr.push(`${tab}${w}`);
        return arr;
      }, [tab]).join("\n")).join("\n");
    };
  }
});

// ../../node_modules/prompts/dist/util/entriesToDisplay.js
var require_entriesToDisplay = __commonJS({
  "../../node_modules/prompts/dist/util/entriesToDisplay.js"(exports, module2) {
    "use strict";
    module2.exports = (cursor, total, maxVisible) => {
      maxVisible = maxVisible || total;
      let startIndex = Math.min(total - maxVisible, cursor - Math.floor(maxVisible / 2));
      if (startIndex < 0)
        startIndex = 0;
      let endIndex = Math.min(startIndex + maxVisible, total);
      return {
        startIndex,
        endIndex
      };
    };
  }
});

// ../../node_modules/prompts/dist/util/index.js
var require_util = __commonJS({
  "../../node_modules/prompts/dist/util/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      action: require_action(),
      clear: require_clear(),
      style: require_style(),
      strip: require_strip(),
      figures: require_figures(),
      lines: require_lines(),
      wrap: require_wrap(),
      entriesToDisplay: require_entriesToDisplay()
    };
  }
});

// ../../node_modules/prompts/dist/elements/prompt.js
var require_prompt = __commonJS({
  "../../node_modules/prompts/dist/elements/prompt.js"(exports, module2) {
    "use strict";
    var readline = require("readline");
    var _require = require_util();
    var action = _require.action;
    var EventEmitter = require("events");
    var _require2 = require_src();
    var beep = _require2.beep;
    var cursor = _require2.cursor;
    var color = require_kleur();
    var Prompt = class extends EventEmitter {
      constructor(opts = {}) {
        super();
        this.firstRender = true;
        this.in = opts.stdin || process.stdin;
        this.out = opts.stdout || process.stdout;
        this.onRender = (opts.onRender || (() => void 0)).bind(this);
        const rl = readline.createInterface({
          input: this.in,
          escapeCodeTimeout: 50
        });
        readline.emitKeypressEvents(this.in, rl);
        if (this.in.isTTY)
          this.in.setRawMode(true);
        const isSelect = ["SelectPrompt", "MultiselectPrompt"].indexOf(this.constructor.name) > -1;
        const keypress = (str, key) => {
          let a = action(key, isSelect);
          if (a === false) {
            this._ && this._(str, key);
          } else if (typeof this[a] === "function") {
            this[a](key);
          } else {
            this.bell();
          }
        };
        this.close = () => {
          this.out.write(cursor.show);
          this.in.removeListener("keypress", keypress);
          if (this.in.isTTY)
            this.in.setRawMode(false);
          rl.close();
          this.emit(this.aborted ? "abort" : this.exited ? "exit" : "submit", this.value);
          this.closed = true;
        };
        this.in.on("keypress", keypress);
      }
      fire() {
        this.emit("state", {
          value: this.value,
          aborted: !!this.aborted,
          exited: !!this.exited
        });
      }
      bell() {
        this.out.write(beep);
      }
      render() {
        this.onRender(color);
        if (this.firstRender)
          this.firstRender = false;
      }
    };
    module2.exports = Prompt;
  }
});

// ../../node_modules/prompts/dist/elements/text.js
var require_text = __commonJS({
  "../../node_modules/prompts/dist/elements/text.js"(exports, module2) {
    "use strict";
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_src();
    var erase = _require.erase;
    var cursor = _require.cursor;
    var _require2 = require_util();
    var style = _require2.style;
    var clear = _require2.clear;
    var lines = _require2.lines;
    var figures = _require2.figures;
    var TextPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.msg = opts.message;
        this.initial = opts.initial || ``;
        this.validator = opts.validate || (() => true);
        this.value = ``;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.clear = clear(``, this.out.columns);
        this.render();
      }
      set value(v) {
        if (!v && this.initial) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(this.initial));
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(v);
        }
        this._value = v;
        this.fire();
      }
      get value() {
        return this._value;
      }
      reset() {
        this.value = ``;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.value = this.value || this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.red = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      validate() {
        var _this = this;
        return _asyncToGenerator(function* () {
          let valid = yield _this.validator(_this.value);
          if (typeof valid === `string`) {
            _this.errorMsg = valid;
            valid = false;
          }
          _this.error = !valid;
        })();
      }
      submit() {
        var _this2 = this;
        return _asyncToGenerator(function* () {
          _this2.value = _this2.value || _this2.initial;
          _this2.cursorOffset = 0;
          _this2.cursor = _this2.rendered.length;
          yield _this2.validate();
          if (_this2.error) {
            _this2.red = true;
            _this2.fire();
            _this2.render();
            return;
          }
          _this2.done = true;
          _this2.aborted = false;
          _this2.fire();
          _this2.render();
          _this2.out.write("\n");
          _this2.close();
        })();
      }
      next() {
        if (!this.placeholder)
          return this.bell();
        this.value = this.initial;
        this.cursor = this.rendered.length;
        this.fire();
        this.render();
      }
      moveCursor(n) {
        if (this.placeholder)
          return;
        this.cursor = this.cursor + n;
        this.cursorOffset += n;
      }
      _(c, key) {
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${c}${s2}`;
        this.red = false;
        this.cursor = this.placeholder ? 0 : s1.length + 1;
        this.render();
      }
      delete() {
        if (this.isCursorAtStart())
          return this.bell();
        let s1 = this.value.slice(0, this.cursor - 1);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtStart()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
          this.moveCursor(-1);
        }
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
          return this.bell();
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor + 1);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtEnd()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
        }
        this.render();
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length;
        this.render();
      }
      left() {
        if (this.cursor <= 0 || this.placeholder)
          return this.bell();
        this.moveCursor(-1);
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
          return this.bell();
        this.moveCursor(1);
        this.render();
      }
      isCursorAtStart() {
        return this.cursor === 0 || this.placeholder && this.cursor === 1;
      }
      isCursorAtEnd() {
        return this.cursor === this.rendered.length || this.placeholder && this.cursor === this.rendered.length + 1;
      }
      render() {
        if (this.closed)
          return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.red ? color.red(this.rendered) : this.rendered].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? " " : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore + cursor.move(this.cursorOffset, 0));
      }
    };
    module2.exports = TextPrompt;
  }
});

// ../../node_modules/prompts/dist/elements/select.js
var require_select = __commonJS({
  "../../node_modules/prompts/dist/elements/select.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_util();
    var style = _require.style;
    var clear = _require.clear;
    var figures = _require.figures;
    var wrap = _require.wrap;
    var entriesToDisplay = _require.entriesToDisplay;
    var _require2 = require_src();
    var cursor = _require2.cursor;
    var SelectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.hint = opts.hint || "- Use arrow-keys. Return to submit.";
        this.warn = opts.warn || "- This option is disabled";
        this.cursor = opts.initial || 0;
        this.choices = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = {
              title: ch,
              value: idx
            };
          return {
            title: ch && (ch.title || ch.value || ch),
            value: ch && (ch.value === void 0 ? idx : ch.value),
            description: ch && ch.description,
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = (this.choices[this.cursor] || {}).value;
        this.clear = clear("", this.out.columns);
        this.render();
      }
      moveCursor(n) {
        this.cursor = n;
        this.value = this.choices[n].value;
        this.fire();
      }
      reset() {
        this.moveCursor(0);
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        if (!this.selection.disabled) {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        } else
          this.bell();
      }
      first() {
        this.moveCursor(0);
        this.render();
      }
      last() {
        this.moveCursor(this.choices.length - 1);
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.moveCursor(this.choices.length - 1);
        } else {
          this.moveCursor(this.cursor - 1);
        }
        this.render();
      }
      down() {
        if (this.cursor === this.choices.length - 1) {
          this.moveCursor(0);
        } else {
          this.moveCursor(this.cursor + 1);
        }
        this.render();
      }
      next() {
        this.moveCursor((this.cursor + 1) % this.choices.length);
        this.render();
      }
      _(c, key) {
        if (c === " ")
          return this.submit();
      }
      get selection() {
        return this.choices[this.cursor];
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let _entriesToDisplay = entriesToDisplay(this.cursor, this.choices.length, this.optionsPerPage), startIndex = _entriesToDisplay.startIndex, endIndex = _entriesToDisplay.endIndex;
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.done ? this.selection.title : this.selection.disabled ? color.yellow(this.warn) : color.gray(this.hint)].join(" ");
        if (!this.done) {
          this.outputText += "\n";
          for (let i = startIndex; i < endIndex; i++) {
            let title, prefix, desc = "", v = this.choices[i];
            if (i === startIndex && startIndex > 0) {
              prefix = figures.arrowUp;
            } else if (i === endIndex - 1 && endIndex < this.choices.length) {
              prefix = figures.arrowDown;
            } else {
              prefix = " ";
            }
            if (v.disabled) {
              title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
              prefix = (this.cursor === i ? color.bold().gray(figures.pointer) + " " : "  ") + prefix;
            } else {
              title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
              prefix = (this.cursor === i ? color.cyan(figures.pointer) + " " : "  ") + prefix;
              if (v.description && this.cursor === i) {
                desc = ` - ${v.description}`;
                if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
                  desc = "\n" + wrap(v.description, {
                    margin: 3,
                    width: this.out.columns
                  });
                }
              }
            }
            this.outputText += `${prefix} ${title}${color.gray(desc)}
`;
          }
        }
        this.out.write(this.outputText);
      }
    };
    module2.exports = SelectPrompt;
  }
});

// ../../node_modules/prompts/dist/elements/toggle.js
var require_toggle = __commonJS({
  "../../node_modules/prompts/dist/elements/toggle.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_util();
    var style = _require.style;
    var clear = _require.clear;
    var _require2 = require_src();
    var cursor = _require2.cursor;
    var erase = _require2.erase;
    var TogglePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = !!opts.initial;
        this.active = opts.active || "on";
        this.inactive = opts.inactive || "off";
        this.initialValue = this.value;
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      deactivate() {
        if (this.value === false)
          return this.bell();
        this.value = false;
        this.render();
      }
      activate() {
        if (this.value === true)
          return this.bell();
        this.value = true;
        this.render();
      }
      delete() {
        this.deactivate();
      }
      left() {
        this.deactivate();
      }
      right() {
        this.activate();
      }
      down() {
        this.deactivate();
      }
      up() {
        this.activate();
      }
      next() {
        this.value = !this.value;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.value = !this.value;
        } else if (c === "1") {
          this.value = true;
        } else if (c === "0") {
          this.value = false;
        } else
          return this.bell();
        this.render();
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.value ? this.inactive : color.cyan().underline(this.inactive), color.gray("/"), this.value ? color.cyan().underline(this.active) : this.active].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = TogglePrompt;
  }
});

// ../../node_modules/prompts/dist/dateparts/datepart.js
var require_datepart = __commonJS({
  "../../node_modules/prompts/dist/dateparts/datepart.js"(exports, module2) {
    "use strict";
    var DatePart = class {
      constructor({
        token,
        date,
        parts,
        locales
      }) {
        this.token = token;
        this.date = date || new Date();
        this.parts = parts || [this];
        this.locales = locales || {};
      }
      up() {
      }
      down() {
      }
      next() {
        const currentIdx = this.parts.indexOf(this);
        return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
      }
      setTo(val) {
      }
      prev() {
        let parts = [].concat(this.parts).reverse();
        const currentIdx = parts.indexOf(this);
        return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
      }
      toString() {
        return String(this.date);
      }
    };
    module2.exports = DatePart;
  }
});

// ../../node_modules/prompts/dist/dateparts/meridiem.js
var require_meridiem = __commonJS({
  "../../node_modules/prompts/dist/dateparts/meridiem.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Meridiem = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours((this.date.getHours() + 12) % 24);
      }
      down() {
        this.up();
      }
      toString() {
        let meridiem = this.date.getHours() > 12 ? "pm" : "am";
        return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
      }
    };
    module2.exports = Meridiem;
  }
});

// ../../node_modules/prompts/dist/dateparts/day.js
var require_day = __commonJS({
  "../../node_modules/prompts/dist/dateparts/day.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var pos = (n) => {
      n = n % 10;
      return n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
    };
    var Day = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setDate(this.date.getDate() + 1);
      }
      down() {
        this.date.setDate(this.date.getDate() - 1);
      }
      setTo(val) {
        this.date.setDate(parseInt(val.substr(-2)));
      }
      toString() {
        let date = this.date.getDate();
        let day = this.date.getDay();
        return this.token === "DD" ? String(date).padStart(2, "0") : this.token === "Do" ? date + pos(date) : this.token === "d" ? day + 1 : this.token === "ddd" ? this.locales.weekdaysShort[day] : this.token === "dddd" ? this.locales.weekdays[day] : date;
      }
    };
    module2.exports = Day;
  }
});

// ../../node_modules/prompts/dist/dateparts/hours.js
var require_hours = __commonJS({
  "../../node_modules/prompts/dist/dateparts/hours.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Hours = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours(this.date.getHours() + 1);
      }
      down() {
        this.date.setHours(this.date.getHours() - 1);
      }
      setTo(val) {
        this.date.setHours(parseInt(val.substr(-2)));
      }
      toString() {
        let hours = this.date.getHours();
        if (/h/.test(this.token))
          hours = hours % 12 || 12;
        return this.token.length > 1 ? String(hours).padStart(2, "0") : hours;
      }
    };
    module2.exports = Hours;
  }
});

// ../../node_modules/prompts/dist/dateparts/milliseconds.js
var require_milliseconds = __commonJS({
  "../../node_modules/prompts/dist/dateparts/milliseconds.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Milliseconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMilliseconds(this.date.getMilliseconds() + 1);
      }
      down() {
        this.date.setMilliseconds(this.date.getMilliseconds() - 1);
      }
      setTo(val) {
        this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
      }
      toString() {
        return String(this.date.getMilliseconds()).padStart(4, "0").substr(0, this.token.length);
      }
    };
    module2.exports = Milliseconds;
  }
});

// ../../node_modules/prompts/dist/dateparts/minutes.js
var require_minutes = __commonJS({
  "../../node_modules/prompts/dist/dateparts/minutes.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Minutes = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMinutes(this.date.getMinutes() + 1);
      }
      down() {
        this.date.setMinutes(this.date.getMinutes() - 1);
      }
      setTo(val) {
        this.date.setMinutes(parseInt(val.substr(-2)));
      }
      toString() {
        let m = this.date.getMinutes();
        return this.token.length > 1 ? String(m).padStart(2, "0") : m;
      }
    };
    module2.exports = Minutes;
  }
});

// ../../node_modules/prompts/dist/dateparts/month.js
var require_month = __commonJS({
  "../../node_modules/prompts/dist/dateparts/month.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Month = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMonth(this.date.getMonth() + 1);
      }
      down() {
        this.date.setMonth(this.date.getMonth() - 1);
      }
      setTo(val) {
        val = parseInt(val.substr(-2)) - 1;
        this.date.setMonth(val < 0 ? 0 : val);
      }
      toString() {
        let month = this.date.getMonth();
        let tl = this.token.length;
        return tl === 2 ? String(month + 1).padStart(2, "0") : tl === 3 ? this.locales.monthsShort[month] : tl === 4 ? this.locales.months[month] : String(month + 1);
      }
    };
    module2.exports = Month;
  }
});

// ../../node_modules/prompts/dist/dateparts/seconds.js
var require_seconds = __commonJS({
  "../../node_modules/prompts/dist/dateparts/seconds.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Seconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setSeconds(this.date.getSeconds() + 1);
      }
      down() {
        this.date.setSeconds(this.date.getSeconds() - 1);
      }
      setTo(val) {
        this.date.setSeconds(parseInt(val.substr(-2)));
      }
      toString() {
        let s = this.date.getSeconds();
        return this.token.length > 1 ? String(s).padStart(2, "0") : s;
      }
    };
    module2.exports = Seconds;
  }
});

// ../../node_modules/prompts/dist/dateparts/year.js
var require_year = __commonJS({
  "../../node_modules/prompts/dist/dateparts/year.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart();
    var Year = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setFullYear(this.date.getFullYear() + 1);
      }
      down() {
        this.date.setFullYear(this.date.getFullYear() - 1);
      }
      setTo(val) {
        this.date.setFullYear(val.substr(-4));
      }
      toString() {
        let year = String(this.date.getFullYear()).padStart(4, "0");
        return this.token.length === 2 ? year.substr(-2) : year;
      }
    };
    module2.exports = Year;
  }
});

// ../../node_modules/prompts/dist/dateparts/index.js
var require_dateparts = __commonJS({
  "../../node_modules/prompts/dist/dateparts/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      DatePart: require_datepart(),
      Meridiem: require_meridiem(),
      Day: require_day(),
      Hours: require_hours(),
      Milliseconds: require_milliseconds(),
      Minutes: require_minutes(),
      Month: require_month(),
      Seconds: require_seconds(),
      Year: require_year()
    };
  }
});

// ../../node_modules/prompts/dist/elements/date.js
var require_date = __commonJS({
  "../../node_modules/prompts/dist/elements/date.js"(exports, module2) {
    "use strict";
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_util();
    var style = _require.style;
    var clear = _require.clear;
    var figures = _require.figures;
    var _require2 = require_src();
    var erase = _require2.erase;
    var cursor = _require2.cursor;
    var _require3 = require_dateparts();
    var DatePart = _require3.DatePart;
    var Meridiem = _require3.Meridiem;
    var Day = _require3.Day;
    var Hours = _require3.Hours;
    var Milliseconds = _require3.Milliseconds;
    var Minutes = _require3.Minutes;
    var Month = _require3.Month;
    var Seconds = _require3.Seconds;
    var Year = _require3.Year;
    var regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
    var regexGroups = {
      1: ({
        token
      }) => token.replace(/\\(.)/g, "$1"),
      2: (opts) => new Day(opts),
      3: (opts) => new Month(opts),
      4: (opts) => new Year(opts),
      5: (opts) => new Meridiem(opts),
      6: (opts) => new Hours(opts),
      7: (opts) => new Minutes(opts),
      8: (opts) => new Seconds(opts),
      9: (opts) => new Milliseconds(opts)
    };
    var dfltLocales = {
      months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
      monthsShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
      weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
      weekdaysShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")
    };
    var DatePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = 0;
        this.typed = "";
        this.locales = Object.assign(dfltLocales, opts.locales);
        this._date = opts.initial || new Date();
        this.errorMsg = opts.error || "Please Enter A Valid Value";
        this.validator = opts.validate || (() => true);
        this.mask = opts.mask || "YYYY-MM-DD HH:mm:ss";
        this.clear = clear("", this.out.columns);
        this.render();
      }
      get value() {
        return this.date;
      }
      get date() {
        return this._date;
      }
      set date(date) {
        if (date)
          this._date.setTime(date.getTime());
      }
      set mask(mask) {
        let result;
        this.parts = [];
        while (result = regex.exec(mask)) {
          let match = result.shift();
          let idx = result.findIndex((gr) => gr != null);
          this.parts.push(idx in regexGroups ? regexGroups[idx]({
            token: result[idx] || match,
            date: this.date,
            parts: this.parts,
            locales: this.locales
          }) : result[idx] || match);
        }
        let parts = this.parts.reduce((arr, i) => {
          if (typeof i === "string" && typeof arr[arr.length - 1] === "string")
            arr[arr.length - 1] += i;
          else
            arr.push(i);
          return arr;
        }, []);
        this.parts.splice(0);
        this.parts.push(...parts);
        this.reset();
      }
      moveCursor(n) {
        this.typed = "";
        this.cursor = n;
        this.fire();
      }
      reset() {
        this.moveCursor(this.parts.findIndex((p) => p instanceof DatePart));
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      validate() {
        var _this = this;
        return _asyncToGenerator(function* () {
          let valid = yield _this.validator(_this.value);
          if (typeof valid === "string") {
            _this.errorMsg = valid;
            valid = false;
          }
          _this.error = !valid;
        })();
      }
      submit() {
        var _this2 = this;
        return _asyncToGenerator(function* () {
          yield _this2.validate();
          if (_this2.error) {
            _this2.color = "red";
            _this2.fire();
            _this2.render();
            return;
          }
          _this2.done = true;
          _this2.aborted = false;
          _this2.fire();
          _this2.render();
          _this2.out.write("\n");
          _this2.close();
        })();
      }
      up() {
        this.typed = "";
        this.parts[this.cursor].up();
        this.render();
      }
      down() {
        this.typed = "";
        this.parts[this.cursor].down();
        this.render();
      }
      left() {
        let prev = this.parts[this.cursor].prev();
        if (prev == null)
          return this.bell();
        this.moveCursor(this.parts.indexOf(prev));
        this.render();
      }
      right() {
        let next = this.parts[this.cursor].next();
        if (next == null)
          return this.bell();
        this.moveCursor(this.parts.indexOf(next));
        this.render();
      }
      next() {
        let next = this.parts[this.cursor].next();
        this.moveCursor(next ? this.parts.indexOf(next) : this.parts.findIndex((part) => part instanceof DatePart));
        this.render();
      }
      _(c) {
        if (/\d/.test(c)) {
          this.typed += c;
          this.parts[this.cursor].setTo(this.typed);
          this.render();
        }
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), []).join("")].join(" ");
        if (this.error) {
          this.outputText += this.errorMsg.split("\n").reduce((a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = DatePrompt;
  }
});

// ../../node_modules/prompts/dist/elements/number.js
var require_number = __commonJS({
  "../../node_modules/prompts/dist/elements/number.js"(exports, module2) {
    "use strict";
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_src();
    var cursor = _require.cursor;
    var erase = _require.erase;
    var _require2 = require_util();
    var style = _require2.style;
    var figures = _require2.figures;
    var clear = _require2.clear;
    var lines = _require2.lines;
    var isNumber = /[0-9]/;
    var isDef = (any) => any !== void 0;
    var round = (number, precision) => {
      let factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    };
    var NumberPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.msg = opts.message;
        this.initial = isDef(opts.initial) ? opts.initial : "";
        this.float = !!opts.float;
        this.round = opts.round || 2;
        this.inc = opts.increment || 1;
        this.min = isDef(opts.min) ? opts.min : -Infinity;
        this.max = isDef(opts.max) ? opts.max : Infinity;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.validator = opts.validate || (() => true);
        this.color = `cyan`;
        this.value = ``;
        this.typed = ``;
        this.lastHit = 0;
        this.render();
      }
      set value(v) {
        if (!v && v !== 0) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(`${this.initial}`));
          this._value = ``;
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(`${round(v, this.round)}`);
          this._value = round(v, this.round);
        }
        this.fire();
      }
      get value() {
        return this._value;
      }
      parse(x) {
        return this.float ? parseFloat(x) : parseInt(x);
      }
      valid(c) {
        return c === `-` || c === `.` && this.float || isNumber.test(c);
      }
      reset() {
        this.typed = ``;
        this.value = ``;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        let x = this.value;
        this.value = x !== `` ? x : this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
      validate() {
        var _this = this;
        return _asyncToGenerator(function* () {
          let valid = yield _this.validator(_this.value);
          if (typeof valid === `string`) {
            _this.errorMsg = valid;
            valid = false;
          }
          _this.error = !valid;
        })();
      }
      submit() {
        var _this2 = this;
        return _asyncToGenerator(function* () {
          yield _this2.validate();
          if (_this2.error) {
            _this2.color = `red`;
            _this2.fire();
            _this2.render();
            return;
          }
          let x = _this2.value;
          _this2.value = x !== `` ? x : _this2.initial;
          _this2.done = true;
          _this2.aborted = false;
          _this2.error = false;
          _this2.fire();
          _this2.render();
          _this2.out.write(`
`);
          _this2.close();
        })();
      }
      up() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min - this.inc;
        }
        if (this.value >= this.max)
          return this.bell();
        this.value += this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      down() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min + this.inc;
        }
        if (this.value <= this.min)
          return this.bell();
        this.value -= this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      delete() {
        let val = this.value.toString();
        if (val.length === 0)
          return this.bell();
        this.value = this.parse(val = val.slice(0, -1)) || ``;
        if (this.value !== "" && this.value < this.min) {
          this.value = this.min;
        }
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      next() {
        this.value = this.initial;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (!this.valid(c))
          return this.bell();
        const now = Date.now();
        if (now - this.lastHit > 1e3)
          this.typed = ``;
        this.typed += c;
        this.lastHit = now;
        this.color = `cyan`;
        if (c === `.`)
          return this.fire();
        this.value = Math.min(this.parse(this.typed), this.max);
        if (this.value > this.max)
          this.value = this.max;
        if (this.value < this.min)
          this.value = this.min;
        this.fire();
        this.render();
      }
      render() {
        if (this.closed)
          return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), !this.done || !this.done && !this.placeholder ? color[this.color]().underline(this.rendered) : this.rendered].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
      }
    };
    module2.exports = NumberPrompt;
  }
});

// ../../node_modules/prompts/dist/elements/multiselect.js
var require_multiselect = __commonJS({
  "../../node_modules/prompts/dist/elements/multiselect.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var _require = require_src();
    var cursor = _require.cursor;
    var Prompt = require_prompt();
    var _require2 = require_util();
    var clear = _require2.clear;
    var figures = _require2.figures;
    var style = _require2.style;
    var wrap = _require2.wrap;
    var entriesToDisplay = _require2.entriesToDisplay;
    var MultiselectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = opts.cursor || 0;
        this.scrollIndex = opts.cursor || 0;
        this.hint = opts.hint || "";
        this.warn = opts.warn || "- This option is disabled -";
        this.minSelected = opts.min;
        this.showMinError = false;
        this.maxChoices = opts.max;
        this.instructions = opts.instructions;
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = {
              title: ch,
              value: idx
            };
          return {
            title: ch && (ch.title || ch.value || ch),
            description: ch && ch.description,
            value: ch && (ch.value === void 0 ? idx : ch.value),
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.clear = clear("", this.out.columns);
        if (!opts.overrideRender) {
          this.render();
        }
      }
      reset() {
        this.value.map((v) => !v.selected);
        this.cursor = 0;
        this.fire();
        this.render();
      }
      selected() {
        return this.value.filter((v) => v.selected);
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        const selected = this.value.filter((e) => e.selected);
        if (this.minSelected && selected.length < this.minSelected) {
          this.showMinError = true;
          this.render();
        } else {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.value.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.value.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.value.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.value[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices)
          return this.bell();
        this.value[this.cursor].selected = true;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.value[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      toggleAll() {
        if (this.maxChoices !== void 0 || this.value[this.cursor].disabled) {
          return this.bell();
        }
        const newSelected = !this.value[this.cursor].selected;
        this.value.filter((v) => !v.disabled).forEach((v) => v.selected = newSelected);
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else if (c === "a") {
          this.toggleAll();
        } else {
          return this.bell();
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
` + (this.maxChoices === void 0 ? `    a: Toggle all
` : "") + `    enter/return: Complete answer`;
        }
        return "";
      }
      renderOption(cursor2, v, i, arrowIndicator) {
        const prefix = (v.selected ? color.green(figures.radioOn) : figures.radioOff) + " " + arrowIndicator + " ";
        let title, desc;
        if (v.disabled) {
          title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        } else {
          title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
          if (cursor2 === i && v.description) {
            desc = ` - ${v.description}`;
            if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
              desc = "\n" + wrap(v.description, {
                margin: prefix.length,
                width: this.out.columns
              });
            }
          }
        }
        return prefix + title + color.gray(desc || "");
      }
      paginateOptions(options) {
        if (options.length === 0) {
          return color.red("No matches for this query.");
        }
        let _entriesToDisplay = entriesToDisplay(this.cursor, options.length, this.optionsPerPage), startIndex = _entriesToDisplay.startIndex, endIndex = _entriesToDisplay.endIndex;
        let prefix, styledOptions = [];
        for (let i = startIndex; i < endIndex; i++) {
          if (i === startIndex && startIndex > 0) {
            prefix = figures.arrowUp;
          } else if (i === endIndex - 1 && endIndex < options.length) {
            prefix = figures.arrowDown;
          } else {
            prefix = " ";
          }
          styledOptions.push(this.renderOption(this.cursor, options[i], i, prefix));
        }
        return "\n" + styledOptions.join("\n");
      }
      renderOptions(options) {
        if (!this.done) {
          return this.paginateOptions(options);
        }
        return "";
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions()];
        if (this.value[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        super.render();
        let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.renderDoneOrInstructions()].join(" ");
        if (this.showMinError) {
          prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt += this.renderOptions(this.value);
        this.out.write(this.clear + prompt);
        this.clear = clear(prompt, this.out.columns);
      }
    };
    module2.exports = MultiselectPrompt;
  }
});

// ../../node_modules/prompts/dist/elements/autocomplete.js
var require_autocomplete = __commonJS({
  "../../node_modules/prompts/dist/elements/autocomplete.js"(exports, module2) {
    "use strict";
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_src();
    var erase = _require.erase;
    var cursor = _require.cursor;
    var _require2 = require_util();
    var style = _require2.style;
    var clear = _require2.clear;
    var figures = _require2.figures;
    var wrap = _require2.wrap;
    var entriesToDisplay = _require2.entriesToDisplay;
    var getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
    var getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
    var getIndex = (arr, valOrTitle) => {
      const index = arr.findIndex((el) => el.value === valOrTitle || el.title === valOrTitle);
      return index > -1 ? index : void 0;
    };
    var AutocompletePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.suggest = opts.suggest;
        this.choices = opts.choices;
        this.initial = typeof opts.initial === "number" ? opts.initial : getIndex(opts.choices, opts.initial);
        this.select = this.initial || opts.cursor || 0;
        this.i18n = {
          noMatches: opts.noMatches || "no matches found"
        };
        this.fallback = opts.fallback || this.initial;
        this.clearFirst = opts.clearFirst || false;
        this.suggestions = [];
        this.input = "";
        this.limit = opts.limit || 10;
        this.cursor = 0;
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.render = this.render.bind(this);
        this.complete = this.complete.bind(this);
        this.clear = clear("", this.out.columns);
        this.complete(this.render);
        this.render();
      }
      set fallback(fb) {
        this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
      }
      get fallback() {
        let choice;
        if (typeof this._fb === "number")
          choice = this.choices[this._fb];
        else if (typeof this._fb === "string")
          choice = {
            title: this._fb
          };
        return choice || this._fb || {
          title: this.i18n.noMatches
        };
      }
      moveSelect(i) {
        this.select = i;
        if (this.suggestions.length > 0)
          this.value = getVal(this.suggestions, i);
        else
          this.value = this.fallback.value;
        this.fire();
      }
      complete(cb) {
        var _this = this;
        return _asyncToGenerator(function* () {
          const p = _this.completing = _this.suggest(_this.input, _this.choices);
          const suggestions = yield p;
          if (_this.completing !== p)
            return;
          _this.suggestions = suggestions.map((s, i, arr) => ({
            title: getTitle(arr, i),
            value: getVal(arr, i),
            description: s.description
          }));
          _this.completing = false;
          const l = Math.max(suggestions.length - 1, 0);
          _this.moveSelect(Math.min(l, _this.select));
          cb && cb();
        })();
      }
      reset() {
        this.input = "";
        this.complete(() => {
          this.moveSelect(this.initial !== void 0 ? this.initial : 0);
          this.render();
        });
        this.render();
      }
      exit() {
        if (this.clearFirst && this.input.length > 0) {
          this.reset();
        } else {
          this.done = this.exited = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      abort() {
        this.done = this.aborted = true;
        this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${c}${s2}`;
        this.cursor = s1.length + 1;
        this.complete(this.render);
        this.render();
      }
      delete() {
        if (this.cursor === 0)
          return this.bell();
        let s1 = this.input.slice(0, this.cursor - 1);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.cursor = this.cursor - 1;
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length)
          return this.bell();
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor + 1);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.render();
      }
      first() {
        this.moveSelect(0);
        this.render();
      }
      last() {
        this.moveSelect(this.suggestions.length - 1);
        this.render();
      }
      up() {
        if (this.select === 0) {
          this.moveSelect(this.suggestions.length - 1);
        } else {
          this.moveSelect(this.select - 1);
        }
        this.render();
      }
      down() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else {
          this.moveSelect(this.select + 1);
        }
        this.render();
      }
      next() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else
          this.moveSelect(this.select + 1);
        this.render();
      }
      nextPage() {
        this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
        this.render();
      }
      prevPage() {
        this.moveSelect(Math.max(this.select - this.limit, 0));
        this.render();
      }
      left() {
        if (this.cursor <= 0)
          return this.bell();
        this.cursor = this.cursor - 1;
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length)
          return this.bell();
        this.cursor = this.cursor + 1;
        this.render();
      }
      renderOption(v, hovered, isStart, isEnd) {
        let desc;
        let prefix = isStart ? figures.arrowUp : isEnd ? figures.arrowDown : " ";
        let title = hovered ? color.cyan().underline(v.title) : v.title;
        prefix = (hovered ? color.cyan(figures.pointer) + " " : "  ") + prefix;
        if (v.description) {
          desc = ` - ${v.description}`;
          if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
            desc = "\n" + wrap(v.description, {
              margin: 3,
              width: this.out.columns
            });
          }
        }
        return prefix + " " + title + color.gray(desc || "");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let _entriesToDisplay = entriesToDisplay(this.select, this.choices.length, this.limit), startIndex = _entriesToDisplay.startIndex, endIndex = _entriesToDisplay.endIndex;
        this.outputText = [style.symbol(this.done, this.aborted, this.exited), color.bold(this.msg), style.delimiter(this.completing), this.done && this.suggestions[this.select] ? this.suggestions[this.select].title : this.rendered = this.transform.render(this.input)].join(" ");
        if (!this.done) {
          const suggestions = this.suggestions.slice(startIndex, endIndex).map((item, i) => this.renderOption(item, this.select === i + startIndex, i === 0 && startIndex > 0, i + startIndex === endIndex - 1 && endIndex < this.choices.length)).join("\n");
          this.outputText += `
` + (suggestions || color.gray(this.fallback.title));
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = AutocompletePrompt;
  }
});

// ../../node_modules/prompts/dist/elements/autocompleteMultiselect.js
var require_autocompleteMultiselect = __commonJS({
  "../../node_modules/prompts/dist/elements/autocompleteMultiselect.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var _require = require_src();
    var cursor = _require.cursor;
    var MultiselectPrompt = require_multiselect();
    var _require2 = require_util();
    var clear = _require2.clear;
    var style = _require2.style;
    var figures = _require2.figures;
    var AutocompleteMultiselectPrompt = class extends MultiselectPrompt {
      constructor(opts = {}) {
        opts.overrideRender = true;
        super(opts);
        this.inputValue = "";
        this.clear = clear("", this.out.columns);
        this.filteredOptions = this.value;
        this.render();
      }
      last() {
        this.cursor = this.filteredOptions.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.filteredOptions.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.filteredOptions.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.filteredOptions.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.filteredOptions[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices)
          return this.bell();
        this.filteredOptions[this.cursor].selected = true;
        this.render();
      }
      delete() {
        if (this.inputValue.length) {
          this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
          this.updateFilteredOptions();
        }
      }
      updateFilteredOptions() {
        const currentHighlight = this.filteredOptions[this.cursor];
        this.filteredOptions = this.value.filter((v) => {
          if (this.inputValue) {
            if (typeof v.title === "string") {
              if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            if (typeof v.value === "string") {
              if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            return false;
          }
          return true;
        });
        const newHighlightIndex = this.filteredOptions.findIndex((v) => v === currentHighlight);
        this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.filteredOptions[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      handleInputChange(c) {
        this.inputValue = this.inputValue + c;
        this.updateFilteredOptions();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else {
          this.handleInputChange(c);
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
        }
        return "";
      }
      renderCurrentInput() {
        return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray("Enter something to filter")}
`;
      }
      renderOption(cursor2, v, i) {
        let title;
        if (v.disabled)
          title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        else
          title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
        return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + "  " + title;
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];
        if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        super.render();
        let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.renderDoneOrInstructions()].join(" ");
        if (this.showMinError) {
          prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt += this.renderOptions(this.filteredOptions);
        this.out.write(this.clear + prompt);
        this.clear = clear(prompt, this.out.columns);
      }
    };
    module2.exports = AutocompleteMultiselectPrompt;
  }
});

// ../../node_modules/prompts/dist/elements/confirm.js
var require_confirm = __commonJS({
  "../../node_modules/prompts/dist/elements/confirm.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt();
    var _require = require_util();
    var style = _require.style;
    var clear = _require.clear;
    var _require2 = require_src();
    var erase = _require2.erase;
    var cursor = _require2.cursor;
    var ConfirmPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = opts.initial;
        this.initialValue = !!opts.initial;
        this.yesMsg = opts.yes || "yes";
        this.yesOption = opts.yesOption || "(Y/n)";
        this.noMsg = opts.no || "no";
        this.noOption = opts.noOption || "(y/N)";
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.value = this.value || false;
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        if (c.toLowerCase() === "y") {
          this.value = true;
          return this.submit();
        }
        if (c.toLowerCase() === "n") {
          this.value = false;
          return this.submit();
        }
        return this.bell();
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = ConfirmPrompt;
  }
});

// ../../node_modules/prompts/dist/elements/index.js
var require_elements = __commonJS({
  "../../node_modules/prompts/dist/elements/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      TextPrompt: require_text(),
      SelectPrompt: require_select(),
      TogglePrompt: require_toggle(),
      DatePrompt: require_date(),
      NumberPrompt: require_number(),
      MultiselectPrompt: require_multiselect(),
      AutocompletePrompt: require_autocomplete(),
      AutocompleteMultiselectPrompt: require_autocompleteMultiselect(),
      ConfirmPrompt: require_confirm()
    };
  }
});

// ../../node_modules/prompts/dist/prompts.js
var require_prompts = __commonJS({
  "../../node_modules/prompts/dist/prompts.js"(exports) {
    "use strict";
    var $ = exports;
    var el = require_elements();
    var noop = (v) => v;
    function toPrompt(type, args, opts = {}) {
      return new Promise((res, rej) => {
        const p = new el[type](args);
        const onAbort = opts.onAbort || noop;
        const onSubmit = opts.onSubmit || noop;
        const onExit = opts.onExit || noop;
        p.on("state", args.onState || noop);
        p.on("submit", (x) => res(onSubmit(x)));
        p.on("exit", (x) => res(onExit(x)));
        p.on("abort", (x) => rej(onAbort(x)));
      });
    }
    $.text = (args) => toPrompt("TextPrompt", args);
    $.password = (args) => {
      args.style = "password";
      return $.text(args);
    };
    $.invisible = (args) => {
      args.style = "invisible";
      return $.text(args);
    };
    $.number = (args) => toPrompt("NumberPrompt", args);
    $.date = (args) => toPrompt("DatePrompt", args);
    $.confirm = (args) => toPrompt("ConfirmPrompt", args);
    $.list = (args) => {
      const sep = args.separator || ",";
      return toPrompt("TextPrompt", args, {
        onSubmit: (str) => str.split(sep).map((s) => s.trim())
      });
    };
    $.toggle = (args) => toPrompt("TogglePrompt", args);
    $.select = (args) => toPrompt("SelectPrompt", args);
    $.multiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("MultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    $.autocompleteMultiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("AutocompleteMultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    var byTitle = (input, choices) => Promise.resolve(choices.filter((item) => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase()));
    $.autocomplete = (args) => {
      args.suggest = args.suggest || byTitle;
      args.choices = [].concat(args.choices || []);
      return toPrompt("AutocompletePrompt", args);
    };
  }
});

// ../../node_modules/prompts/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/prompts/dist/index.js"(exports, module2) {
    "use strict";
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
      if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          var F = function F2() {
          };
          return { s: F, n: function n() {
            if (i >= o.length)
              return { done: true };
            return { done: false, value: o[i++] };
          }, e: function e(_e) {
            throw _e;
          }, f: F };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var normalCompletion = true, didErr = false, err;
      return { s: function s() {
        it = it.call(o);
      }, n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      }, e: function e(_e2) {
        didErr = true;
        err = _e2;
      }, f: function f() {
        try {
          if (!normalCompletion && it.return != null)
            it.return();
        } finally {
          if (didErr)
            throw err;
        }
      } };
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }
    function _asyncToGenerator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    var prompts2 = require_prompts();
    var passOn = ["suggest", "format", "onState", "validate", "onRender", "type"];
    var noop = () => {
    };
    function prompt() {
      return _prompt.apply(this, arguments);
    }
    function _prompt() {
      _prompt = _asyncToGenerator(function* (questions = [], {
        onSubmit = noop,
        onCancel = noop
      } = {}) {
        const answers = {};
        const override2 = prompt._override || {};
        questions = [].concat(questions);
        let answer, question, quit, name, type, lastPrompt;
        const getFormattedAnswer = /* @__PURE__ */ function() {
          var _ref = _asyncToGenerator(function* (question2, answer2, skipValidation = false) {
            if (!skipValidation && question2.validate && question2.validate(answer2) !== true) {
              return;
            }
            return question2.format ? yield question2.format(answer2, answers) : answer2;
          });
          return function getFormattedAnswer2(_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }();
        var _iterator = _createForOfIteratorHelper(questions), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            question = _step.value;
            var _question = question;
            name = _question.name;
            type = _question.type;
            if (typeof type === "function") {
              type = yield type(answer, _objectSpread({}, answers), question);
              question["type"] = type;
            }
            if (!type)
              continue;
            for (let key in question) {
              if (passOn.includes(key))
                continue;
              let value = question[key];
              question[key] = typeof value === "function" ? yield value(answer, _objectSpread({}, answers), lastPrompt) : value;
            }
            lastPrompt = question;
            if (typeof question.message !== "string") {
              throw new Error("prompt message is required");
            }
            var _question2 = question;
            name = _question2.name;
            type = _question2.type;
            if (prompts2[type] === void 0) {
              throw new Error(`prompt type (${type}) is not defined`);
            }
            if (override2[question.name] !== void 0) {
              answer = yield getFormattedAnswer(question, override2[question.name]);
              if (answer !== void 0) {
                answers[name] = answer;
                continue;
              }
            }
            try {
              answer = prompt._injected ? getInjectedAnswer(prompt._injected, question.initial) : yield prompts2[type](question);
              answers[name] = answer = yield getFormattedAnswer(question, answer, true);
              quit = yield onSubmit(question, answer, answers);
            } catch (err) {
              quit = !(yield onCancel(question, answers));
            }
            if (quit)
              return answers;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return answers;
      });
      return _prompt.apply(this, arguments);
    }
    function getInjectedAnswer(injected, deafultValue) {
      const answer = injected.shift();
      if (answer instanceof Error) {
        throw answer;
      }
      return answer === void 0 ? deafultValue : answer;
    }
    function inject(answers) {
      prompt._injected = (prompt._injected || []).concat(answers);
    }
    function override(answers) {
      prompt._override = Object.assign({}, answers);
    }
    module2.exports = Object.assign(prompt, {
      prompt,
      prompts: prompts2,
      inject,
      override
    });
  }
});

// ../../node_modules/prompts/lib/util/action.js
var require_action2 = __commonJS({
  "../../node_modules/prompts/lib/util/action.js"(exports, module2) {
    "use strict";
    module2.exports = (key, isSelect) => {
      if (key.meta && key.name !== "escape")
        return;
      if (key.ctrl) {
        if (key.name === "a")
          return "first";
        if (key.name === "c")
          return "abort";
        if (key.name === "d")
          return "abort";
        if (key.name === "e")
          return "last";
        if (key.name === "g")
          return "reset";
      }
      if (isSelect) {
        if (key.name === "j")
          return "down";
        if (key.name === "k")
          return "up";
      }
      if (key.name === "return")
        return "submit";
      if (key.name === "enter")
        return "submit";
      if (key.name === "backspace")
        return "delete";
      if (key.name === "delete")
        return "deleteForward";
      if (key.name === "abort")
        return "abort";
      if (key.name === "escape")
        return "exit";
      if (key.name === "tab")
        return "next";
      if (key.name === "pagedown")
        return "nextPage";
      if (key.name === "pageup")
        return "prevPage";
      if (key.name === "home")
        return "home";
      if (key.name === "end")
        return "end";
      if (key.name === "up")
        return "up";
      if (key.name === "down")
        return "down";
      if (key.name === "right")
        return "right";
      if (key.name === "left")
        return "left";
      return false;
    };
  }
});

// ../../node_modules/prompts/lib/util/strip.js
var require_strip2 = __commonJS({
  "../../node_modules/prompts/lib/util/strip.js"(exports, module2) {
    "use strict";
    module2.exports = (str) => {
      const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"
      ].join("|");
      const RGX = new RegExp(pattern, "g");
      return typeof str === "string" ? str.replace(RGX, "") : str;
    };
  }
});

// ../../node_modules/prompts/lib/util/clear.js
var require_clear2 = __commonJS({
  "../../node_modules/prompts/lib/util/clear.js"(exports, module2) {
    "use strict";
    var strip = require_strip2();
    var { erase, cursor } = require_src();
    var width = (str) => [...strip(str)].length;
    module2.exports = function(prompt, perLine) {
      if (!perLine)
        return erase.line + cursor.to(0);
      let rows = 0;
      const lines = prompt.split(/\r?\n/);
      for (let line of lines) {
        rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
      }
      return erase.lines(rows);
    };
  }
});

// ../../node_modules/prompts/lib/util/figures.js
var require_figures2 = __commonJS({
  "../../node_modules/prompts/lib/util/figures.js"(exports, module2) {
    "use strict";
    var main = {
      arrowUp: "\u2191",
      arrowDown: "\u2193",
      arrowLeft: "\u2190",
      arrowRight: "\u2192",
      radioOn: "\u25C9",
      radioOff: "\u25EF",
      tick: "\u2714",
      cross: "\u2716",
      ellipsis: "\u2026",
      pointerSmall: "\u203A",
      line: "\u2500",
      pointer: "\u276F"
    };
    var win = {
      arrowUp: main.arrowUp,
      arrowDown: main.arrowDown,
      arrowLeft: main.arrowLeft,
      arrowRight: main.arrowRight,
      radioOn: "(*)",
      radioOff: "( )",
      tick: "\u221A",
      cross: "\xD7",
      ellipsis: "...",
      pointerSmall: "\xBB",
      line: "\u2500",
      pointer: ">"
    };
    var figures = process.platform === "win32" ? win : main;
    module2.exports = figures;
  }
});

// ../../node_modules/prompts/lib/util/style.js
var require_style2 = __commonJS({
  "../../node_modules/prompts/lib/util/style.js"(exports, module2) {
    "use strict";
    var c = require_kleur();
    var figures = require_figures2();
    var styles = Object.freeze({
      password: { scale: 1, render: (input) => "*".repeat(input.length) },
      emoji: { scale: 2, render: (input) => "\u{1F603}".repeat(input.length) },
      invisible: { scale: 0, render: (input) => "" },
      default: { scale: 1, render: (input) => `${input}` }
    });
    var render = (type) => styles[type] || styles.default;
    var symbols = Object.freeze({
      aborted: c.red(figures.cross),
      done: c.green(figures.tick),
      exited: c.yellow(figures.cross),
      default: c.cyan("?")
    });
    var symbol = (done, aborted, exited) => aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default;
    var delimiter = (completing) => c.gray(completing ? figures.ellipsis : figures.pointerSmall);
    var item = (expandable, expanded) => c.gray(expandable ? expanded ? figures.pointerSmall : "+" : figures.line);
    module2.exports = {
      styles,
      render,
      symbols,
      symbol,
      delimiter,
      item
    };
  }
});

// ../../node_modules/prompts/lib/util/lines.js
var require_lines2 = __commonJS({
  "../../node_modules/prompts/lib/util/lines.js"(exports, module2) {
    "use strict";
    var strip = require_strip2();
    module2.exports = function(msg, perLine) {
      let lines = String(strip(msg) || "").split(/\r?\n/);
      if (!perLine)
        return lines.length;
      return lines.map((l) => Math.ceil(l.length / perLine)).reduce((a, b) => a + b);
    };
  }
});

// ../../node_modules/prompts/lib/util/wrap.js
var require_wrap2 = __commonJS({
  "../../node_modules/prompts/lib/util/wrap.js"(exports, module2) {
    "use strict";
    module2.exports = (msg, opts = {}) => {
      const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(" ").join("") : opts.margin || "";
      const width = opts.width;
      return (msg || "").split(/\r?\n/g).map((line) => line.split(/\s+/g).reduce((arr, w) => {
        if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width)
          arr[arr.length - 1] += ` ${w}`;
        else
          arr.push(`${tab}${w}`);
        return arr;
      }, [tab]).join("\n")).join("\n");
    };
  }
});

// ../../node_modules/prompts/lib/util/entriesToDisplay.js
var require_entriesToDisplay2 = __commonJS({
  "../../node_modules/prompts/lib/util/entriesToDisplay.js"(exports, module2) {
    "use strict";
    module2.exports = (cursor, total, maxVisible) => {
      maxVisible = maxVisible || total;
      let startIndex = Math.min(total - maxVisible, cursor - Math.floor(maxVisible / 2));
      if (startIndex < 0)
        startIndex = 0;
      let endIndex = Math.min(startIndex + maxVisible, total);
      return { startIndex, endIndex };
    };
  }
});

// ../../node_modules/prompts/lib/util/index.js
var require_util2 = __commonJS({
  "../../node_modules/prompts/lib/util/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      action: require_action2(),
      clear: require_clear2(),
      style: require_style2(),
      strip: require_strip2(),
      figures: require_figures2(),
      lines: require_lines2(),
      wrap: require_wrap2(),
      entriesToDisplay: require_entriesToDisplay2()
    };
  }
});

// ../../node_modules/prompts/lib/elements/prompt.js
var require_prompt2 = __commonJS({
  "../../node_modules/prompts/lib/elements/prompt.js"(exports, module2) {
    "use strict";
    var readline = require("readline");
    var { action } = require_util2();
    var EventEmitter = require("events");
    var { beep, cursor } = require_src();
    var color = require_kleur();
    var Prompt = class extends EventEmitter {
      constructor(opts = {}) {
        super();
        this.firstRender = true;
        this.in = opts.stdin || process.stdin;
        this.out = opts.stdout || process.stdout;
        this.onRender = (opts.onRender || (() => void 0)).bind(this);
        const rl = readline.createInterface({ input: this.in, escapeCodeTimeout: 50 });
        readline.emitKeypressEvents(this.in, rl);
        if (this.in.isTTY)
          this.in.setRawMode(true);
        const isSelect = ["SelectPrompt", "MultiselectPrompt"].indexOf(this.constructor.name) > -1;
        const keypress = (str, key) => {
          let a = action(key, isSelect);
          if (a === false) {
            this._ && this._(str, key);
          } else if (typeof this[a] === "function") {
            this[a](key);
          } else {
            this.bell();
          }
        };
        this.close = () => {
          this.out.write(cursor.show);
          this.in.removeListener("keypress", keypress);
          if (this.in.isTTY)
            this.in.setRawMode(false);
          rl.close();
          this.emit(this.aborted ? "abort" : this.exited ? "exit" : "submit", this.value);
          this.closed = true;
        };
        this.in.on("keypress", keypress);
      }
      fire() {
        this.emit("state", {
          value: this.value,
          aborted: !!this.aborted,
          exited: !!this.exited
        });
      }
      bell() {
        this.out.write(beep);
      }
      render() {
        this.onRender(color);
        if (this.firstRender)
          this.firstRender = false;
      }
    };
    module2.exports = Prompt;
  }
});

// ../../node_modules/prompts/lib/elements/text.js
var require_text2 = __commonJS({
  "../../node_modules/prompts/lib/elements/text.js"(exports, module2) {
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { erase, cursor } = require_src();
    var { style, clear, lines, figures } = require_util2();
    var TextPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.msg = opts.message;
        this.initial = opts.initial || ``;
        this.validator = opts.validate || (() => true);
        this.value = ``;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.clear = clear(``, this.out.columns);
        this.render();
      }
      set value(v) {
        if (!v && this.initial) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(this.initial));
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(v);
        }
        this._value = v;
        this.fire();
      }
      get value() {
        return this._value;
      }
      reset() {
        this.value = ``;
        this.cursor = Number(!!this.initial);
        this.cursorOffset = 0;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.value = this.value || this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.red = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      async validate() {
        let valid = await this.validator(this.value);
        if (typeof valid === `string`) {
          this.errorMsg = valid;
          valid = false;
        }
        this.error = !valid;
      }
      async submit() {
        this.value = this.value || this.initial;
        this.cursorOffset = 0;
        this.cursor = this.rendered.length;
        await this.validate();
        if (this.error) {
          this.red = true;
          this.fire();
          this.render();
          return;
        }
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      next() {
        if (!this.placeholder)
          return this.bell();
        this.value = this.initial;
        this.cursor = this.rendered.length;
        this.fire();
        this.render();
      }
      moveCursor(n) {
        if (this.placeholder)
          return;
        this.cursor = this.cursor + n;
        this.cursorOffset += n;
      }
      _(c, key) {
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${c}${s2}`;
        this.red = false;
        this.cursor = this.placeholder ? 0 : s1.length + 1;
        this.render();
      }
      delete() {
        if (this.isCursorAtStart())
          return this.bell();
        let s1 = this.value.slice(0, this.cursor - 1);
        let s2 = this.value.slice(this.cursor);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtStart()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
          this.moveCursor(-1);
        }
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
          return this.bell();
        let s1 = this.value.slice(0, this.cursor);
        let s2 = this.value.slice(this.cursor + 1);
        this.value = `${s1}${s2}`;
        this.red = false;
        if (this.isCursorAtEnd()) {
          this.cursorOffset = 0;
        } else {
          this.cursorOffset++;
        }
        this.render();
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length;
        this.render();
      }
      left() {
        if (this.cursor <= 0 || this.placeholder)
          return this.bell();
        this.moveCursor(-1);
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length || this.placeholder)
          return this.bell();
        this.moveCursor(1);
        this.render();
      }
      isCursorAtStart() {
        return this.cursor === 0 || this.placeholder && this.cursor === 1;
      }
      isCursorAtEnd() {
        return this.cursor === this.rendered.length || this.placeholder && this.cursor === this.rendered.length + 1;
      }
      render() {
        if (this.closed)
          return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.red ? color.red(this.rendered) : this.rendered
        ].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? " " : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore + cursor.move(this.cursorOffset, 0));
      }
    };
    module2.exports = TextPrompt;
  }
});

// ../../node_modules/prompts/lib/elements/select.js
var require_select2 = __commonJS({
  "../../node_modules/prompts/lib/elements/select.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { style, clear, figures, wrap, entriesToDisplay } = require_util2();
    var { cursor } = require_src();
    var SelectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.hint = opts.hint || "- Use arrow-keys. Return to submit.";
        this.warn = opts.warn || "- This option is disabled";
        this.cursor = opts.initial || 0;
        this.choices = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = { title: ch, value: idx };
          return {
            title: ch && (ch.title || ch.value || ch),
            value: ch && (ch.value === void 0 ? idx : ch.value),
            description: ch && ch.description,
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = (this.choices[this.cursor] || {}).value;
        this.clear = clear("", this.out.columns);
        this.render();
      }
      moveCursor(n) {
        this.cursor = n;
        this.value = this.choices[n].value;
        this.fire();
      }
      reset() {
        this.moveCursor(0);
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        if (!this.selection.disabled) {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        } else
          this.bell();
      }
      first() {
        this.moveCursor(0);
        this.render();
      }
      last() {
        this.moveCursor(this.choices.length - 1);
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.moveCursor(this.choices.length - 1);
        } else {
          this.moveCursor(this.cursor - 1);
        }
        this.render();
      }
      down() {
        if (this.cursor === this.choices.length - 1) {
          this.moveCursor(0);
        } else {
          this.moveCursor(this.cursor + 1);
        }
        this.render();
      }
      next() {
        this.moveCursor((this.cursor + 1) % this.choices.length);
        this.render();
      }
      _(c, key) {
        if (c === " ")
          return this.submit();
      }
      get selection() {
        return this.choices[this.cursor];
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let { startIndex, endIndex } = entriesToDisplay(this.cursor, this.choices.length, this.optionsPerPage);
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.done ? this.selection.title : this.selection.disabled ? color.yellow(this.warn) : color.gray(this.hint)
        ].join(" ");
        if (!this.done) {
          this.outputText += "\n";
          for (let i = startIndex; i < endIndex; i++) {
            let title, prefix, desc = "", v = this.choices[i];
            if (i === startIndex && startIndex > 0) {
              prefix = figures.arrowUp;
            } else if (i === endIndex - 1 && endIndex < this.choices.length) {
              prefix = figures.arrowDown;
            } else {
              prefix = " ";
            }
            if (v.disabled) {
              title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
              prefix = (this.cursor === i ? color.bold().gray(figures.pointer) + " " : "  ") + prefix;
            } else {
              title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
              prefix = (this.cursor === i ? color.cyan(figures.pointer) + " " : "  ") + prefix;
              if (v.description && this.cursor === i) {
                desc = ` - ${v.description}`;
                if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
                  desc = "\n" + wrap(v.description, { margin: 3, width: this.out.columns });
                }
              }
            }
            this.outputText += `${prefix} ${title}${color.gray(desc)}
`;
          }
        }
        this.out.write(this.outputText);
      }
    };
    module2.exports = SelectPrompt;
  }
});

// ../../node_modules/prompts/lib/elements/toggle.js
var require_toggle2 = __commonJS({
  "../../node_modules/prompts/lib/elements/toggle.js"(exports, module2) {
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { style, clear } = require_util2();
    var { cursor, erase } = require_src();
    var TogglePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = !!opts.initial;
        this.active = opts.active || "on";
        this.inactive = opts.inactive || "off";
        this.initialValue = this.value;
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      deactivate() {
        if (this.value === false)
          return this.bell();
        this.value = false;
        this.render();
      }
      activate() {
        if (this.value === true)
          return this.bell();
        this.value = true;
        this.render();
      }
      delete() {
        this.deactivate();
      }
      left() {
        this.deactivate();
      }
      right() {
        this.activate();
      }
      down() {
        this.deactivate();
      }
      up() {
        this.activate();
      }
      next() {
        this.value = !this.value;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.value = !this.value;
        } else if (c === "1") {
          this.value = true;
        } else if (c === "0") {
          this.value = false;
        } else
          return this.bell();
        this.render();
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.value ? this.inactive : color.cyan().underline(this.inactive),
          color.gray("/"),
          this.value ? color.cyan().underline(this.active) : this.active
        ].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = TogglePrompt;
  }
});

// ../../node_modules/prompts/lib/dateparts/datepart.js
var require_datepart2 = __commonJS({
  "../../node_modules/prompts/lib/dateparts/datepart.js"(exports, module2) {
    "use strict";
    var DatePart = class {
      constructor({ token, date, parts, locales }) {
        this.token = token;
        this.date = date || new Date();
        this.parts = parts || [this];
        this.locales = locales || {};
      }
      up() {
      }
      down() {
      }
      next() {
        const currentIdx = this.parts.indexOf(this);
        return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
      }
      setTo(val) {
      }
      prev() {
        let parts = [].concat(this.parts).reverse();
        const currentIdx = parts.indexOf(this);
        return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
      }
      toString() {
        return String(this.date);
      }
    };
    module2.exports = DatePart;
  }
});

// ../../node_modules/prompts/lib/dateparts/meridiem.js
var require_meridiem2 = __commonJS({
  "../../node_modules/prompts/lib/dateparts/meridiem.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Meridiem = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours((this.date.getHours() + 12) % 24);
      }
      down() {
        this.up();
      }
      toString() {
        let meridiem = this.date.getHours() > 12 ? "pm" : "am";
        return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
      }
    };
    module2.exports = Meridiem;
  }
});

// ../../node_modules/prompts/lib/dateparts/day.js
var require_day2 = __commonJS({
  "../../node_modules/prompts/lib/dateparts/day.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var pos = (n) => {
      n = n % 10;
      return n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
    };
    var Day = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setDate(this.date.getDate() + 1);
      }
      down() {
        this.date.setDate(this.date.getDate() - 1);
      }
      setTo(val) {
        this.date.setDate(parseInt(val.substr(-2)));
      }
      toString() {
        let date = this.date.getDate();
        let day = this.date.getDay();
        return this.token === "DD" ? String(date).padStart(2, "0") : this.token === "Do" ? date + pos(date) : this.token === "d" ? day + 1 : this.token === "ddd" ? this.locales.weekdaysShort[day] : this.token === "dddd" ? this.locales.weekdays[day] : date;
      }
    };
    module2.exports = Day;
  }
});

// ../../node_modules/prompts/lib/dateparts/hours.js
var require_hours2 = __commonJS({
  "../../node_modules/prompts/lib/dateparts/hours.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Hours = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setHours(this.date.getHours() + 1);
      }
      down() {
        this.date.setHours(this.date.getHours() - 1);
      }
      setTo(val) {
        this.date.setHours(parseInt(val.substr(-2)));
      }
      toString() {
        let hours = this.date.getHours();
        if (/h/.test(this.token))
          hours = hours % 12 || 12;
        return this.token.length > 1 ? String(hours).padStart(2, "0") : hours;
      }
    };
    module2.exports = Hours;
  }
});

// ../../node_modules/prompts/lib/dateparts/milliseconds.js
var require_milliseconds2 = __commonJS({
  "../../node_modules/prompts/lib/dateparts/milliseconds.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Milliseconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMilliseconds(this.date.getMilliseconds() + 1);
      }
      down() {
        this.date.setMilliseconds(this.date.getMilliseconds() - 1);
      }
      setTo(val) {
        this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
      }
      toString() {
        return String(this.date.getMilliseconds()).padStart(4, "0").substr(0, this.token.length);
      }
    };
    module2.exports = Milliseconds;
  }
});

// ../../node_modules/prompts/lib/dateparts/minutes.js
var require_minutes2 = __commonJS({
  "../../node_modules/prompts/lib/dateparts/minutes.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Minutes = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMinutes(this.date.getMinutes() + 1);
      }
      down() {
        this.date.setMinutes(this.date.getMinutes() - 1);
      }
      setTo(val) {
        this.date.setMinutes(parseInt(val.substr(-2)));
      }
      toString() {
        let m = this.date.getMinutes();
        return this.token.length > 1 ? String(m).padStart(2, "0") : m;
      }
    };
    module2.exports = Minutes;
  }
});

// ../../node_modules/prompts/lib/dateparts/month.js
var require_month2 = __commonJS({
  "../../node_modules/prompts/lib/dateparts/month.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Month = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setMonth(this.date.getMonth() + 1);
      }
      down() {
        this.date.setMonth(this.date.getMonth() - 1);
      }
      setTo(val) {
        val = parseInt(val.substr(-2)) - 1;
        this.date.setMonth(val < 0 ? 0 : val);
      }
      toString() {
        let month = this.date.getMonth();
        let tl = this.token.length;
        return tl === 2 ? String(month + 1).padStart(2, "0") : tl === 3 ? this.locales.monthsShort[month] : tl === 4 ? this.locales.months[month] : String(month + 1);
      }
    };
    module2.exports = Month;
  }
});

// ../../node_modules/prompts/lib/dateparts/seconds.js
var require_seconds2 = __commonJS({
  "../../node_modules/prompts/lib/dateparts/seconds.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Seconds = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setSeconds(this.date.getSeconds() + 1);
      }
      down() {
        this.date.setSeconds(this.date.getSeconds() - 1);
      }
      setTo(val) {
        this.date.setSeconds(parseInt(val.substr(-2)));
      }
      toString() {
        let s = this.date.getSeconds();
        return this.token.length > 1 ? String(s).padStart(2, "0") : s;
      }
    };
    module2.exports = Seconds;
  }
});

// ../../node_modules/prompts/lib/dateparts/year.js
var require_year2 = __commonJS({
  "../../node_modules/prompts/lib/dateparts/year.js"(exports, module2) {
    "use strict";
    var DatePart = require_datepart2();
    var Year = class extends DatePart {
      constructor(opts = {}) {
        super(opts);
      }
      up() {
        this.date.setFullYear(this.date.getFullYear() + 1);
      }
      down() {
        this.date.setFullYear(this.date.getFullYear() - 1);
      }
      setTo(val) {
        this.date.setFullYear(val.substr(-4));
      }
      toString() {
        let year = String(this.date.getFullYear()).padStart(4, "0");
        return this.token.length === 2 ? year.substr(-2) : year;
      }
    };
    module2.exports = Year;
  }
});

// ../../node_modules/prompts/lib/dateparts/index.js
var require_dateparts2 = __commonJS({
  "../../node_modules/prompts/lib/dateparts/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      DatePart: require_datepart2(),
      Meridiem: require_meridiem2(),
      Day: require_day2(),
      Hours: require_hours2(),
      Milliseconds: require_milliseconds2(),
      Minutes: require_minutes2(),
      Month: require_month2(),
      Seconds: require_seconds2(),
      Year: require_year2()
    };
  }
});

// ../../node_modules/prompts/lib/elements/date.js
var require_date2 = __commonJS({
  "../../node_modules/prompts/lib/elements/date.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { style, clear, figures } = require_util2();
    var { erase, cursor } = require_src();
    var { DatePart, Meridiem, Day, Hours, Milliseconds, Minutes, Month, Seconds, Year } = require_dateparts2();
    var regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
    var regexGroups = {
      1: ({ token }) => token.replace(/\\(.)/g, "$1"),
      2: (opts) => new Day(opts),
      3: (opts) => new Month(opts),
      4: (opts) => new Year(opts),
      5: (opts) => new Meridiem(opts),
      6: (opts) => new Hours(opts),
      7: (opts) => new Minutes(opts),
      8: (opts) => new Seconds(opts),
      9: (opts) => new Milliseconds(opts)
    };
    var dfltLocales = {
      months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
      monthsShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
      weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
      weekdaysShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")
    };
    var DatePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = 0;
        this.typed = "";
        this.locales = Object.assign(dfltLocales, opts.locales);
        this._date = opts.initial || new Date();
        this.errorMsg = opts.error || "Please Enter A Valid Value";
        this.validator = opts.validate || (() => true);
        this.mask = opts.mask || "YYYY-MM-DD HH:mm:ss";
        this.clear = clear("", this.out.columns);
        this.render();
      }
      get value() {
        return this.date;
      }
      get date() {
        return this._date;
      }
      set date(date) {
        if (date)
          this._date.setTime(date.getTime());
      }
      set mask(mask) {
        let result;
        this.parts = [];
        while (result = regex.exec(mask)) {
          let match = result.shift();
          let idx = result.findIndex((gr) => gr != null);
          this.parts.push(idx in regexGroups ? regexGroups[idx]({ token: result[idx] || match, date: this.date, parts: this.parts, locales: this.locales }) : result[idx] || match);
        }
        let parts = this.parts.reduce((arr, i) => {
          if (typeof i === "string" && typeof arr[arr.length - 1] === "string")
            arr[arr.length - 1] += i;
          else
            arr.push(i);
          return arr;
        }, []);
        this.parts.splice(0);
        this.parts.push(...parts);
        this.reset();
      }
      moveCursor(n) {
        this.typed = "";
        this.cursor = n;
        this.fire();
      }
      reset() {
        this.moveCursor(this.parts.findIndex((p) => p instanceof DatePart));
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      async validate() {
        let valid = await this.validator(this.value);
        if (typeof valid === "string") {
          this.errorMsg = valid;
          valid = false;
        }
        this.error = !valid;
      }
      async submit() {
        await this.validate();
        if (this.error) {
          this.color = "red";
          this.fire();
          this.render();
          return;
        }
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      up() {
        this.typed = "";
        this.parts[this.cursor].up();
        this.render();
      }
      down() {
        this.typed = "";
        this.parts[this.cursor].down();
        this.render();
      }
      left() {
        let prev = this.parts[this.cursor].prev();
        if (prev == null)
          return this.bell();
        this.moveCursor(this.parts.indexOf(prev));
        this.render();
      }
      right() {
        let next = this.parts[this.cursor].next();
        if (next == null)
          return this.bell();
        this.moveCursor(this.parts.indexOf(next));
        this.render();
      }
      next() {
        let next = this.parts[this.cursor].next();
        this.moveCursor(next ? this.parts.indexOf(next) : this.parts.findIndex((part) => part instanceof DatePart));
        this.render();
      }
      _(c) {
        if (/\d/.test(c)) {
          this.typed += c;
          this.parts[this.cursor].setTo(this.typed);
          this.render();
        }
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), []).join("")
        ].join(" ");
        if (this.error) {
          this.outputText += this.errorMsg.split("\n").reduce(
            (a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`,
            ``
          );
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = DatePrompt;
  }
});

// ../../node_modules/prompts/lib/elements/number.js
var require_number2 = __commonJS({
  "../../node_modules/prompts/lib/elements/number.js"(exports, module2) {
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { cursor, erase } = require_src();
    var { style, figures, clear, lines } = require_util2();
    var isNumber = /[0-9]/;
    var isDef = (any) => any !== void 0;
    var round = (number, precision) => {
      let factor = Math.pow(10, precision);
      return Math.round(number * factor) / factor;
    };
    var NumberPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.transform = style.render(opts.style);
        this.msg = opts.message;
        this.initial = isDef(opts.initial) ? opts.initial : "";
        this.float = !!opts.float;
        this.round = opts.round || 2;
        this.inc = opts.increment || 1;
        this.min = isDef(opts.min) ? opts.min : -Infinity;
        this.max = isDef(opts.max) ? opts.max : Infinity;
        this.errorMsg = opts.error || `Please Enter A Valid Value`;
        this.validator = opts.validate || (() => true);
        this.color = `cyan`;
        this.value = ``;
        this.typed = ``;
        this.lastHit = 0;
        this.render();
      }
      set value(v) {
        if (!v && v !== 0) {
          this.placeholder = true;
          this.rendered = color.gray(this.transform.render(`${this.initial}`));
          this._value = ``;
        } else {
          this.placeholder = false;
          this.rendered = this.transform.render(`${round(v, this.round)}`);
          this._value = round(v, this.round);
        }
        this.fire();
      }
      get value() {
        return this._value;
      }
      parse(x) {
        return this.float ? parseFloat(x) : parseInt(x);
      }
      valid(c) {
        return c === `-` || c === `.` && this.float || isNumber.test(c);
      }
      reset() {
        this.typed = ``;
        this.value = ``;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        let x = this.value;
        this.value = x !== `` ? x : this.initial;
        this.done = this.aborted = true;
        this.error = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
      async validate() {
        let valid = await this.validator(this.value);
        if (typeof valid === `string`) {
          this.errorMsg = valid;
          valid = false;
        }
        this.error = !valid;
      }
      async submit() {
        await this.validate();
        if (this.error) {
          this.color = `red`;
          this.fire();
          this.render();
          return;
        }
        let x = this.value;
        this.value = x !== `` ? x : this.initial;
        this.done = true;
        this.aborted = false;
        this.error = false;
        this.fire();
        this.render();
        this.out.write(`
`);
        this.close();
      }
      up() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min - this.inc;
        }
        if (this.value >= this.max)
          return this.bell();
        this.value += this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      down() {
        this.typed = ``;
        if (this.value === "") {
          this.value = this.min + this.inc;
        }
        if (this.value <= this.min)
          return this.bell();
        this.value -= this.inc;
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      delete() {
        let val = this.value.toString();
        if (val.length === 0)
          return this.bell();
        this.value = this.parse(val = val.slice(0, -1)) || ``;
        if (this.value !== "" && this.value < this.min) {
          this.value = this.min;
        }
        this.color = `cyan`;
        this.fire();
        this.render();
      }
      next() {
        this.value = this.initial;
        this.fire();
        this.render();
      }
      _(c, key) {
        if (!this.valid(c))
          return this.bell();
        const now = Date.now();
        if (now - this.lastHit > 1e3)
          this.typed = ``;
        this.typed += c;
        this.lastHit = now;
        this.color = `cyan`;
        if (c === `.`)
          return this.fire();
        this.value = Math.min(this.parse(this.typed), this.max);
        if (this.value > this.max)
          this.value = this.max;
        if (this.value < this.min)
          this.value = this.min;
        this.fire();
        this.render();
      }
      render() {
        if (this.closed)
          return;
        if (!this.firstRender) {
          if (this.outputError)
            this.out.write(cursor.down(lines(this.outputError, this.out.columns) - 1) + clear(this.outputError, this.out.columns));
          this.out.write(clear(this.outputText, this.out.columns));
        }
        super.render();
        this.outputError = "";
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          !this.done || !this.done && !this.placeholder ? color[this.color]().underline(this.rendered) : this.rendered
        ].join(` `);
        if (this.error) {
          this.outputError += this.errorMsg.split(`
`).reduce((a, l, i) => a + `
${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
      }
    };
    module2.exports = NumberPrompt;
  }
});

// ../../node_modules/prompts/lib/elements/multiselect.js
var require_multiselect2 = __commonJS({
  "../../node_modules/prompts/lib/elements/multiselect.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var { cursor } = require_src();
    var Prompt = require_prompt2();
    var { clear, figures, style, wrap, entriesToDisplay } = require_util2();
    var MultiselectPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.cursor = opts.cursor || 0;
        this.scrollIndex = opts.cursor || 0;
        this.hint = opts.hint || "";
        this.warn = opts.warn || "- This option is disabled -";
        this.minSelected = opts.min;
        this.showMinError = false;
        this.maxChoices = opts.max;
        this.instructions = opts.instructions;
        this.optionsPerPage = opts.optionsPerPage || 10;
        this.value = opts.choices.map((ch, idx) => {
          if (typeof ch === "string")
            ch = { title: ch, value: idx };
          return {
            title: ch && (ch.title || ch.value || ch),
            description: ch && ch.description,
            value: ch && (ch.value === void 0 ? idx : ch.value),
            selected: ch && ch.selected,
            disabled: ch && ch.disabled
          };
        });
        this.clear = clear("", this.out.columns);
        if (!opts.overrideRender) {
          this.render();
        }
      }
      reset() {
        this.value.map((v) => !v.selected);
        this.cursor = 0;
        this.fire();
        this.render();
      }
      selected() {
        return this.value.filter((v) => v.selected);
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        const selected = this.value.filter((e) => e.selected);
        if (this.minSelected && selected.length < this.minSelected) {
          this.showMinError = true;
          this.render();
        } else {
          this.done = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.value.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.value.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.value.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.value.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.value[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices)
          return this.bell();
        this.value[this.cursor].selected = true;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.value[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      toggleAll() {
        if (this.maxChoices !== void 0 || this.value[this.cursor].disabled) {
          return this.bell();
        }
        const newSelected = !this.value[this.cursor].selected;
        this.value.filter((v) => !v.disabled).forEach((v) => v.selected = newSelected);
        this.render();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else if (c === "a") {
          this.toggleAll();
        } else {
          return this.bell();
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
` + (this.maxChoices === void 0 ? `    a: Toggle all
` : "") + `    enter/return: Complete answer`;
        }
        return "";
      }
      renderOption(cursor2, v, i, arrowIndicator) {
        const prefix = (v.selected ? color.green(figures.radioOn) : figures.radioOff) + " " + arrowIndicator + " ";
        let title, desc;
        if (v.disabled) {
          title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        } else {
          title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
          if (cursor2 === i && v.description) {
            desc = ` - ${v.description}`;
            if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
              desc = "\n" + wrap(v.description, { margin: prefix.length, width: this.out.columns });
            }
          }
        }
        return prefix + title + color.gray(desc || "");
      }
      paginateOptions(options) {
        if (options.length === 0) {
          return color.red("No matches for this query.");
        }
        let { startIndex, endIndex } = entriesToDisplay(this.cursor, options.length, this.optionsPerPage);
        let prefix, styledOptions = [];
        for (let i = startIndex; i < endIndex; i++) {
          if (i === startIndex && startIndex > 0) {
            prefix = figures.arrowUp;
          } else if (i === endIndex - 1 && endIndex < options.length) {
            prefix = figures.arrowDown;
          } else {
            prefix = " ";
          }
          styledOptions.push(this.renderOption(this.cursor, options[i], i, prefix));
        }
        return "\n" + styledOptions.join("\n");
      }
      renderOptions(options) {
        if (!this.done) {
          return this.paginateOptions(options);
        }
        return "";
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions()];
        if (this.value[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        super.render();
        let prompt = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.renderDoneOrInstructions()
        ].join(" ");
        if (this.showMinError) {
          prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt += this.renderOptions(this.value);
        this.out.write(this.clear + prompt);
        this.clear = clear(prompt, this.out.columns);
      }
    };
    module2.exports = MultiselectPrompt;
  }
});

// ../../node_modules/prompts/lib/elements/autocomplete.js
var require_autocomplete2 = __commonJS({
  "../../node_modules/prompts/lib/elements/autocomplete.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { erase, cursor } = require_src();
    var { style, clear, figures, wrap, entriesToDisplay } = require_util2();
    var getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
    var getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
    var getIndex = (arr, valOrTitle) => {
      const index = arr.findIndex((el) => el.value === valOrTitle || el.title === valOrTitle);
      return index > -1 ? index : void 0;
    };
    var AutocompletePrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.suggest = opts.suggest;
        this.choices = opts.choices;
        this.initial = typeof opts.initial === "number" ? opts.initial : getIndex(opts.choices, opts.initial);
        this.select = this.initial || opts.cursor || 0;
        this.i18n = { noMatches: opts.noMatches || "no matches found" };
        this.fallback = opts.fallback || this.initial;
        this.clearFirst = opts.clearFirst || false;
        this.suggestions = [];
        this.input = "";
        this.limit = opts.limit || 10;
        this.cursor = 0;
        this.transform = style.render(opts.style);
        this.scale = this.transform.scale;
        this.render = this.render.bind(this);
        this.complete = this.complete.bind(this);
        this.clear = clear("", this.out.columns);
        this.complete(this.render);
        this.render();
      }
      set fallback(fb) {
        this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
      }
      get fallback() {
        let choice;
        if (typeof this._fb === "number")
          choice = this.choices[this._fb];
        else if (typeof this._fb === "string")
          choice = { title: this._fb };
        return choice || this._fb || { title: this.i18n.noMatches };
      }
      moveSelect(i) {
        this.select = i;
        if (this.suggestions.length > 0)
          this.value = getVal(this.suggestions, i);
        else
          this.value = this.fallback.value;
        this.fire();
      }
      async complete(cb) {
        const p = this.completing = this.suggest(this.input, this.choices);
        const suggestions = await p;
        if (this.completing !== p)
          return;
        this.suggestions = suggestions.map((s, i, arr) => ({ title: getTitle(arr, i), value: getVal(arr, i), description: s.description }));
        this.completing = false;
        const l = Math.max(suggestions.length - 1, 0);
        this.moveSelect(Math.min(l, this.select));
        cb && cb();
      }
      reset() {
        this.input = "";
        this.complete(() => {
          this.moveSelect(this.initial !== void 0 ? this.initial : 0);
          this.render();
        });
        this.render();
      }
      exit() {
        if (this.clearFirst && this.input.length > 0) {
          this.reset();
        } else {
          this.done = this.exited = true;
          this.aborted = false;
          this.fire();
          this.render();
          this.out.write("\n");
          this.close();
        }
      }
      abort() {
        this.done = this.aborted = true;
        this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.done = true;
        this.aborted = this.exited = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${c}${s2}`;
        this.cursor = s1.length + 1;
        this.complete(this.render);
        this.render();
      }
      delete() {
        if (this.cursor === 0)
          return this.bell();
        let s1 = this.input.slice(0, this.cursor - 1);
        let s2 = this.input.slice(this.cursor);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.cursor = this.cursor - 1;
        this.render();
      }
      deleteForward() {
        if (this.cursor * this.scale >= this.rendered.length)
          return this.bell();
        let s1 = this.input.slice(0, this.cursor);
        let s2 = this.input.slice(this.cursor + 1);
        this.input = `${s1}${s2}`;
        this.complete(this.render);
        this.render();
      }
      first() {
        this.moveSelect(0);
        this.render();
      }
      last() {
        this.moveSelect(this.suggestions.length - 1);
        this.render();
      }
      up() {
        if (this.select === 0) {
          this.moveSelect(this.suggestions.length - 1);
        } else {
          this.moveSelect(this.select - 1);
        }
        this.render();
      }
      down() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else {
          this.moveSelect(this.select + 1);
        }
        this.render();
      }
      next() {
        if (this.select === this.suggestions.length - 1) {
          this.moveSelect(0);
        } else
          this.moveSelect(this.select + 1);
        this.render();
      }
      nextPage() {
        this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
        this.render();
      }
      prevPage() {
        this.moveSelect(Math.max(this.select - this.limit, 0));
        this.render();
      }
      left() {
        if (this.cursor <= 0)
          return this.bell();
        this.cursor = this.cursor - 1;
        this.render();
      }
      right() {
        if (this.cursor * this.scale >= this.rendered.length)
          return this.bell();
        this.cursor = this.cursor + 1;
        this.render();
      }
      renderOption(v, hovered, isStart, isEnd) {
        let desc;
        let prefix = isStart ? figures.arrowUp : isEnd ? figures.arrowDown : " ";
        let title = hovered ? color.cyan().underline(v.title) : v.title;
        prefix = (hovered ? color.cyan(figures.pointer) + " " : "  ") + prefix;
        if (v.description) {
          desc = ` - ${v.description}`;
          if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
            desc = "\n" + wrap(v.description, { margin: 3, width: this.out.columns });
          }
        }
        return prefix + " " + title + color.gray(desc || "");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        let { startIndex, endIndex } = entriesToDisplay(this.select, this.choices.length, this.limit);
        this.outputText = [
          style.symbol(this.done, this.aborted, this.exited),
          color.bold(this.msg),
          style.delimiter(this.completing),
          this.done && this.suggestions[this.select] ? this.suggestions[this.select].title : this.rendered = this.transform.render(this.input)
        ].join(" ");
        if (!this.done) {
          const suggestions = this.suggestions.slice(startIndex, endIndex).map((item, i) => this.renderOption(
            item,
            this.select === i + startIndex,
            i === 0 && startIndex > 0,
            i + startIndex === endIndex - 1 && endIndex < this.choices.length
          )).join("\n");
          this.outputText += `
` + (suggestions || color.gray(this.fallback.title));
        }
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = AutocompletePrompt;
  }
});

// ../../node_modules/prompts/lib/elements/autocompleteMultiselect.js
var require_autocompleteMultiselect2 = __commonJS({
  "../../node_modules/prompts/lib/elements/autocompleteMultiselect.js"(exports, module2) {
    "use strict";
    var color = require_kleur();
    var { cursor } = require_src();
    var MultiselectPrompt = require_multiselect2();
    var { clear, style, figures } = require_util2();
    var AutocompleteMultiselectPrompt = class extends MultiselectPrompt {
      constructor(opts = {}) {
        opts.overrideRender = true;
        super(opts);
        this.inputValue = "";
        this.clear = clear("", this.out.columns);
        this.filteredOptions = this.value;
        this.render();
      }
      last() {
        this.cursor = this.filteredOptions.length - 1;
        this.render();
      }
      next() {
        this.cursor = (this.cursor + 1) % this.filteredOptions.length;
        this.render();
      }
      up() {
        if (this.cursor === 0) {
          this.cursor = this.filteredOptions.length - 1;
        } else {
          this.cursor--;
        }
        this.render();
      }
      down() {
        if (this.cursor === this.filteredOptions.length - 1) {
          this.cursor = 0;
        } else {
          this.cursor++;
        }
        this.render();
      }
      left() {
        this.filteredOptions[this.cursor].selected = false;
        this.render();
      }
      right() {
        if (this.value.filter((e) => e.selected).length >= this.maxChoices)
          return this.bell();
        this.filteredOptions[this.cursor].selected = true;
        this.render();
      }
      delete() {
        if (this.inputValue.length) {
          this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
          this.updateFilteredOptions();
        }
      }
      updateFilteredOptions() {
        const currentHighlight = this.filteredOptions[this.cursor];
        this.filteredOptions = this.value.filter((v) => {
          if (this.inputValue) {
            if (typeof v.title === "string") {
              if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            if (typeof v.value === "string") {
              if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
                return true;
              }
            }
            return false;
          }
          return true;
        });
        const newHighlightIndex = this.filteredOptions.findIndex((v) => v === currentHighlight);
        this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
        this.render();
      }
      handleSpaceToggle() {
        const v = this.filteredOptions[this.cursor];
        if (v.selected) {
          v.selected = false;
          this.render();
        } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
          return this.bell();
        } else {
          v.selected = true;
          this.render();
        }
      }
      handleInputChange(c) {
        this.inputValue = this.inputValue + c;
        this.updateFilteredOptions();
      }
      _(c, key) {
        if (c === " ") {
          this.handleSpaceToggle();
        } else {
          this.handleInputChange(c);
        }
      }
      renderInstructions() {
        if (this.instructions === void 0 || this.instructions) {
          if (typeof this.instructions === "string") {
            return this.instructions;
          }
          return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
        }
        return "";
      }
      renderCurrentInput() {
        return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray("Enter something to filter")}
`;
      }
      renderOption(cursor2, v, i) {
        let title;
        if (v.disabled)
          title = cursor2 === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
        else
          title = cursor2 === i ? color.cyan().underline(v.title) : v.title;
        return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + "  " + title;
      }
      renderDoneOrInstructions() {
        if (this.done) {
          return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
        }
        const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];
        if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
          output.push(color.yellow(this.warn));
        }
        return output.join(" ");
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        super.render();
        let prompt = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(false),
          this.renderDoneOrInstructions()
        ].join(" ");
        if (this.showMinError) {
          prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
          this.showMinError = false;
        }
        prompt += this.renderOptions(this.filteredOptions);
        this.out.write(this.clear + prompt);
        this.clear = clear(prompt, this.out.columns);
      }
    };
    module2.exports = AutocompleteMultiselectPrompt;
  }
});

// ../../node_modules/prompts/lib/elements/confirm.js
var require_confirm2 = __commonJS({
  "../../node_modules/prompts/lib/elements/confirm.js"(exports, module2) {
    var color = require_kleur();
    var Prompt = require_prompt2();
    var { style, clear } = require_util2();
    var { erase, cursor } = require_src();
    var ConfirmPrompt = class extends Prompt {
      constructor(opts = {}) {
        super(opts);
        this.msg = opts.message;
        this.value = opts.initial;
        this.initialValue = !!opts.initial;
        this.yesMsg = opts.yes || "yes";
        this.yesOption = opts.yesOption || "(Y/n)";
        this.noMsg = opts.no || "no";
        this.noOption = opts.noOption || "(y/N)";
        this.render();
      }
      reset() {
        this.value = this.initialValue;
        this.fire();
        this.render();
      }
      exit() {
        this.abort();
      }
      abort() {
        this.done = this.aborted = true;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      submit() {
        this.value = this.value || false;
        this.done = true;
        this.aborted = false;
        this.fire();
        this.render();
        this.out.write("\n");
        this.close();
      }
      _(c, key) {
        if (c.toLowerCase() === "y") {
          this.value = true;
          return this.submit();
        }
        if (c.toLowerCase() === "n") {
          this.value = false;
          return this.submit();
        }
        return this.bell();
      }
      render() {
        if (this.closed)
          return;
        if (this.firstRender)
          this.out.write(cursor.hide);
        else
          this.out.write(clear(this.outputText, this.out.columns));
        super.render();
        this.outputText = [
          style.symbol(this.done, this.aborted),
          color.bold(this.msg),
          style.delimiter(this.done),
          this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)
        ].join(" ");
        this.out.write(erase.line + cursor.to(0) + this.outputText);
      }
    };
    module2.exports = ConfirmPrompt;
  }
});

// ../../node_modules/prompts/lib/elements/index.js
var require_elements2 = __commonJS({
  "../../node_modules/prompts/lib/elements/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      TextPrompt: require_text2(),
      SelectPrompt: require_select2(),
      TogglePrompt: require_toggle2(),
      DatePrompt: require_date2(),
      NumberPrompt: require_number2(),
      MultiselectPrompt: require_multiselect2(),
      AutocompletePrompt: require_autocomplete2(),
      AutocompleteMultiselectPrompt: require_autocompleteMultiselect2(),
      ConfirmPrompt: require_confirm2()
    };
  }
});

// ../../node_modules/prompts/lib/prompts.js
var require_prompts2 = __commonJS({
  "../../node_modules/prompts/lib/prompts.js"(exports) {
    "use strict";
    var $ = exports;
    var el = require_elements2();
    var noop = (v) => v;
    function toPrompt(type, args, opts = {}) {
      return new Promise((res, rej) => {
        const p = new el[type](args);
        const onAbort = opts.onAbort || noop;
        const onSubmit = opts.onSubmit || noop;
        const onExit = opts.onExit || noop;
        p.on("state", args.onState || noop);
        p.on("submit", (x) => res(onSubmit(x)));
        p.on("exit", (x) => res(onExit(x)));
        p.on("abort", (x) => rej(onAbort(x)));
      });
    }
    $.text = (args) => toPrompt("TextPrompt", args);
    $.password = (args) => {
      args.style = "password";
      return $.text(args);
    };
    $.invisible = (args) => {
      args.style = "invisible";
      return $.text(args);
    };
    $.number = (args) => toPrompt("NumberPrompt", args);
    $.date = (args) => toPrompt("DatePrompt", args);
    $.confirm = (args) => toPrompt("ConfirmPrompt", args);
    $.list = (args) => {
      const sep = args.separator || ",";
      return toPrompt("TextPrompt", args, {
        onSubmit: (str) => str.split(sep).map((s) => s.trim())
      });
    };
    $.toggle = (args) => toPrompt("TogglePrompt", args);
    $.select = (args) => toPrompt("SelectPrompt", args);
    $.multiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("MultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    $.autocompleteMultiselect = (args) => {
      args.choices = [].concat(args.choices || []);
      const toSelected = (items) => items.filter((item) => item.selected).map((item) => item.value);
      return toPrompt("AutocompleteMultiselectPrompt", args, {
        onAbort: toSelected,
        onSubmit: toSelected
      });
    };
    var byTitle = (input, choices) => Promise.resolve(
      choices.filter((item) => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase())
    );
    $.autocomplete = (args) => {
      args.suggest = args.suggest || byTitle;
      args.choices = [].concat(args.choices || []);
      return toPrompt("AutocompletePrompt", args);
    };
  }
});

// ../../node_modules/prompts/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/prompts/lib/index.js"(exports, module2) {
    "use strict";
    var prompts2 = require_prompts2();
    var passOn = ["suggest", "format", "onState", "validate", "onRender", "type"];
    var noop = () => {
    };
    async function prompt(questions = [], { onSubmit = noop, onCancel = noop } = {}) {
      const answers = {};
      const override2 = prompt._override || {};
      questions = [].concat(questions);
      let answer, question, quit, name, type, lastPrompt;
      const getFormattedAnswer = async (question2, answer2, skipValidation = false) => {
        if (!skipValidation && question2.validate && question2.validate(answer2) !== true) {
          return;
        }
        return question2.format ? await question2.format(answer2, answers) : answer2;
      };
      for (question of questions) {
        ({ name, type } = question);
        if (typeof type === "function") {
          type = await type(answer, { ...answers }, question);
          question["type"] = type;
        }
        if (!type)
          continue;
        for (let key in question) {
          if (passOn.includes(key))
            continue;
          let value = question[key];
          question[key] = typeof value === "function" ? await value(answer, { ...answers }, lastPrompt) : value;
        }
        lastPrompt = question;
        if (typeof question.message !== "string") {
          throw new Error("prompt message is required");
        }
        ({ name, type } = question);
        if (prompts2[type] === void 0) {
          throw new Error(`prompt type (${type}) is not defined`);
        }
        if (override2[question.name] !== void 0) {
          answer = await getFormattedAnswer(question, override2[question.name]);
          if (answer !== void 0) {
            answers[name] = answer;
            continue;
          }
        }
        try {
          answer = prompt._injected ? getInjectedAnswer(prompt._injected, question.initial) : await prompts2[type](question);
          answers[name] = answer = await getFormattedAnswer(question, answer, true);
          quit = await onSubmit(question, answer, answers);
        } catch (err) {
          quit = !await onCancel(question, answers);
        }
        if (quit)
          return answers;
      }
      return answers;
    }
    function getInjectedAnswer(injected, deafultValue) {
      const answer = injected.shift();
      if (answer instanceof Error) {
        throw answer;
      }
      return answer === void 0 ? deafultValue : answer;
    }
    function inject(answers) {
      prompt._injected = (prompt._injected || []).concat(answers);
    }
    function override(answers) {
      prompt._override = Object.assign({}, answers);
    }
    module2.exports = Object.assign(prompt, { prompt, prompts: prompts2, inject, override });
  }
});

// ../../node_modules/prompts/index.js
var require_prompts3 = __commonJS({
  "../../node_modules/prompts/index.js"(exports, module2) {
    function isNodeLT(tar) {
      tar = (Array.isArray(tar) ? tar : tar.split(".")).map(Number);
      let i = 0, src = process.versions.node.split(".").map(Number);
      for (; i < tar.length; i++) {
        if (src[i] > tar[i])
          return false;
        if (tar[i] > src[i])
          return true;
      }
      return false;
    }
    module2.exports = isNodeLT("8.6.0") ? require_dist() : require_lib();
  }
});

// src/index.ts
var import_prompts = __toESM(require_prompts3(), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);

// src/template.ts
function imports(language) {
  if (language === "ts") {
    return `import { YalPlugin, YalPluginsConfig } from '@yal-app/types';`;
  }
  return "";
}
function standardPluginTemplate(args) {
  return `
    const plugin${args.language === "ts" ? ":YalPlugin" : ""} = (args) => {
      const { setState } = args;
      setState({
        heading: 'Hello World',
        state: [
          {
            name: 'This is the first result',
            description: 'This is the first result description',
          },
          {
            name: 'This is the second result',
            description: 'This is the second result description',
          },
        ],
        action: (item) => {
          console.log(item.item.description);
        },
      });
    };
  `;
}
function appTemplate(args) {
  return `
  const plugin${args.language === "ts" ? ":YalPlugin" : ""} = (args) => {
    const { appNode } = args;
    appNode.innerHTML = '<p class="text-xl text-white">Hello World</p>';
  };
  `;
}
var pluginTemplate = (args) => {
  const { language, keywords, filter, isApp } = args;
  return `
  ${imports(language)}

  ${args.isApp ? appTemplate(args) : standardPluginTemplate(args)}
  
  export const config${args.language === "ts" ? "YalPluginsConfig" : ""} = {
    ${keywords ? `keywords: [${getKeywords(keywords)}],` : ""}
    ${isApp ? `isApp: true,` : ""}
    ${filter ? `filter: true,` : ""}
  };
  export default plugin;  
`;
};
function getKeywords(keywords) {
  const arr = [...new Set(keywords.split(/,| /))];
  return arr.map((item) => `'${item}'`).join(", ");
}

// src/package-json-template.ts
var packageJSONTemplate = (args) => {
  return `
  {
    "name": "@yal-app/plugin-${args.name}",
    "version": "0.0.1",
    "description": "yal plugin",
    "devDependencies": {
      "@yal-app/types": "latest"
    }
  }
  `;
};

// src/index.ts
(async () => {
  const response = await (0, import_prompts.default)([
    {
      type: "text",
      name: "name",
      message: "What is the plugin name?"
    },
    {
      type: "select",
      name: "language",
      message: "Would you like to use Typescript or Javascript?",
      choices: [
        {
          title: "TypeScript",
          value: "ts"
        },
        {
          title: "JavaScript",
          value: "js"
        }
      ]
    },
    {
      type: "text",
      name: "keywords",
      message: "What keywords shall we use to activate the plugin? Leave blank if no keywords required."
    },
    {
      name: "filter",
      type: "select",
      message: "Would you like the plugin results to be filtered by the text input?",
      choices: [
        {
          title: "No",
          value: false
        },
        {
          title: "Yes",
          value: true
        }
      ]
    },
    {
      name: "isApp",
      type: "select",
      message: "Is this plugin a standalone application?",
      initial: 0,
      choices: [
        {
          title: "No",
          value: false
        },
        {
          title: "Yes",
          value: true
        }
      ]
    }
  ]);
  function hyphenate(str) {
    return str.replace(/\s+/g, "-").toLowerCase();
  }
  import_fs.default.mkdirSync(import_path.default.join(process.cwd(), `./${hyphenate(response.name)}/src`), {
    recursive: true
  });
  const template = pluginTemplate(response);
  import_fs.default.writeFileSync(
    import_path.default.join(
      process.cwd(),
      `./${hyphenate(response.name)}/src/index.${response.language}`
    ),
    template
  );
  if (response.language === "ts") {
    const packageJSON = packageJSONTemplate(response);
    import_fs.default.writeFileSync(
      import_path.default.join(process.cwd(), `./${hyphenate(response.name)}/package.json`),
      packageJSON
    );
    const { exec } = require("child_process");
    exec(
      `cd ${hyphenate(response.name)} && npm install`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
  }
  console.log("Your yal plugin template has been created!");
  console.log(
    `Please open ${hyphenate(response.name)}/src/index.${response.language} to get started \u{1F680}`
  );
  console.log("*".repeat(50));
  console.log(
    "You can run a plugin server to develop your plugin locally, by running: npx @yal-app/cli run plugin-server"
  );
  console.log(
    "Please see the documentation for more information: TODO: plugin docs here..."
  );
  console.log("*".repeat(50));
})();
