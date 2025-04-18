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
exports.ServiceRecordService = void 0;
const client_1 = require("@prisma/client");
const prismaclient_1 = require("../../utils/prismaclient");
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../errors/appError"));
const createServiceRecordDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isbikexits = yield prismaclient_1.prisma.bike.findUnique({
        where: {
            bikeId: payload.bikeId
        }
    });
    if (!isbikexits) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Bike not found");
    }
    payload.status = payload.status === client_1.Status.done || payload.status !== client_1.Status.pending ? payload.status : client_1.Status.in_progress;
    const service = yield prismaclient_1.prisma.serviceRecord.create({
        data: payload
    });
    return service;
});
const getAllServiceRecordDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prismaclient_1.prisma.serviceRecord.findMany();
    return service;
});
const getServiceRecordDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prismaclient_1.prisma.serviceRecord.findUnique({
        where: {
            serviceId: id
        }
    });
    if (!service) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, "Service not found");
    }
    return service;
});
const updateServiceRecordDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield prismaclient_1.prisma.$transaction((prismaclient) => __awaiter(void 0, void 0, void 0, function* () {
        const isexiteService = yield prismaclient.serviceRecord.findUnique({
            where: {
                serviceId: id
            }
        });
        if (!isexiteService) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, "Service not found");
        }
        const compteDate = payload.completionDate ? new Date(payload.completionDate) : new Date();
        const updateservices = yield prismaclient.serviceRecord.update({
            where: {
                serviceId: id
            },
            data: {
                completionDate: compteDate,
                status: client_1.Status.done,
            }
        });
        return updateservices;
    }));
    return update;
});
const getServiceRecordwithStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const service = yield prismaclient_1.prisma.serviceRecord.findMany({
        where: {
            status: {
                in: [client_1.Status.in_progress, client_1.Status.pending]
            },
            serviceDate: {
                lt: sevenDaysAgo
            }
        }
    });
    return service;
});
exports.ServiceRecordService = {
    createServiceRecordDB,
    getAllServiceRecordDB,
    getServiceRecordDB,
    updateServiceRecordDB,
    getServiceRecordwithStatus
};
