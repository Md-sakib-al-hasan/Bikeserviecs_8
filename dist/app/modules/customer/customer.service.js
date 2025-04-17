"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const prismaclient_1 = require("../../utils/prismaclient");
const appError_1 = __importDefault(require("../../errors/appError"));
const http_status_1 = __importDefault(require("http-status"));
const createCustomerDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistCustomer = yield prismaclient_1.prisma.customer.findUnique({
        where: {
            email: payload.email
        }
    });
    if (isExistCustomer) {
        throw new appError_1.default(http_status_1.default.CONFLICT, "customer already exist");
    }
    const newcustomer = yield prismaclient_1.prisma.customer.create({
        data: payload
    });
    return newcustomer;
});
const getAllCustomersDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield prismaclient_1.prisma.customer.findMany();
    return customers;
});
const getCustomerByIdDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistCustomer = yield prismaclient_1.prisma.customer.findUnique({
        where: {
            customerId: id
        }
    });
    if (!isExistCustomer) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "customer not found");
    }
    const customer = yield prismaclient_1.prisma.customer.findUnique({
        where: {
            customerId: id
        }
    });
    return customer;
});
const updateCustomerByIdDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield prismaclient_1.prisma.$transaction((prismaclient) => __awaiter(void 0, void 0, void 0, function* () {
        const isExistCustomer = yield prismaclient.customer.findUnique({
            where: {
                customerId: id
            }
        });
        if (!isExistCustomer) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, "customer not found");
        }
        const updatecustomer = yield prismaclient.customer.update({
            where: {
                customerId: id
            },
            data: payload
        });
        return updatecustomer;
    }));
    return update;
});
const deleteCustomerByIdDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteCustomer = yield prismaclient_1.prisma.$transaction((prismaclient) => __awaiter(void 0, void 0, void 0, function* () {
        const isExistCustomer = yield prismaclient.customer.findUnique({
            where: {
                customerId: id
            }
        });
        if (!isExistCustomer) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, "customer not found");
        }
        const deleteCustomer = yield prismaclient.customer.delete({
            where: {
                customerId: id
            },
        });
        return deleteCustomer;
    }));
    return null;
});
exports.CustomerService = {
    createCustomerDB,
    getAllCustomersDB,
    getCustomerByIdDB,
    updateCustomerByIdDB,
    deleteCustomerByIdDB,
};
