import { Router } from "express";
import Joi from "joi";
import Validate from "../middlewares/Validate";
import { authoriseAdmin, authoriseRequester } from "../middlewares/Authorise";
import ManageRequest from "../controllers/Request";

const router = Router();

// Joi validation schema
const schema = {
  createWorkflow: Joi.object({
    workflowType: Joi.string().required(),
    description: Joi.string().required()
  }),
};

router.post("/request", Validate.body(schema.createWorkflow), authoriseRequester, ManageRequest.create);
router.get("/request/me", authoriseRequester, ManageRequest.getRequesterRequests);
router.get("/request", authoriseAdmin, ManageRequest.getAllRequests);


export default router;