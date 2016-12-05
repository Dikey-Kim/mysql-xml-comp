var mysql = require('../lib/pool');


var pool = mysql.createPool({
		
	});

pool.getConnection((err, connection) => {
	if (err) {
		console.log(err);
		return;
	}

	connection.query("select user_name from tbl_user where user_id = 'test'", 
			function(err, results, field) {
		
		if (err) {
			console.log(err);
		}
		else {
			console.log(results);
		}
		
		connection.release();
	});
});

pool.query("select user_name from tbl_user where user_id = :id", 
		{id:'test'}, function(err, results, field) {
	
	if (err) {
		console.log(err);
	}
	else {
		console.log("connection-select", results[0].test, field);
	}
});

pool.setXmlMapper('./xml', function(err) {
	if (err) {
		return console.log(err);
	}
	
	pool.selectUserOne({id: 'test'}, function(err, results, field) {
		if (err) {
			console.log(err);
		}
		else {
			console.log("selectUserOne\n" , results);
		}
	});
	
	pool.selectUser(function(err, results, field) {
		if (err) {
			console.log(err);
		}
		else {
			console.log("selectUser\n", results);
		}
	});
	
});

