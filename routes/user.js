const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const bcrypt = require('bcrypt');
/////user authentication 
//// register
router.post('/register', async(req,res)=>{
    
    data = req.body;
    usr = new User(data);
    salt = bcrypt.genSaltSync(10); // generate a key to hash
    cryptedPass = await bcrypt.hashSync(data.password , salt);
    usr.password = cryptedPass;
    usr.save().then((saved)=>{
    res.status(200).send(saved);})
    .catch((err)=>{
        res.status(400).send(err)
    })
    
    
    
})

router.post('/register', async(req,res)=>{
    try {
        data = req.body;
        usr = new User(data);
        salt = bcrypt.genSaltSync(10);
        cryptedPass = await bcrypt.hashSync(data.password , salt);
        usr.password = cryptedPass;
        u =  usr.save();
        res.status(200).send(u);
    } catch (error) {
        res.status(400).send(error);
    }
})

/////log in 
router.post('/login',async (req,res)=>{
    data = req.body;
    user = await User.findOne({email : data.email})
    if (!user){
        res.status(404).send('email or password invalid')
    }
    else {
        validPassword = await bcrypt.compareSync(data.password,user.password)
        if(!validPassword){
            res.status(401).send('email or password invalid')
        }
        else{
            payload = {
                _id : user._id,
                email : user.email,
                name : user.name
            }
            token = jwt.sign(payload , '1234567') // payload hot fih eli theb men data w '1234567' houwa secret key l token to verify if token is valid or not
            res.status(200).send({mytoken : token})
        }
    }
})
//2eme methode using aasync and await
router.post('/create' , async(req,res)=>{
    try{
        data = req.body;
        usr = new User(data);

        savedUser = await usr.save();

        res.send(savedUser);
    }
    catch (error){
        res.send(error)
    }
})

router.get('/getall' , (req,res)=>{
    User.find()
    .then(
        (users)=>{
            res.send(users);
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
})

router.get('/get' ,async (req,res)=>{
    try {
       users = await User.find(); 
       res.send(users);
    } catch (error) {
        res.send(error)
    }
    
})
//get by cdt
router.get('/getByAge' , async(req,res)=>{
    try {
        users = await User.find({age:22})
        res.send(users);
    } catch (error) {
        res.send(error)
    }
})

//get by id
router.get('/getById/:id' , async (req , res)=>{
    try {
        myid = req.params.id;
       user = await User.findOne({_id:myid})
       res.send(user);
    } catch (error) {
        res.send(error);
    }
})

router.put('/update/:id' ,async (req , res)=> {
    try {
        id = req.params.id;
        newData = req.body;
        updated = await User.findByIdAndUpdate({_id:id},newData)
        res.send(updated)
    } catch (error) {
        res.send(error)
    }
})

router.delete('/delete/:id' ,async (req , res)=> {
    try {
        id = req.params.id;
        user = await User.findOneAndDelete({_id : id})
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})


module.exports = router;