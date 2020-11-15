const Stories = require('../models/stories')
const express = require('express')
const users = require('../models/users')



exports.getStory = async (req, res)=>{
	try{
		const storyList = await Stories.find()
		return res.status(200).json({
			success: true,
			count: storyList.length,
			data: storyList
		})
	}catch(error){
		console.error(error)
		res.status(500).json({ error: 'Server error'})
	}
}

exports.postStory = async (req, res)=>{
	try{
		// const newStory = await Stories.create(
		// 	story= req.body.story,
		// 	user=req.user
		// )
	
		const newStory = await new Stories()

		newStory.story= req.body.story
		newStory.user = req.body.user

		const loginUser = res.locals.user
		console.log(loginUser,'xxxxxxxxxxxxxxxxxx')

		newStory.save((err, result)=>{
			if (err){
				console.error(err)
				res.status(500).json({ error: 'Server errors'})
			}
			return res.status(200).json({
				success: true,
				message: 'Data uploaded successfully',
				data: newStory
			})
		})

		
	}catch(error){
		console.error(error)
		res.status(500).json({ error: 'Server error'})
	}
}


exports.storyDetails = async (req, res)=>{
	try{
		const storyDeets = await Stories.findById(req.params.id)
		return res.status(200).json({
			success: true,
			data: storyDeets
		})
	}catch(error){
		res.status(404).json({
			sucess: false,
			message: 'Story not found'
		})
	}

}

exports.updateStory = async (req, res)=>{
	try{
		const storyDeets = await Stories.findById(req.params.id)
		storyDeets.story = req.body.story
		storyDeets.save((err, result)=>{
			if(err){
				res.status(404).json(err)
			}
			res.status(200).json({
				sucess: true,
				data: storyDeets
			})
		})
	}catch(error){
		res.status(404).json({
			sucess: false,
			message: 'Story not found'
		})
	}
}


exports.deleteStory = async (req, res)=>{
	try{
		const delStory = await Stories.findByIdAndRemove(req.params.id,(err, doc)=>{
			if(err){
				return res.status(404).json({
				sucess: false,
				message: 'Story not found hence not deleted'
			})
			}
			else{
				return res.status(200).json({
				sucess: true,
				message: 'Story deleted successfully'
			})
			}
		})

	}catch(error){
		return res.status(500).json({
			sucess: false,
			message: 'Server error'
		})
	}
}