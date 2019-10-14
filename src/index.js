const express= require('express');
require('./db/mongoose')
const Url=require('./models/url')
const urlRouter=require('./routers/url')
const cors=require('cors')

const app=express()
const port=process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use(urlRouter)

app.listen(port, ()=>{
	console.log('Server is running on port '+ port)
})