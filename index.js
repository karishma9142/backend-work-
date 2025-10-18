import express from "express";
import * as z from "zod"; 
import jwt from "jsonwebtoken";
const app = express();
const JWT_SECRET = "karishmqwertyuiop";
app.use(express.json());
const users =[];


// assgiment 1

const signupschema = z.object({ 
    username: z.string().email("enter valid email"),
    password: z.string().min(6,"enter at least 6 characters")
  });
app.post("/signup" , function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const result = signupschema.safeParse(req.body);
    if(!result.success){
        return res.status(200).send(null);
    }
    if(users.find(u=>username===username)){
        res.json({
            msg : "you are already sign in"
        })
    }
    users.push({
        username : username,
        password : password
    })
    res.json({
        msg : "you are signup successfully"
    })
})
app.post("/signin" , function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    let finduser = users.find(function(u){
        if(u.username === username && u.password === password){
            return true;
        }
        else{
            return false;
        }
    })
    if(finduser){
        const token = jwt.sign({
            username:username
        },JWT_SECRET);
        res.json({
            token : token
        })
    }else{
        res.status(404).json({
            msg : "invalid username and pass"
        })
    }
})

// assigment 2 docode cheaking

// app.get("/me" , function(req,res){
//     const token = req.headers.token;
//     const decoded = jwt.decode(token);
    //    try {
    //     if(decoded){
    //         res.send("decoded succesfully");
    //     }
    //     else{
    //         res.send("invalid token (can not be decoded)");
    //     }  
    //    }catch(err){
    //     res.send("error");
    //    }
// })

// assigment 3 verify cheaking

app.get("/me" , function(req,res){
    const token = req.headers.token;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.send("Valid token ");
      } catch (err) {
        res.send("Invalid or expired token ");
      }
})

app.listen(3000);

