import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CustomerSchemavalidation } from "./customer.validations";
import { CustomerController } from "./customer.controller";

const router = Router();

router.post('/',validateRequest(CustomerSchemavalidation.userSchema),CustomerController.createCustomer)

router.get('/',CustomerController.getAllCustomers)

router.get('/:id',CustomerController.getCustomerById)

router.put('/:id',CustomerController.updateCustomerById)

router.delete('/:id',CustomerController.deleteCustomerById)

export const CustomerRouter = router;