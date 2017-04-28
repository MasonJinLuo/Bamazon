var mysql = require("mysql");
var config = require('./config.js');
var inquirer = require("inquirer");
require("console.table");
var indexTracker = "";
var connection = mysql.createConnection(config);

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

// define the listProducts function

function listProducts(){

	connection.query("SELECT * FROM  products", function(err, res) {
		if (err) throw err;

		console.table(res);

	});
}


// run the listProducts function 
listProducts();


//declare function to inquire what the customer wants to buy

function whatDoYouWantToBuy(){

	connection.query("SELECT * FROM  products", function(err, res) {
			if (err) throw err;
		
		inquirer.prompt([
		{
			name: "choices",
			type: "list",
			choices: function(){
	          var choiceArray = [];
	          for (var i = 0; i < res.length; i++) {
	            choiceArray.push(res[i].product_name);
	          }
	          return choiceArray;
	        },
			message: "What do you want to buy?"
	      },

	      {
			name: "howMany",
			type: "input", //need to set a error proof function
			message: "How many do you want to buy?"
	      }

	   ]).then (function(answer) {

	   
		console.log(answer.choices); // eg; returns teddy bear
		console.log(answer.howMany); //eg; returns 2
		// console.log(res.stock_quantity)

		for (var i = 0; i < res.length; i++) {
	           if(res[i].product_name === answer.choices){
	           	console.log([i]);
	           	indexTracker = [i]
	           }
	          } //this look is to get the index of the answer selected

		//select the product and then update the stock
		if ((res[indexTracker].stock_quantity - answer.howMany) < 0){
			console.log("Insufficient quantity!");
			listProducts();
			whatDoYouWantToBuy()
		}

		else{
		connection.query("UPDATE products SET ? WHERE ?" , [{
          stock_quantity: (res[indexTracker].stock_quantity - answer.howMany)
        },{
          product_name: answer.choices
        }], function() {
          console.log("Total: " + ((res[indexTracker].price) * answer.howMany))
          console.log("Your order has been processed!");
          listProducts();
          whatDoYouWantToBuy();
        
        });

		}




		});

	});

}
// calling the whatdoyouwanttobuy function

whatDoYouWantToBuy();