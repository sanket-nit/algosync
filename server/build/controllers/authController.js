"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogout = exports.handleRegister = exports.handleRefreshToken = exports.handleLogin = void 0;
var bcrypt_1 = require("bcrypt");
var jwt = __importStar(require("jsonwebtoken"));
var User_1 = require("../model/User");
/************************ Login ************************/
var handleLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, foundUser, match, accessToken, refreshToken, result, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                if (!username || !password) {
                    return [2 /*return*/, res.status(400).json({ message: "username and password are required" })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                return [4 /*yield*/, User_1.User.findOne({ username: username })];
            case 2:
                foundUser = _b.sent();
                if (!foundUser)
                    return [2 /*return*/, res.sendStatus(401)]; //Unauthorized
                return [4 /*yield*/, (0, bcrypt_1.compare)(password, foundUser.password)];
            case 3:
                match = _b.sent();
                if (!match) return [3 /*break*/, 5];
                accessToken = jwt.sign({ username: foundUser.username }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "10s" });
                refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_ACCESS_TOKEN, { expiresIn: "1d" });
                foundUser.refreshToken = refreshToken;
                return [4 /*yield*/, foundUser.save()];
            case 4:
                result = _b.sent();
                // Creates Secure Cookie with refresh token
                res.cookie("jwt", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000 });
                // Send authorization roles and access token to user
                res.json({ accessToken: accessToken });
                return [3 /*break*/, 6];
            case 5:
                res.sendStatus(401);
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_1 = _b.sent();
                res.status(500).json({ message: err_1.message });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.handleLogin = handleLogin;
/************************ Register  ************************/
var handleRegister = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, duplicateUser, hashedPassword, newUser, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, email = _a.email, password = _a.password;
                if (!username || !email || !password) {
                    return [2 /*return*/, res.status(400).json({ message: "Username, email and password are required" })];
                }
                return [4 /*yield*/, User_1.User.findOne({ username: username })];
            case 1:
                duplicateUser = _b.sent();
                if (duplicateUser) {
                    return [2 /*return*/, res.sendStatus(409)];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, , 6]);
                return [4 /*yield*/, (0, bcrypt_1.hash)(password, 10)];
            case 3:
                hashedPassword = _b.sent();
                newUser = new User_1.User({ username: username, email: email, password: hashedPassword });
                return [4 /*yield*/, newUser.save()];
            case 4:
                _b.sent();
                return [2 /*return*/, res.status(201).json({ success: "New user ".concat(newUser, " created!") })];
            case 5:
                err_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({ message: err_2.message })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.handleRegister = handleRegister;
/************************ Refresh Token ************************/
var handleRefreshToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cookies, refreshToken, foundUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cookies = req.cookies;
                if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
                    return [2 /*return*/, res.sendStatus(401)];
                refreshToken = cookies.jwt;
                return [4 /*yield*/, User_1.User.findOne({ refreshToken: refreshToken }).exec()];
            case 1:
                foundUser = _a.sent();
                if (!foundUser)
                    return [2 /*return*/, res.sendStatus(403)]; //Forbidden
                // evaluate jwt
                jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN, function (err, decoded) {
                    if (err || foundUser.username !== decoded.username)
                        return res.sendStatus(403);
                    var accessToken = jwt.sign({
                        UserInfo: {
                            username: decoded.username,
                        },
                    }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "10s" });
                    res.json({ accessToken: accessToken });
                });
                return [2 /*return*/];
        }
    });
}); };
exports.handleRefreshToken = handleRefreshToken;
var handleLogout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cookies, refreshToken, foundUser, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cookies = req.cookies;
                if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
                    return [2 /*return*/, res.sendStatus(204)];
                refreshToken = cookies.jwt;
                return [4 /*yield*/, User_1.User.findOne({ refreshToken: refreshToken })];
            case 1:
                foundUser = _a.sent();
                if (!foundUser) {
                    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
                    return [2 /*return*/, res.sendStatus(204)];
                }
                foundUser.refreshToken = "";
                return [4 /*yield*/, foundUser.save()];
            case 2:
                result = _a.sent();
                res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
                return [2 /*return*/, res.sendStatus(204)];
        }
    });
}); };
exports.handleLogout = handleLogout;
