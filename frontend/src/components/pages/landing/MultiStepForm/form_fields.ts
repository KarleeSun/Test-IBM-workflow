export const BASIC_DETAILS = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
};

export const PROVIDER_BASIC_DETAILS = {
  ...BASIC_DETAILS,
  telephoneNumber: "",
};

export const PRACTICE_ADDRESS = {
  practiceName: "",
  address: "",
  postCode: "",
  positionInPractice: "",
  region: "",
};

export interface PlacementTypeInterface {
  animalTypes: string[];
  otherAnimalTypes: string;
  placementType: string;
}

export const PLACEMENT_TYPE: PlacementTypeInterface = {
  animalTypes: [],
  otherAnimalTypes: "",
  placementType: "",
};

export const ACCOMMODATION_DETAILS = {
  providesAccommodation: "yes",
  isOnSite: "yes",
  information: "",
};

export const CONTRACT_AGREEMENT = {
  agreement: false,
  date: "",
};

export const PROVIDER_APPLICATION_FIELDS = new Map(
  Object.entries({
    ...BASIC_DETAILS,
    telephoneNumber: "",
    ...PRACTICE_ADDRESS,
    ...PLACEMENT_TYPE,
    ...ACCOMMODATION_DETAILS,
    ...CONTRACT_AGREEMENT,
  })
);
