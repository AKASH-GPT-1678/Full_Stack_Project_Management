require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3400;
const router = require("./src/routes/router.js");
app.use(express.json());

app.use("/api", router);
app.get("/", (req, res) => {
    res.send("Hello My Name is Manisha koyralla")

});


app.listen(port, () => {
    console.log("Server is awesomely running");
    
    
    
});
