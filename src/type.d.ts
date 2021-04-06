interface ImageData {
  id: string;
  url: string;
}

interface FuelRecord {
  id?: number;
  fuelType: 'gasoline' | 'ethanol';
  fuelAmount: number;
  kilometers: number;
  gasStation: string;
  date: Date;
}

interface Car {
  id: number;
  name: string;
  transmission: string;
  images: ImageData[];
}

type ContextType = {
  loadingSave: boolean;
  setLoadingSave: React.Dispatch<React.SetStateAction<boolean>>;
  loadingFetch: boolean;
  setLoadingFetch: React.Dispatch<React.SetStateAction<boolean>>;
  car: Car;
  setCar: React.Dispatch<React.SetStateAction<Car>>;
  fuelRecords: FuelRecord[];
  setFuelRecords: React.Dispatch<React.SetStateAction<Array<FuelRecord>>>;
  calculateAuthonomy: () => {
    gasolineAvg: string | null;
    ethanolAvg: string | null;
  };
  saveRecord: (record: FuelRecord) => Promise<FuelRecord>;
  deleteRecord: (id: number) => Promise<Error | undefined>;
};
