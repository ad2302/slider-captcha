"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.style = void 0;

var _classes = require("./classes");

var style = function style(colors, textStyle, _ref) {
  var width = _ref.width,
      height = _ref.height;
  return "\n.".concat(_classes.classes.anchorContainer, " {\nbox-shadow: 0px 0px 3px 0px rgba(0,0,0,0.1);\nborder: 1px solid rgba(0,0,0,0.12);\n  background-color: ").concat(colors.anchor.background, ";\n  width: 100%;\n  height: 50px;\n  padding: 13px;\n  max-width: 400px;\n}\n\n.").concat(_classes.classes.anchorCheckbox, " {\n  display: inline-block;\n  border: 2px solid rgba(0,0,0,0.2);\n  border-radius: 3px;\n  height: 24px;\n  width: 24px;\n  padding-left: 3.5px;\n  cursor: pointer;\n  background-color: ").concat(colors.anchor.checkbox, ";\n}\n\n.").concat(_classes.classes.anchorText, " {\n  display: inline-block;\n  color: ").concat(colors.anchor.text, ";\n  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n  font-size: ").concat(textStyle.fontSize, ";\n  font-family: ").concat(textStyle.fontFamily, ";\n  font-weight: ").concat(textStyle.fontWeight, ";\n  vertical-align: middle;\n  line-height: 6px;\n  height: 100%;\n  margin-left: 13px;\n}\n\n.").concat(_classes.classes.loading, " {\n  margin: 15px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  min-width: ").concat(width, "px;\n  min-height: ").concat(height, "px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1;\n}\n\n.").concat(_classes.classes.container, " {\n  position: absolute;\n  padding: 15px 15px 0px 15px;\n  min-width: ").concat(width + 30, "px;\n  min-height: ").concat(height + 72, "px;\n  background-color: ").concat(colors.card.container, ";\n  box-shadow: 0px -1px 0px -2px rgba(0,0,0,0.2), 0px 2px 9px 0px rgba(0,0,0,0.14), 0px 5px 9px 0px rgba(0,0,0,0.15);\n  margin-top: -").concat(height + 110, "px;\n}\n\n@media only screen and (max-width: 400px) {\n  .").concat(_classes.classes.container, " {\n    margin-left: -13px;\n  }\n}\n\n.").concat(_classes.classes.slider, " {\n  margin-left: 15px;\n  margin-top: 15px;\n  position: absolute;\n  left: 5px;\n  top: 0;\n}\n\n.").concat(_classes.classes.refresh, " {\n  margin-top: 18px;\n  margin-right: 18px;\n  position: absolute;\n  top: 0;\n  right: 0;\n  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);\n  width: 20px;\n  height: 20px;\n  background-color: ").concat(colors.card.control.background, ";\n  cursor: pointer;\n  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n  border-radius: 50%;\n  display: flex;\n  padding-top: 1px;\n  padding-left: 1px;\n  align-items: center;\n  justify-content: center;\n}\n\n.").concat(_classes.classes.refresh, ":hover {\n  background-color: ").concat(colors.card.control.active, ";\n  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);\n}\n\n.").concat(_classes.classes.control, " {\n  position: absolute;\n  top: 0;\n  left: 0;\n  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);\n  width: 30px;\n  height: 30px;\n  background-color: ").concat(colors.card.control.background, ";\n  cursor: pointer;\n  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding-top: 1px;\n}\n\n.").concat(_classes.classes.control, ":hover {\n  background-color: ").concat(colors.card.control.active, ";\n  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);\n}\n\n.").concat(_classes.classes.controlContainer, " {\n  margin-top: 7px;\n  position: relative;\n  height: 44px;\n}\n\n.").concat(_classes.classes.controlTrack, " {\n  box-shadow: inset 0px 0px 20px 0px rgba(0,0,0,0.2);\n  position: absolute;\n  top: 3px;\n  left: 0;\n  height: 24px;\n  background-color: ").concat(colors.card.track.background, ";\n  border-radius: 12px;\n}\n\n.").concat(_classes.classes.controlMask, " {\n  box-shadow: inset 0px 0px 20px 0px rgba(0,0,0,0.2);\n  position: absolute;\n  top: 3px;\n  left: 0;\n  width: 0;\n  height: 24px;\n  background-color: ").concat(colors.card.track.active, ";\n  border-radius: 12px;\n  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n}\n\n.").concat(_classes.classes.controlText, " {\n  color: ").concat(colors.card.track.text, ";\n  padding-left: 20px;\n  position: absolute;\n  top: 3px;\n  left: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 24px;\n  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;\n  font-size: ").concat(textStyle.fontSize, ";\n  font-family: ").concat(textStyle.fontFamily, ";\n  font-weight: ").concat(textStyle.fontWeight, ";\n  line-height: 1;\n}\n\n\n.").concat(_classes.classes.noSelect, " {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -user-select: none;\n}\n");
};

exports.style = style;