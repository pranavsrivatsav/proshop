const express = require('express')
const dotenv = require('dotenv')

const products = require('./data/products')

const PORT = process.env.PORT || 5000;
const app = express()
dotenv.config()


app.get('/',(req,res)=>{
    res.send('API is running...')
})

app.get('/api/products',(req,res)=>{
    res.json(products)
})

app.get('/api/products/:id',(req,res)=>{
    const product = products.find((product)=>product._id===req.params.id)
    res.json(product)
})

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})