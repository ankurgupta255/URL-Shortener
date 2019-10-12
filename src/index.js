const express= require('express');
require('./db/mongoose')
const Url=require('./models/url')
const urlRouter=require('./routers/url')

const app=express()
const port=process.env.PORT || 3000

app.use(express.json())

app.get('/',(req,res)=>{
	res.send('Welcome to the URL Shortner')
})

app.use(urlRouter)

app.listen(port, ()=>{
	console.log('Server is running on port '+ port)
})