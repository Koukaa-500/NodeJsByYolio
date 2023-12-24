const express = require('express'); // import express 
require('./config/connect');
const app = express();
app.use(express.json());

const productRoute = require('./routes/product');
const userRoute = require('./routes/user');

app.use('/product' , productRoute);
app.use('/user', userRoute);



app.use('/getimage', express.static('./uploads'));
app.listen(3000, ()=> {
    console.log(("server works!"));
}); // to make the server always on (listening and don't stop after every operation )
