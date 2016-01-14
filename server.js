var express = require('express');
var app  = express();             //passing the express module to var app
var mongojs = require('mongojs');  
var db = mongojs('contactlist', ['contactlist']);  
var bodyParser = require('body-parser');

// passing the mongo js module to var db   first param, what mongo db dabatse, second param (what collection)

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json()); 



// *below* this is making a route called "contactlist" and  doing the fnction thereafter
//which is a  console.log. you will see it in your server console.
app.get('/contactlist', function (req, res){
	console.log("I recieved a GET request");


    db.contactlist.find(function (err, docs){
        console.log(docs);
        res.json(docs);
    });

	// /// dummy data database info below
    //replaced by actual mongo db database collection info *above*

	// person1 = { name: "Jack", email: "Jack@reacher.com", number: "176-444-1111"};
 //    person2 = { name: "Becky", email: "Becky@sue.com", number: "256-488-222"};

 //    person3 = {
 //    	      name: "Biggy",
 //    	      email: "Berg@asd.com",
 //    	      number:"333-333-3333"
 //    };

 //     var contactlist = [person1, person2, person3];
 //        //this following line is a response after the above info
 //         // had been "gotten"  The response the data in contactlist
 //           //in JSON FORMAT!

 //     res.json(contactlist);

 //     //looks like the info in the contact list the array, is 
 //     //enacted by the json method of res..
});

app.post('/contactlist', function(req, res){

    console.log(req.body);
 
       db.contactlist.insert(req.body, function(err, doc){
       res.json(doc);
    }); 
});

// delete button function
app.delete('/contactlist/:id', function(req , res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectID(id)}, function (err, doc){
        res.json(doc);
    })
});
 


 app.get('/contactlist/:id', function (req, res){
      var id = req.params.id;
      console.log(id);
   db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
       res.json(doc); 
   }); 

 });

 app.put('/contactlist/:id',function (req, res){
    var id= req.params.id;
    console.log(req.body.name); // to disply in server console.
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
         new: true}, function(err, doc){
            res.json(doc);

    });
 });

 app.listen(3000);
 //allows us to listen on this port we designate.
 console.log("Server now running...");

  