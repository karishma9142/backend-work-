import express from "express";
import * as z from "zod"; 
import jwt from "jsonwebtoken";
const app = express();
const JWT_SECRET = "karishmqwertyuiop";
app.use(express.json());
const users =[];
const signupschema = z.object({ 
    username: z.string().email("enter valid email"),
    password: z.string().min(6,"enter at least 6 characters")
  });
app.post("/signup" , function(req,res){
    const result = signupschema.safeParse(req.body);
    if(!result.success){
        return res.status(200).send(null);
    }
    else(
        res.json({
            msg : "you are signup successfully"
        })
    )
})
app.listen(3000);