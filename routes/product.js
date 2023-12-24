const express = require('express');

const router = express.Router();

const product = require('../models/product');

const multer = require('multer');
filename = '';
const mystorage = multer.diskStorage({
    destination: './uploads',
    filename : (req , file , redirect)=>{
        let date = Date.now();
        //image/png
        let fl = date + '.' + file.mimetype.split('/')[1]; 
        redirect(null , fl);
        filename = fl;
    }
})
const upload = multer({storage : mystorage});


router.post('/createProd' , upload.any('image') ,async(req , res)=>{
    try{
        data = req.body;
        prod = new product(data);
        prod.image = filename;
        savedProd = await prod.save();
        filename = '';
        res.status(200).send(savedProd);
    }
    catch (error){
        res.status(400).send(error)
    }
})

router.get('/getProd' ,async (req,res)=>{
    try {
       prods = await product.find(); 
       res.status(200).send(prods);
    } catch (error) {
        res.status(400).send(error)
    }
    
})

router.delete('/deleteProd/:id' ,async (req , res)=> {
    try {
        id = req.params.id;
        prod = await product.findOneAndDelete({_id : id})
        res.status(200).send(prod)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/updateProd/:id' ,async (req , res)=> {
    try {
        id = req.params.id;
        newData = req.body;
        updated = await product.findByIdAndUpdate({_id:id},newData)
        res.status(200).send(updated)
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router;