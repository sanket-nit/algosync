"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var adminController_1 = require("../controllers/adminController");
var verifyJWT_1 = __importDefault(require("../middlewares/verifyJWT"));
var adminRouter = (0, express_1.Router)();
adminRouter.route("/").get(verifyJWT_1.default, adminController_1.getAllUsers);
exports.default = adminRouter;
