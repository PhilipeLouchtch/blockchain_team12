const router = require('express').Router();

const TruckerService = require('../service/TruckerService');
const ContainerDeliveryJobService = require('../service/ContainerDeliveryJobService');
const ContainerDeliveryJobOfferService = require('../service/ContainerDeliveryJobOfferService');

function logAndReturnError(res, error)
{
	console.log(error);
	res.status(500).json({error: error});
}

router.get("/:truckerId", (req, res) => {
	const truckerId = req.params.truckerId;

	new TruckerService().getTrucker(truckerId)
		.then((result) => res.json(result))
		.then((error) => logAndReturnError(res, error));
});

// router.get('/preferences/:truckerId', (req, res) =>
// {
// 	new TruckerService().getTruckerPreferences(req.params.truckerId)
// 		.then((truckerPrefs) => logAndReturnError(res, error));
// });

router.get('/bids/:truckerId', (req, res) =>
{
	new TruckerService().getTruckerBids(req.params.truckerId)
		.then((truckerBids) => res.json(truckerBids))
		.catch((error) => logAndReturnError(res, error));
});

router.get('/rating/:truckerId', (req, res) => {
	const truckerId = req.params.truckerId;

	new TruckerService().getRating(truckerId)
		.then((truckerRating) => res.json(truckerRating))
		.catch((error) => logAndReturnError(res, error));
});

router.post('/preferences', (req, res) =>
{
	let truckerId = req.body.truckerId;
	let truckCapacity = req.body.truckCapacity;
	let availableFrom = req.body.availableFrom;
	let availableTo = req.body.availableTo;
	let allowedDestinations = req.body.allowedDestinations;

	new TruckerService()
		.updateTruckerPreferences(truckerId, truckCapacity, availableFrom, availableTo, allowedDestinations)
		.then((result) => res.json(result))
		.catch((error) => logAndReturnError(res, error));
});

router.get('/contractedJobs/:truckerId', (req, res) =>
{
	const truckerId = req.params.truckerId;

	new ContainerDeliveryJobService()
		.retrieveContractedByTruckerId(truckerId)
		.then((results) => res.json(results))
		.catch((error) => logAndReturnError(res, error));
});

router.post('/acceptDelivery/:containerDeliveryJobId/:password', (req, res) => 
{
	const containerDeliveryJobId = req.params.containerDeliveryJobId;
	const arrivalPassword = req.params.password;

	new ContainerDeliveryJobService()
		.acceptDelivery(containerDeliveryJobId, arrivalPassword)
		.then(() => res.status(200).send("delivery accepted"))
		.catch(() => logAndReturnError(res, error));
});

// todo: send bid as body, prevents resending of bid by accident (from broweser history, page reload etc)
router.post("/:containerDeliveryJobOfferId/submitBid/:bidderId/:bidAmount", (req, res) => {
	const containerDeliveryJobOfferId = req.params.containerDeliveryJobOfferId;
	const bidderId = req.params.bidderId;
	const bidAmount = req.params.bidAmount;

	new ContainerDeliveryJobOfferService()
		.submitBid(containerDeliveryJobOfferId, bidderId, bidAmount)
		.then((result) => res.status(200).send("tx submitted successfully")) // TODO: proper status, maybe return the DeliveryJob
		.catch((error) => logAndReturnError(res, error));
});

module.exports = router;