import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js"

const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);

router.get("/authenticated",protect,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"user authenticated"
    })
})

export default router;