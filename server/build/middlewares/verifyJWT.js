"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyJWT = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401);
    }
    var token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.SECRET_ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = decoded.username;
        next();
    });
};
exports.default = verifyJWT;
