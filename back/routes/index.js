var express = require('express');
//Import of the backend functions
const UserCont = require('../app/dbcontroller');
const interact = require('../app/interact')
const setData = require('../app/setData')
var router = express.Router();

const SUCCCODE = 200
const ERRCODE = 400

/* GET home page. */
router.get('/', function(req, res) {

});

router.post('/user/new', (req, res) => {
		UserCont.createUser(req.body)
		.then(resp => {
			return res.status(SUCCCODE).json(resp);
		}).catch(err => {
			return res.status(ERRCODE).json(err);
		})
})

router.post('/user', (req, res) => {

		UserCont.getContract({ name: 'medicalRecord' })
		.then(resp => {
			interact.interact(resp.DATA.address)
		.then(contract => {
			console.log(contract)
			return res.status(SUCCCODE).json(contract)
		})
	}).catch(err => {
      console.log(err)
			return res.status(ERRCODE).json(err);
		})
})

router.post('/user/modify', (req, res) => {
	UserCont.getContract({ name: 'medicalRecord' })
	.then(resp => {

		console.log(resp.DATA.address)
		setData.interact(resp.DATA.address, req.body.data)
	.then(contract => {
		console.log("contract " + contract)
		return res.status(SUCCCODE).json(contract)
	})
	}).catch(err => {
		console.log(err)
		return res.status(ERRCODE).json(err);
	})
})
module.exports = router;
