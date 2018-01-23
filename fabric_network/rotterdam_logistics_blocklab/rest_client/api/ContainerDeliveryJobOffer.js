'use strict';

const router = require('express').Router();

const ContainerDeliveryJobOfferService = require('../service/ContainerDeliveryJobOfferService');

router.get('/:containerDeliveryJobOfferId/getTruckerBids', (req, res) => {
	const containerDeliveryJobOfferId = req.params.containerDeliveryJobOfferId;

	new ContainerDeliveryJobOfferService()
		.retrieveTruckerBidsForContainer(containerDeliveryJobOfferId)
		.then((result) => res.json(result));
});

router.get('/byId/:id', (req, res) => {
	const id = req.params.id;

	new ContainerDeliveryJobOfferService()
		.retrieveById(id)
		.then((result) => res.json(result));
});

// TODO: remove containerDeliveryJobOfferId, the truckerBidId is enough to identify the jobOffer
router.post("/:containerDeliveryJobOfferId/cancelBid/:truckerBidId", (req, res) => {
	const containerDeliveryJobOfferId = req.params.containerDeliveryJobOfferId;
	const truckerBidId = req.params.truckerBidId;

	new ContainerDeliveryJobOfferService()
		.cancelBid(containerDeliveryJobOfferId, truckerBidId)
		.then((result) => { res.status(200).send("tx submitted successfully"); } ); // TODO: proper status, maybe return the DeliveryJob
});

// TODO: remove containerDeliveryJobOfferId, the truckerBidId is enough to identify the jobOffer
router.post("/:containerDeliveryJobOfferId/acceptBid/:truckerBidId", (req, res) => {
	const containerDeliveryJobOfferId = req.params.containerDeliveryJobOfferId;
	const truckerBidId = req.params.truckerBidId;

	new ContainerDeliveryJobOfferService()
		.acceptBid(containerDeliveryJobOfferId, truckerBidId)
		.then((result) => { res.status(200).send("tx submitted successfully"); } ); // TODO: proper status, maybe return the DeliveryJob
});

router.get('/containerDeliveryJobOffersForTrucker/:truckerId', (req, res) => {
	const truckerId = req.params.truckerId;

	new ContainerDeliveryJobOfferService()
		.getContainerDeliveryJobOffersAvailableForTrucker(truckerId)
		.then((result) => res.json(result));
});

module.exports = router;