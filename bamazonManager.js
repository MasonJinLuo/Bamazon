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



inquirer.prompt([
    {
      name: "WhatToDo",
      type: "list",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
      message: "What do you want to do?"
    }
]).then (function(answer){


  console.log(answer);


switch(answer.WhatToDo) {

  case "View Products for Sale":
      viewProducts();
      break;

  case "View Low Inventory":
      viewLowInventory();
      break;

  case "Add to Inventory":
      addToInventory();
      break;

  case "Add New Product":
      addNewProduct();
      break;

  }


});


function viewProducts (){

  connection.query("SELECT * FROM  products", function(err, res) {
    if (err) throw err;

    console.table(res);

  });

}


function viewLowInventory (){

connection.query("SELECT * FROM  products WHERE stock_quantity <= 5", function(err, res) {
    if (err) throw err;

    console.table(res);

  });


}


function addToInventory(){

  connection.query("SELECT * FROM  products", function(err, res) {
        if (err) throw err;

  inquirer.prompt([
      {
        name: "addToThisProduct",
        type: "list",
        choices: function(){
              var choiceArray = [];
              for (var i = 0; i < res.length; i++) {
                choiceArray.push(res[i].product_name);
              }
              return choiceArray;
            },
        message: "Which item do you want to add inventory to?"
      },{

        name: "add",
        type: "input",
        message: "How many do you add?"

      }




  ]).then(function(answer) {

    for (var i = 0; i < res.length; i++) {
             if(res[i].product_name === answer.addToThisProduct){
              console.log([i]);
              indexTracker = [i]
             }
            }

      viewProducts ();
      var parsedNumber = parseInt(answer.add);
    connection.query("UPDATE products SET ? WHERE ?" , [{ 
          stock_quantity: (res[indexTracker].stock_quantity + parsedNumber) //might have to parse float because instead of adding integers, it is concatonating the numbers
        },{
          product_name: answer.addToThisProduct
        }], function() {
          console.log("New Inventory: " + (res[indexTracker].stock_quantity));
          console.log("Your Inventory has been added!");
        });

    });

  });
}


function addNewProduct(){

inquirer.prompt([
      {
        name: "product",
        type: "input",
        message: "What is the name of the product?"
      },{

        name: "department",
        type: "input",
        message: "Which department is this item under?"

      },{

        name: "price",
        type: "input",
        message: "What is the price per unit?"

      },{

        name: "stock",
        type: "input",
        message: "What is the stock of this quantity?"

      }

  ]).then(function(answer){

    connection.query("INSERT INTO products SET ?", {
      product_name: answer.product,
      department_name: answer.department,
      price: answer.price,
      stock_quantity: answer.stock
      }, function(err) {
      if (err) throw err;
      console.log("Item was added!");
    });

  });


}


