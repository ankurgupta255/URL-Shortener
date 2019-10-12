const mongoose=require('mongoose');
const validator=require('validator');

const urlSchema=new mongoose.Schema(
	{
		shortlink: {
			type: String,
			trim: true,
			unique: true
		},
		longlink: {
			type: String,
			unique: true,
			trim: true,
			validate(value){
				if(!validator.isURL(value)){
					throw new Error('URL is invalid')
				}
			}
		}
	})

urlSchema.method('generateShortLink', function(){
	var result='';
	var characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < 5; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
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

urlSchema.pre('save', async function(next){
	const url=this
	url.shortlink=this.generateShortLink()
	next()
})

const Url=mongoose.model('Url', urlSchema)

module.exports=Url
