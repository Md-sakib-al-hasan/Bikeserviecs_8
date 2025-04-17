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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRecordService = void 0;
const client_1 = require("@prisma/client");
const prismaclient_1 = require("../../utils/prismaclient");
const createServiceRecordDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prismaclient_1.prisma.service.create({
        data: payload
    });
    return service;
});
const getAllServiceRecordDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prismaclient_1.prisma.service.findMany();
    return service;
});
const getServiceRecordDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield prismaclient_1.prisma.service.findUnique({
        where: {
            serviceId: id
        }
    });
    return service;
});
const updateServiceRecordDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const update = yield prismaclient_1.prisma.$transaction((prismaclient) => __awaiter(void 0, void 0, void 0, function* () {
        yield prismaclient.service.findFirstOrThrow({
            where: {
                serviceId: id
            },
        });
        const updateservices = yield prismaclient.service.update({
            where: {
                serviceId: id
            },
            data: {
                completionDate: new Date()
            }
        });
        return updateservices;
    }));
    return update;
});
const getServiceRecordwithStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const service = yield prismaclient_1.prisma.service.findMany({
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
