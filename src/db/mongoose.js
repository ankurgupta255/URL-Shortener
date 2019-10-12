const mongoose=require('mongoose');

mongoose.connect(process.env.CONNECTION_URL,{
	urlNewParser: true,
	useCreateIndex: true
})