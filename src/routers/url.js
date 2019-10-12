const express=require('express')
const Url=require('../models/url')
const router= new express.Router()

router.post('/url', async (req,res)=>{
	const url=new Url(req.body)
	try{
		await url.save()
		res.status(201).send({url: url})
	} catch(e){
		res.status(400).send(e)
	}
})

router.get('/:link',async (req,res)=>{
	try{
		const url=await Url.findByShortLink(req.params.link)
		res.status(200).redirect(url.longlink)
	} catch(e){
		res.status(400).send({Error: 'Unable to Find the Link'})
	}
})

module.exports=router