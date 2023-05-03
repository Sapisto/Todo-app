"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const model_1 = require("../src/todo/model");
describe("test create route", () => {
    const todo = {
        title: "Create todo",
    };
    test("Should have key record and msg when created", async () => {
        const mockCreateTodo = jest.fn(() => todo);
        jest
            .spyOn(model_1.TodoInstance, "create")
            .mockImplementation(() => mockCreateTodo());
        const res = await supertest_1.default(app_1.default).post("/api/v1/create").send(todo);
        expect(mockCreateTodo).toHaveBeenCalledTimes(1);
        expect(res.body).toHaveProperty("msg");
        expect(res.body).toHaveProperty("record");
    });
    test("Should handle exception", async () => {
        const mockCreateTodo = jest.fn(() => {
            throw "error";
        });
        jest
            .spyOn(model_1.TodoInstance, "create")
            .mockImplementation(() => mockCreateTodo());
        const res = await supertest_1.default(app_1.default).post("/api/v1/create").send(todo);
        expect(mockCreateTodo).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
            msg: "fail to create",
            status: 500,
            route: "/create",
        });
    });
    test("Should handle request param", async () => {
        const res = await supertest_1.default(app_1.default).post("/api/v1/create").send({});
        expect(res.body).toEqual({
            msg: "The title value should not be empty",
            param: "title",
            location: "body",
        });
    });
});
describe("test read pagination  route", () => {
    const todo = {
        title: "Create todo",
    };
    test("Should return array of todo", async () => {
        const mockReadAllTodo = jest.fn(() => [todo]);
        jest
            .spyOn(model_1.TodoInstance, "findAll")
            .mockImplementation(() => mockReadAllTodo());
        const res = await supertest_1.default(app_1.default).get("/api/v1/read?limit=5");
        expect(mockReadAllTodo).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual([todo]);
    });
    test("Should handle exception", async () => {
        const mockCreateTodo = jest.fn(() => {
            throw "error";
        });
        jest
            .spyOn(model_1.TodoInstance, "findAll")
            .mockImplementation(() => mockCreateTodo());
        const res = await supertest_1.default(app_1.default).get("/api/v1/read?limit=5");
        expect(mockCreateTodo).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
            msg: "fail to read",
            status: 500,
            route: "/read",
        });
    });
    test("Should handle request query", async () => {
        const res = await supertest_1.default(app_1.default).get("/api/v1/read?limit=0");
        expect(res.body).toEqual({
            value: "0",
            msg: "The limit value should be number and between 1-10",
            param: "limit",
            location: "query",
        });
    });
});
