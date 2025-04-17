import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { serviceRecordValidation } from "./serviceRecord.validation";
import { ServiceRecordController } from "./serviceRecord.controller";

const router = Router();

router.post('/',validateRequest(serviceRecordValidation.serviceSchema),ServiceRecordController.createServiceRecord)

router.get('/',ServiceRecordController.getAllServiceRecords)

router.get('/status',ServiceRecordController.getServiceRecordsWithStatus)

router.get('/:id',ServiceRecordController.getServiceRecordById)

router.put('/:id',ServiceRecordController.updateServiceRecordById)




export const ServiceRecordRouter = router;