import { forModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/CardStyleInterpolators';
import React, { createContext, useState } from 'react';
import carApi from '../services/api';

export const CarContext = createContext<ContextType | null>(null);

const CarProvider: React.FC = ({ children }) => {
  const [car, setCar] = useState<Car>({} as Car);
  const [fuelRecords, setFuelRecords] = useState<FuelRecord[]>([]);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);

  const calculateAuthonomy = () => {
    const gasoline: number[] = [];
    const ethanol: number[] = [];

    fuelRecords.forEach(({ fuelType, kilometers, fuelAmount }, index) => {
      if (index > 0) {
        switch (fuelType) {
          case 'gasoline':
            gasoline.push(
              (fuelRecords[index - 1].kilometers - kilometers) / fuelAmount
            );
            break;
          case 'ethanol':
            ethanol.push(
              (fuelRecords[index - 1].kilometers - kilometers) / fuelAmount
            );
          default:
            break;
        }
      }
    });

    const gasAvg =
      gasoline.length < 1
        ? null
        : (gasoline.reduce((acc, cur) => acc + cur) / gasoline.length).toFixed(
            2
          );
    const ethAvg =
      ethanol.length < 1
        ? null
        : (ethanol.reduce((acc, cur) => acc + cur) / ethanol.length).toFixed(2);

    return { gasolineAvg: gasAvg, ethanolAvg: ethAvg };
  };

  const saveRecord = async (record: FuelRecord) => {
    try {
      const { data } = await carApi.post('/fuelRecords', record);
      return data;
    } catch (error) {
      return new Error('Could not save your record. Try again later.');
    }
  };

  const deleteRecord = async (id: number) => {
    try {
      await carApi.delete(`/fuelRecords/${id}`);

      const newRecords = fuelRecords.filter((record) => record.id !== id);
      setFuelRecords(newRecords);
    } catch (error) {
      return new Error('Could not delete your record. Try again later.');
    }
  };

  return (
    <CarContext.Provider
      value={{
        loadingSave,
        setLoadingSave,
        loadingFetch,
        setLoadingFetch,
        car,
        setCar,
        fuelRecords,
        setFuelRecords,
        calculateAuthonomy,
        saveRecord,
        deleteRecord,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarProvider;
