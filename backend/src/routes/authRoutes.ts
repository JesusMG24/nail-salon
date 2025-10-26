import { Router } from "express";
import { Register, Login, Logout } from "../controllers/authControllers";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);

// Check if user is logged in
router.get("/me", auth, (req, res) => {
  if (req.user) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});

export default router;
