import express from "express"
import { createUser } from "../controllers/userController"
import { jwtCheck } from "../middleware/auth"

const router = express.Router()

router.route("/").post(jwtCheck,createUser)

export default router