const express = require('./app');
const app = express();
const port = 7070;


express.listen(port, ()=>{
    console.log(`App is listening at port: ${port}`);
})