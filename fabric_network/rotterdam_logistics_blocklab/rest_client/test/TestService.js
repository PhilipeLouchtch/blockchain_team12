var config = require('config');
var LogisticsNetwork = require('../connector/LogisticsNetwork');
var TestMethods = require('./TestMethods');
var ContainerDeliveryJobOfferService = require('../service/ContainerDeliveryJobOfferService');
var ContainerInfoService = require('../service/ContainerInfoService');

class TestService {
	/**
		@param {String} TruckerId
		@return {Promise} of a Trucker
	*/
	runTest() {
		return "success";
	}

	async initNetwork(){		
		var methods = new TestMethods();
		await methods.CreateTrucker('1');
		await methods.CreateTrucker('2');

		await methods.CreateContainerGuy("1");
		await methods.CreateContainerGuy("2");

		var containerInfoService = new ContainerInfoService();

		var cont = `{
		  "$class": "nl.tudelft.blockchain.logistics.ContainerInfo",
		  "containerId": "5011",
		  "ownerId": "1",
		  "containerType": "BasicContainer",
		  "containerSize": "TWENTY"
		}`;
		await containerInfoService.CreateContainerInfo(JSON.parse(cont));

		var cont = `{
		  "$class": "nl.tudelft.blockchain.logistics.ContainerInfo",
		  "containerId": "2",
		  "ownerId": "1",
		  "containerType": "BasicContainer",
		  "containerSize": "TWENTY"
		}`;
		await containerInfoService.CreateContainerInfo(JSON.parse(cont));

		var containerInfoDeliveryJobService = new ContainerDeliveryJobOfferService();

		var data = `{
		  "$class": "nl.tudelft.blockchain.logistics.ContainerDeliveryJobOffer",
		  "containerDeliveryJobOfferId": "1249",
		  "containerGuyId": "1",
		  "containerInfoId": "2",
		  "availableForPickupDateTime": "2018-01-15T15:30:21.024Z",
		  "toBeDeliveredByDateTime": "2018-01-20T15:30:21.024Z",
		  "terminalContainerAvailableAt": "",
		  "destination": "Berlin",
		  "requiredAdrTraining": "YES",
		  "containerBids": [],
		  "status": "NEW",
		  "canceled": false
		}`;

		await containerInfoDeliveryJobService.createContainerDeliveryJobOffer(JSON.parse(data));

		var containerInfoDeliveryJobService = new ContainerDeliveryJobOfferService();

		return "object";
	}

	createOffers(){
		var offerService = new ContainerDeliveryJobOfferService();
	}


}

module.exports = TestService;