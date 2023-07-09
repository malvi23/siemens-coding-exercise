export const CATEGORIES = {
  vehicles: 'vehicles',
};

export const API_LIST = [
  {
    category: CATEGORIES.vehicles,
    list: {
      getAllVehicleMakers: '/getallmakes',
      getAllVehicleModelsByMakeID: '/GetModelsForMakeId',
      getAllVehicleTypesByMakeID: '/GetVehicleTypesForMakeId',
    },
  },
];
