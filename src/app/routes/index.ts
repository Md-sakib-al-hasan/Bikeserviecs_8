import { Router } from "express";
import { BikeRouter } from "../modules/bike/bike.routes";
import { CustomerRouter } from "../modules/customer/customer.routes";
import { ServiceRecordRouter } from "../modules/serviceRecord/serviceRecord.routes";


const router = Router();

const moduleRoutes = [
     {
        path:'/bikes',
        route:BikeRouter,
     },
     {
        path:'/customers',
        route:CustomerRouter,
     },
     {
        path:'/services',
        route:ServiceRecordRouter,
     }

  ];
  
  moduleRoutes.forEach((route) => router.use(route.path, route.route));
  
  export default router