/* eslint-disable */
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (const p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
const __rest =
  (this && this.__rest) ||
  function(s, e) {
    const t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]];
    return t;
  };
exports.__esModule = true;
const React = require("react");
require("./index.scss");

exports.Column = function(_a) {
  const children = _a.children;

  const _b = _a.className;

  const className = _b === void 0 ? "" : _b;

  const width = _a.width;

  const offset = _a.offset;

  const props = __rest(_a, ["children", "className", "width", "offset"]);
  const widthClass = width ? `mako-grid__col-${width}` : "";
  const offsetClass = offset ? `col-start-${offset}` : "";
  const colClassNames = [widthClass, offsetClass]
    .filter(Boolean)
    .concat(className)
    .join(" ")
    .trim();
  return React.createElement(
    "div",
    __assign({ className: colClassNames }, props),
    children
  );
};
