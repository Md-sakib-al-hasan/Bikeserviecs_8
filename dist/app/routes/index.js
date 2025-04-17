"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bike_routes_1 = require("../modules/bike/bike.routes");
const customer_routes_1 = require("../modules/customer/customer.routes");
const serviceRecord_routes_1 = require("../modules/serviceRecord/serviceRecord.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/bikes',
        route: bike_routes_1.BikeRouter,
    },
    {
        path: '/customers',
        route: customer_routes_1.CustomerRouter,
    },
    {
        path: '/services',
        route: serviceRecord_routes_1.ServiceRecordRouter,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
