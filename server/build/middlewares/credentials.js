"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var allowedOrigins_1 = require("../config/allowedOrigins");
var credentials = function (req, res, next) {
    var origin = req.headers.origin;
    if (origin && allowedOrigins_1.allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
};
exports.default = credentials;
