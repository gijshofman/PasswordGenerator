export type dataType = {
	xeliondata: {
		phones: {
			label: string;
			active: boolean;
			id: number;
		}[];
		phonelines: {
			label: string;
			active: boolean;
			id: number;
		}[];
        status: {
			label: string;
            value: string;
            color: string;
			active: boolean;
		}[];
		twinning: 
			{
			label: string;
			value: string;
            active: boolean;
		}[];
		twinactive:
			{
            active: boolean;
		},
        doorschakeling: 
			{
			phonenumber: string;
			active: boolean;
		};
        statusmessage: 
			{
			label: string;
		};
	};
};

export type dataTypeLay = {
	navdata: {
		navmenu: {
			label: string;
			route: string;
		}[];
	},
};

export type phones = {
	label: string;
	active: boolean;
	id: number;
}[];

export type phonelines = {
	label: string;
	active: boolean;
	id: number;
}[];

export type doorschakeling = {
	phonenumber: string;
	active: boolean;
};

export type status = {
	label: string;
    value: string;
    color: string;
	active: boolean;
}[];

export type currentStatus = {
	label: string;
    value: string;
    color: string;
	active: boolean;
};

export type twinning = {
	label: string;
	value: string;
	active: boolean;
}[];

export type currentTwinning = {
	label: string;
	value: string;
	active: boolean;
};

export type navmenu = {
	label: string;
	route: string;
}[];

export type navmenuItem = {
	label: string;
	route: string;
};