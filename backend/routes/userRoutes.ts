import express from "express"
import { createUser, updateUser } from "../controllers/userController"
import { jwtCheck, jwtParse } from "../middleware/auth"
import { validateUserRequest } from "../middleware/validation"

const router = express.Router()

router.route("/").post(jwtCheck,createUser)
router.route("/").put(jwtCheck,jwtParse,validateUserRequest,updateUser)

export default router