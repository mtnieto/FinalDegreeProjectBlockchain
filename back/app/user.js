// grab the mongoose module
var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called

module.exports = mongoose.model('User', {
	name : {
		type : String,
		required: true
	},
	surname: {
		type: String,
		required: true,
	},
	sex: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	nationality: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	desease: {
		type: String,
		required: true,
	}

});
