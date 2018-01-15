'use strict';
const SimpleBidOnContainerDeliveryJobOffer = require('./SimpleBidOnContainerDeliveryJobOffer');

class ContainerDeliveryJobOfferForList
{
	constructor(obj)
	{
		this.containerDeliveryJobOfferId = obj.containerDeliveryJobOfferId;
		this.containerGuyId = obj.containerGuyId;
		
		this.availableForPickupDateTime = obj.availableForPickupDateTime;
		this.toBeDeliveredByDateTime = obj.toBeDeliveredByDateTime;
		this.destination = obj.destination;
		this.requiredAdrTraining = obj.requiredAdrTraining;

		this.containerBids = obj.containerBids.map(
				(bid) => new SimpleBidOnContainerDeliveryJobOffer(bid)
			);
		
		this.status = obj.status;
		this.canceled = obj.canceled;
	}

	getContainerDeliveryJobOfferId()
	{
		return this.containerDeliveryJobOfferId;
	}

	getContainerGuyId()
	{
		return this.containerGuyId;
	}

	getAvailableForPickupDateTime()
	{
		return this.availableForPickupDateTime;
	}

	getToBeDeliveredByDateTime()
	{
		return this.toBeDeliveredByDateTime;
	}

	getDestination()
	{
		return this.destination;
	}

	getRequiredAdrTraining()
	{
		return this.requiredAdrTraining;
	}

	getContainerBids()
	{
		return this.containerBids;
	}

	getStatus()
	{
		return this.status;
	}

	getCanceled()
	{
		return this.canceled;
	}
}

module.exports = ContainerDeliveryJobOfferForList;