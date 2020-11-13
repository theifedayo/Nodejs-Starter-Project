var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const Employee = require('../models/employee.model')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('employee/addOrEdit');
});

router.post('/', function(req, res, next) {
	if(req.body._id == '')
		insertRecord(req, res)
	else
		updateRecord(req, res)	
});

router.get('/list', (req, res)=>{
	Employee.find((err, docs)=>{
		if(!err){
			res.render('employee/list',{
				list: docs
			})
		}else{
			console.log('Error in retrieving the documents')
		}
	})
})

router.get('/:id', function(req, res){
	Employee.findById(req.params.id, (err, doc)=>{
		if(!err){
			res.render('employee/addOrEdit',{
				employee: doc
			})
		}
	})
})


router.get('/delete/:id', function(req, res){
	Employee.findByIdAndRemove(req.params.id,(err, doc)=>{
		if(!err){
			res.redirect('/list')
		}
		else{ console.log('Error in deleting ' + err)}
	})
})




const insertRecord = (req, res) =>{
	var employee = new Employee()
	employee.fullName = req.body.fullName
	employee.email = req.body.email
	employee.mobile = req.body.mobile
	employee.city = req.body.city
	employee.save((err, doc)=>{
		if (!err)
			res.redirect('/list')
		else{
			if (err.name == 'ValidationError'){
				handleValidationError(err, req.body)
				res.render('employee/addOrEdit',{
					employee: req.body
				})
			}
			console.log('Error during the record insertion :'+ err)
		}
	})
}

const updateRecord = (req, res)=>{
	Employee.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc)=>{
		if(!err){ res.redirect('list')}
		else{
			if (err.name == 'ValidationError'){
				handleValidationError(err, req.body)
				res.render('employee/addOrEdit',{
					employee: req.body
				})
			
			}else {
				console.log('Error during record update')
			}
		}
	})
}

const handleValidationError = (err, body)=>{
	for(field in err.errors){
		switch(err.errors[field].path){
			case 'fullName':
				body['fullName'] = err.errors[field].message
				break
			default:
				break
		}
	}
}



module.exports = router;

