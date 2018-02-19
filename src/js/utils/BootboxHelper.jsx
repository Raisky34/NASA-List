var $ = require('jquery');
global.jQuery = require("jquery");
window.$ = $;
var bootbox = require('bootbox');

/**
 * Open confirm dialog
 *
 * @param message   message in confirm dialog
 * @param callBack  confirmation callback. function (result) {...}.
 */
export function confirm(message, callBack) {
    bootbox.confirm(message, callBack)
}