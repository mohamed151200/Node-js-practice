const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.post("/user", (req, res) => {

    // Read users from JSON file
    const data = fs.readFile("users.json", "utf8");

    // Convert JSON string to JavaScript data
    const users = JSON.parse(data);

    // Get new user from request body
    const newUser = req.body;

    // Check if email already exists
    const existingUser = users.find(
        user => user.email === newUser.email
    );

    if (existingUser) {
        return res.status(409).json({
            message: "Email already exists."
        });
    }

    // Add new user
    users.push(newUser);

    // Write updated data back to JSON file
    fs.writeFile(
        "users.json",
        JSON.stringify(users, null, 2)
    );

    // Send response
    res.json({
        message: "User added successfully."
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
//__________________________________________________________________
app.patch("/user/:id",(req,res)=>{
    const updates=req.body
    const id=Number(req.params.id)
    console.log(id);
    
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);
    const isExist=users.find((user)=>{
           return user["id"]===id
    })
    if(!isExist) {
        return res.status(404).json({
            message: "user not found."
        });
    }
    users.forEach(element => {
        if(element.id===id){
            if("name" in updates)  element.name=updates.name
            if("age" in updates)  element.age=updates.age
            if("email" in updates)  element.email=updates.email


        }
    });
    fs.writeFileSync( "users.json",
        JSON.stringify(users, null, 2))

    res.status(200).json("updated succefully")    
})
//__________________________________________________________________
app.delete("/user{/:id}",(req,res)=>{
    const id= Number(req.params.id)
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);
    const index=users.findIndex(user => user.id === id);
    if(index===-1){
        return res.status(404).json('user not found')
    }
    users.splice(index,1)
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2))
     res.status(200).json('deleted succefully')

})
//__________________________________________________________________
app.get("/user/getByName",(req,res)=>{
    const name=req.query.name
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);
    const result=users.find(user => user.name===name)
    if(result===undefined){
        return res.status(404).json('not found')
    }
    res.status(200).json(result)

})
//__________________________________________________________________

app.get("/user",(req,res)=>{
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);
   
    res.status(200).json(users)

})
//__________________________________________________________________
app.get("/user/filter",(req,res)=>{
    const minAge=req.query.minAge
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);
    const result=users.filter(user => user.age>=minAge)
    if(result===undefined){
        return res.status(404).json('not found')
    }
    res.status(200).json(result)

})
//__________________________________________________________________
app.get("/user/:id",(req,res)=>{
    const id=Number(req.params.id)
    const data = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(data);
    const result=users.find(user => user.id===id)
    if(result===undefined){
        return res.status(404).json('not found')
    }
    res.status(200).json(result)

})