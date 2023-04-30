const express = require('express');
const PORT = process.env.PORT || 5500;
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();


mongoose.connect(`mongodb://root:secret@mongo:27017/products?authSource=admin`)
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

const Product = mongoose.model('Product',{name: String,price:Number});

app.get('/',(req,res)=>{
   return res.send('Welcome to express node js in docker')
})

app.post('/api/products',async (req,res)=>{
    const {name,price} = req.body;
    const product = new Product({name,price});
    const saveProduct = await product.save();
    return res.status(201).json({msg:'product created',data:saveProduct})

})

app.get('/api/products',async (req,res)=>{
    const getProducts = await Product.find();
    return res.status(200).json({msg:'success',data:getProducts})
})

app.get('/api/products/:id',async (req,res)=>{
    const getProduct = await Product.findById(req.params.id);
    return res.status(200).json({msg:'success',data:getProduct})
})

app.listen(PORT,()=>console.log(`Listening on the  port ${PORT}`))