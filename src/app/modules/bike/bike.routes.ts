import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BikeValidations } from "./bike.validations";
import { BikeController } from "./bike.controller";

const router = Router();

router.post('/',validateRequest(BikeValidations.bikeSchema),BikeController.createBike)

router.get('/',BikeController.getAllBikes)

router.get('/:id',BikeController.getBikeById)



export const BikeRouter = router;