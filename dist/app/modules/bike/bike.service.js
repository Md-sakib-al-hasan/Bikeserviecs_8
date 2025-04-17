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
exports.BikeService = void 0;
const prismaclient_1 = require("../../utils/prismaclient");
const appError_1 = __importDefault(require("../../errors/appError"));
const http_status_1 = __importDefault(require("http-status"));
const createBikeDB = (bike) => __awaiter(void 0, void 0, void 0, function* () {
    const isExiteCustomer = yield prismaclient_1.prisma.customer.findUnique({
        where: {
            customerId: bike.customerId
        }
    });
    if (!isExiteCustomer) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Customer not found");
    }
    const newBike = yield prismaclient_1.prisma.bike.create({
        data: bike
    });
    return newBike;
});
const getAllBikeDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const allBikes = yield prismaclient_1.prisma.bike.findMany();
    return allBikes;
});
const getBikeDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isexitebike = yield prismaclient_1.prisma.bike.findUnique({
        where: {
            bikeId: id
        }
    });
    if (!isexitebike) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Bike not found");
    }
    const bike = yield prismaclient_1.prisma.bike.findUnique({
        where: {
            bikeId: id
        }
    });
    return bike;
});
exports.BikeService = {
    createBikeDB,
    getAllBikeDB,
    getBikeDB
};
