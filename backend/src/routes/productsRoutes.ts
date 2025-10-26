import { Router } from "express";
import {
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsControllers";
import { auth, requireAuth } from "../middleware/auth";
import multer from "multer";
import path from "path";

// Multer storage with random name + original extension
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const randomName = `${Math.random().toString(36).substring(2, 18)}`;
    cb(null, randomName + ext);
  },
});
const upload = multer({ storage });

const router = Router();

router.get("/", getProducts);
router.post("/", auth, requireAuth, upload.single("image"), postProduct);
router.put("/", auth, requireAuth, upload.single("image"), updateProduct);
router.delete("/", auth, requireAuth, deleteProduct);

export default router;
