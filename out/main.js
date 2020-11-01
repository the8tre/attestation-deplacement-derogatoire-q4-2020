"use strict";

require("bootstrap/dist/css/bootstrap.min.css");

require("../css/main.css");

require("./icons");

require("./check-updates");

var _formUtil = require("./form-util");

var _facebookUtil = require("./facebook-util");

var _util = require("./util");

var _form = require("./form");

(0, _facebookUtil.warnFacebookBrowserUserIfNecessary)();
(0, _form.createForm)();
(0, _formUtil.prepareForm)();
(0, _util.addVersion)(process.env.VERSION);