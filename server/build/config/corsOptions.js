"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
var allowedOrigins_1 = require("./allowedOrigins");
exports.corsOptions = {
    origin: allowedOrigins_1.allowedOrigins,
    optionsSuccessStatus: 200,
};
