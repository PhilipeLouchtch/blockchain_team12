
var LogisticsNetwork = require('../connector/LogisticsNetwork');


// TODO: rework to parse a JSON file for the test data and upload to Network
class TestMethods {
	constructor(){
		this.truckerData = [];
		this.truckerData.push(JSON.parse(`{
		  "$class": "nl.tudelft.blockchain.logistics.Trucker",
		  "truckerId": "T01",
		  "firstName": "Dick",
		  "lastName": "van der Zee",
		  "adrTraining": "YES",
		  "truckCapacity": "TWENTY",
  		  "rating": {
		    "$class": "nl.tudelft.blockchain.logistics.TruckerRating",
		    "totalPastJobsAccepted": 0,
		    "jobsDelivered": 0
		  },
		  "availability": {
		    "$class": "nl.tudelft.blockchain.logistics.TruckerAvailability",
		    "from": "2018-01-01T00:00:00.000Z",
		    "to": "2019-01-01T00:00:00.000Z"
		  },
		  "allowedDestinations": [
		    "Berlin",
		    "Warsaw"
		  ]
		}`));
		this.truckerData.push(JSON.parse(`{
		  "$class": "nl.tudelft.blockchain.logistics.Trucker",
		  "truckerId": "T02",
		  "firstName": "Izak",
		  "lastName": "Lamme",
		  "adrTraining": "YES",
		  "truckCapacity": "FOURTY",
		  "rating": {
		    "$class": "nl.tudelft.blockchain.logistics.TruckerRating",
		    "totalPastJobsAccepted": 0,
		    "jobsDelivered": 0
		  },
		  "availability": {
		    "$class": "nl.tudelft.blockchain.logistics.TruckerAvailability",
		    "from": "2000-01-01T00:00:00.000Z",
		    "to": "2020-01-01T00:00:00.000Z"
		  },
		  "allowedDestinations": [
		    "Berlin"
		  ]
		}`));
		this.truckerNumber = 0;		

		this.guyData = [];
		this.guyData.push(JSON.parse(`{
			  "$class": "nl.tudelft.blockchain.logistics.ContainerGuy",
			  "containerGuyId": "CTG01",
			  "name": "ECT Euromax"
			}`
		));
		this.guyData.push(JSON.parse(`{
			  "$class": "nl.tudelft.blockchain.logistics.ContainerGuy",
			  "containerGuyId": "CTG02",
			  "name": "Rotterdam World Gateway Logistics"
			}`
		));
		this.guyNumber = 0;	
	}

	testTrucker(resource, factory){
		var trucker = this.truckerData[this.truckerNumber];
		this.truckerNumber++;
		console.log("Initializing trucker - " + trucker.firstName);
		resource.firstName = trucker.firstName;
		resource.lastName = trucker.lastName;
		resource.adrTraining = trucker.adrTraining;
		resource.truckCapacity = trucker.truckCapacity;
		resource.allowedDestinations = trucker.allowedDestinations;

		resource.rating = factory.newConcept("nl.tudelft.blockchain.logistics", "TruckerRating");
		resource.rating.jobsDelivered = trucker.rating.jobsDelivered;
		resource.rating.totalPastJobsAccepted = trucker.rating.totalPastJobsAccepted;
		
		resource.availability = factory.newConcept("nl.tudelft.blockchain.logistics", "TruckerAvailability");
		resource.availability.from = new Date(trucker.availability.from);
		resource.availability.to = new Date(trucker.availability.to);
	    return resource;
	}

	testGuy(resource, factory){
		var guy = this.guyData[this.guyNumber];
		this.guyNumber++;
		console.log("Initializing guy - " + guy.name);
		resource.name = guy.name;
	    return resource;
	}


	CreateTrucker(truckerId){
		const namespace = "nl.tudelft.blockchain.logistics";
		const promise = new LogisticsNetwork().createParticipant(
			namespace, 
			"Trucker", 
			truckerId, 
			(res, factory) => this.testTrucker(res, factory)
		);
		return promise;
	}

	CreateContainerGuy(containerGuyId){
		const namespace = "nl.tudelft.blockchain.logistics";
		const promise = new LogisticsNetwork().createParticipant(
			namespace, 
			"ContainerGuy", 
			containerGuyId, 
			(res, factory) => this.testGuy(res, factory)
		);
		return promise;
	}
}


module.exports = TestMethods;