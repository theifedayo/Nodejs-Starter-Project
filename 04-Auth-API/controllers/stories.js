const Stories = require('../models/stories')
const express = require('express')
const User = require('../models/users')
const jwt = require('express-jwt')



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

exports.postStory = async (req, res, user)=>{
	try{
		const loginUser = res.locals.user.username
	
	
		const newStory = await new Stories()

		newStory.story= req.body.story
		newStory.user = loginUser


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

exports.updateStory = async (req, res, user)=>{
	try{
		const storyDeets = await Stories.findById(req.params.id)
		const loginUsername = res.locals.user.username
		if(storyDeets.user == loginUsername){
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
		}else{
			res.status(401).json({
				success: false,
				message: "You're unauthorized to make changes to this story"
			})
		}
	}catch(error){
		console.log(error)
		res.status(404).json({
			sucess: false,
			message: 'Story not found'
		})
	}
}


exports.deleteStory = async (req, res, user)=>{
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
