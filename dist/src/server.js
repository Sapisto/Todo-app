"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = __importDefault(require("./config/database.config"));
const app_1 = __importDefault(require("./app"));
database_config_1.default.sync().then(() => {
    console.log("connect to db");
});
const port = 9000;
app_1.default.listen(port, () => {
    console.log("server is running on port " + port);
});
