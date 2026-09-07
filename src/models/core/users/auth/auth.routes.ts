import { Router } from "express";
import {login, register} from "./auth.controller.js";
import { validateBody } from "../../../../middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { createUpload } from "../../../../middleware/upload.middleware.js";


const router = Router();
const userUpload = createUpload("users");

console.log("i am in route !");
router.post("/register",userUpload.single("file"), validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);

export default router;


/*User avatar
→ single

Restaurant logo
→ single

Restaurant gallery
→ array
productUload.array("files",8)

Product main image
→ single

Product gallery
→ array

Review attachments
→ array*/