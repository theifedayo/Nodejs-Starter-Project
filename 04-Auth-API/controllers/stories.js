const Stories = require('../models/stories')



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
		const story = await Stories.create(req.body)

		return res.status(200).json({
			success: true,
			message: 'Data uploaded successfully',
			data: story
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