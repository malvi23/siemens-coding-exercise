export interface MakerData {
  Make_ID: number;
  Make_Name: string;
}

export interface ModelData {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export interface VehicleTypeData {
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export interface VehicleMakerResponse {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: MakerData[];
}

export interface VehicleModelResponse {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: ModelData[];
}

export interface VehicleTypeResponse {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: VehicleTypeData[];
}
