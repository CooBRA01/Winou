const express = require('express')
const app = express()
const cors = require('cors')

/*We dont need cors in production */
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('./config')
let mode = ''


mongoose.connect('mongodb://mongo:27017/vguide-users').
   catch( error => console.log(error) )


app.use(cors())
app.use(express.json())

app.post('/api/register' , async (req , res) => {

    
     
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)
        
         await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })
         
        const token = jwt.sign({
            name: req.body.name ,
            email: req.body.email,
        },'sponge123') 

        res.json({ status: 'ok' , user: token })

    }catch(err){

        res.json({ status: 'error' , error: 'Duplicate email' })
    }
})

app.post('/api/login', async (req , res) => {
    
        const user = await User.findOne({
            email: req.body.email,
           
        })
        if (!user) {
            return res.json({ status: 'error' , user: false })
        }
        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        )
       if(isPasswordValid ){
          
           const token = jwt.sign({
               name: user.name ,
               email: user.email,
           },'sponge123') 

           return res.json({ status: 'ok' , user: token })
       } else {
        return res.json({ status: 'error' , user: false })
    }
       
        
   
} )


app.listen(5000, () => {
    console.log(`APP LISTENING ON 5000`);
})



