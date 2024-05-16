const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

 const productRoutes = require('./api/routes/products');
 const orderRoutes = require('./api/routes/orders');
 const userRoutes = require('./api/routes/user');


mongoose.connect('mongodb://ABHINESHJS:Abhinesh2002@ac-lcwflhf-shard-00-00.fxwwmt6.mongodb.net:27017,ac-lcwflhf-shard-00-01.fxwwmt6.mongodb.net:27017,ac-lcwflhf-shard-00-02.fxwwmt6.mongodb.net:27017/?ssl=true&replicaSet=atlas-7s2cm6-shard-0&authSource=admin&retryWrites=true&w=majority&appName=node-rest-shop').then(()=>{
    console.log('connection made')
}).catch(err=>{
    console.log(err)
})

 app.use(morgan('dev'))
 app.use(  '/uploads',express.static('uploads'));
 app.use(bodyParser.urlencoded({extended:false }));
 app.use(bodyParser.json());
 mongoose.promise = global.promise;

 


app.use('/products', productRoutes);
app.use('/Orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) =>{

    res.header("acces-Control-allow-Orgin","*");
    res.header("acces-Control-allow-Headers","Orgin, x-requested-with, content-type, Accept, Authoriazation");
    console.log("111111111111111111111")
    if (req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE')
        return res.status(200).json({
            
        })
    }
    next()

 });

app.use ((req, res, next) =>{

    const error = new error ('NOT FOUND');
    error.status(404);
    next(error);

})

app.use ((error, req, res, next) => {

    res.status(error.ststus || 500);
    res.json({
        error: {
            message : error.message

        }
    });
    });



module.exports = app;


