var myApp = angular.module('myApp',[]);

 myApp.controller('appCtrl', ['$scope','$http', function($scope,$http){
 	console.log("Hello World from controller");

//encapsulating the refresh function. 
  var refresh =function(){
     
   	$http.get('/contactlist').success(function(response){
          console.log("I got the data requested");
          $scope.contactlist = response;
          $scope.contact = "";  //<--clears our input box after we call refresh function.

   	});

  };

  refresh(); //activated on page load..

//$scope.addContact refers to addContact function in the index.html addcontact button.
  $scope.addContact = function(){
     console.log($scope.contact) 
     $http.post('/contactlist', $scope.contact).success(function(response){
         console.log(response);
         refresh();

     });
  }; 

  $scope.remove = function(id) {
     console.log(id);
     $http.delete('/contactlist/' + id).success(function(response){
      refresh();
     });
   };
     //sends to the console the id we want to remove.

  $scope.edit = function(id) {
    console.log(id);
    $http.get('/contactlist/' + id).success(function(response) {
      $scope.contact = response;
    });
  };  

  $scope.update = function(){
    console.log($scope.contact._id); 
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
       refresh();
    })
  
  };  


$scope.deselect = function() {
  $scope.contact = "";
}   // This will clear the entry in the input boxes...
 

 
    //dummy data objects going into our index.html table
    // which will later be replaced by mongo database info in our server.js file.
 	
 	// person1 = { name: "Jack", email: "Jack@reacher.com", number: "176-444-1111"};
  //   person2 = { name: "Becky", email: "Becky@sue.com", number: "256-488-222"};

  //   person3 = {
  //   	      name: "Biggy",
  //   	      email: "Berg@asd. com",
  //   	      number:"333-333-3333"
  //   };

//now we create an array with the objects as indices..

  // var contactlist = [person1, person2, person3];

   // $scope.contactlist = contactlist;

 }]); 