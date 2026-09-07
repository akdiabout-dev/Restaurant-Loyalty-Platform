import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.middleware.js";
import { getProfile } from "./user.controller.js";
import { authorize } from "../../../middleware/authorize.middleware.js";
import { createUpload } from "../../../middleware/upload.middleware.js";


const router = Router();

router.get('/profile', authenticate, getProfile);
router.get('/all', authenticate,authorize, getProfile);

export default router;


/*
Client
  │
  │ multipart/form-data
  │ files: image1.jpg
  │ files: image2.jpg
  ▼
authenticate
  │
  ▼
authorize(PRODUCT_MEDIA_CREATE)
  │
  ▼
productUpload.array("files", 5)
  │
  ├─ check size
  ├─ generate filenames
  ├─ save files
  │     ↓
  │  uploads/products/
  │
  └─ create req.files
        │
        ▼
productController.addMedia
        │
        ▼
productService
        │
        ▼
ProductMedia records in DB*/