'use strict';

class ContainerInfo
{
	/**
	 * @param {Object} obj - object containing data required by the ctor (containerId, ownerId, containerSize, containerType, terminalContainerAvailableAt)
	 */
	constructor(obj)
	{
		let requiredParams = ['containerId', 'ownerId', 'containerSize'];
		for (var i = 0; i < requiredParams.length; i++) {
			let param = requiredParams[i];

			if (obj[param] === undefined) {				
				throw new Error(`ContainerInfo missing '${param}' field`);
			}

			this[param] = obj[param];
		}

		// Not used for now, something that we left in for future expandability (like refrigerated containers distinction)
		if (obj.containerType !== undefined) {
			this.containerType = obj.containerType;
		}
		else {
			this.containerType = "BasicContainer";
		}
	}

	getOwnerId()
	{
		return this.ownerId;
	}

	getContainerSize()
	{
		return this.containerSize;
	}

	getContainerType()
	{
		return this.containerType;
	}

	getContainerId()
	{
		return this.containerId;
	}
}

module.exports = ContainerInfo;