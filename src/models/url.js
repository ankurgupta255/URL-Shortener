const mongoose=require('mongoose');
const validator=require('validator');

const urlSchema=new mongoose.Schema(
	{
		shortlink: {
			type: String,
			unique: true
		},
		longlink: {
			type: String,
			unique: true,
			validate(value){
				if(!validator.isURL(value)){
					throw new Error('URL is invalid')
				}
			}
		},
		customUrl: {
			type: String,
			unique: true
		}
	})

urlSchema.method('generateShortLink', function(customUrl){
	if(customUrl.length){
		var result = customUrl;
	}
	else{
		var result='';
		var characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < 5; i++ ) {
	      result += characters.charAt(Math.floor(Math.random() * charactersLength));
	   }
	}
	return result;
})

urlSchema.static('findByShortLink', async function(shortlink){
	const url=await Url.findOne({shortlink})
	if(!url){
		throw new Error('Unable to find the link')
	}
	return url
})

urlSchema.static('getUrls', async function(){
	const url=await Url.find()
	return url
})

urlSchema.pre('save', async function(next){
	const url=this
	url.shortlink=this.generateShortLink(url.customUrl)
	next()
})

const Url=mongoose.model('Url', urlSchema)

module.exports=Url
