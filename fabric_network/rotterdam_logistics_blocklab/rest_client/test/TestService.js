'use strict';

const config = require('config');
const TestDataProvider = require('./TestDataProvider');

const LogisticsNetwork = require('../connector/LogisticsNetwork');

const TruckerService = require('../service/TruckerService');
const ContainerGuyService = require('../service/ContainerGuyService');
const ContainerInfoService = require('../service/ContainerInfoService');
const ContainerDeliveryJobOfferService = require('../service/ContainerDeliveryJobOfferService');

const CreateTruckerCommand = require('../domain/tx/CreateTruckerCommand');

class TestService
{
	runTest()
	{
		return "failure";
	}

	initNetwork()
	{		
		let testDataProvider = new TestDataProvider();
		let containerInfoService = new ContainerInfoService();
		var containerInfoDeliveryJobService = new ContainerDeliveryJobOfferService();

		let handleError = (error) => console.log(error);

		const promises = [];

		for (var i = 0; i < 2; i++) {
			let data = testDataProvider.constructNextTestTrucker();
			let promise = this.createTrucker(data).catch(handleError);
			promises.push(promise);
		}

		for (var i = 0; i < 2; i++) {
			let data = testDataProvider.constructNextTestContainerGuy();
			let promise = this.createContainerGuy(data).catch(handleError);
			promises.push(promise);
		}

		for (var i = 0; i < 2; i++) {
			let data = testDataProvider.constructNextTestContainerInfo();
			let promise = this.createContainerInfo(data).catch(handleError);
			promises.push(promise);
		}

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

		return Promise.all(promises)
			.then(() => this.createContainerDeliveryJobOffer(JSON.parse(data)));
	}

	createTrucker(trucker)
	{
		const service = new TruckerService();
		return service.createTrucker(trucker);
	}

	createContainerGuy(containerGuy)
	{
		const service = new ContainerGuyService();
		return service.createContainerGuy(containerGuy)
	}

	createContainerInfo(containerInfo)
	{
		const service = new ContainerInfoService();
		return service.createContainerInfo(containerInfo);
	}

	createContainerDeliveryJobOffer(containerDeliveryJobOffer)
	{
		var service = new ContainerDeliveryJobOfferService();
		return service.createContainerDeliveryJobOffer(containerDeliveryJobOffer);
	}


}

module.exports = TestService;