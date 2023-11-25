"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var credentials_1 = __importDefault(require("./middlewares/credentials"));
var auth_1 = __importDefault(require("./routes/auth"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var corsOptions_1 = require("./config/corsOptions");
var dbConfig_1 = require("./config/dbConfig");
var admin_1 = __importDefault(require("./routes/admin"));
var PORT = process.env.PORT || 3500;
var app = (0, express_1.default)();
// Connect to MongoDB
(0, dbConfig_1.connectDb)();
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials_1.default);
// Cross Origin Resource Sharing
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
// built-in middleware to handle urlencoded form data
app.use(express_1.default.urlencoded({ extended: false }));
// built-in middleware for json 
app.use(express_1.default.json());
//middleware for cookies
app.use((0, cookie_parser_1.default)());
// Routes
app.use("/api/auth", auth_1.default);
app.use("/api/admin/", admin_1.default);
mongoose_1.default.connection.once("open", function () {
    console.log("Connected to MongoDB");
    app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
});
