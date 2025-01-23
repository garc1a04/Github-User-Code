import app from "./app.js";

const url = "http://localhost:"
const port = 3000;
app.listen(port,(req,res) =>{console.log(`host in ${url}${port}`)});