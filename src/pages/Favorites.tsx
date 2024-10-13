import { useState, useEffect } from "react";
import useGetFavoriteAnimalsList from "../hooks/localStorage/useGetFavoriteAnimalsList";
import { AnimalInformation } from "../hooks/useSearchAnimal";
import AnimalsOverview from "../components/AnimalsOverview";

export default function Favorites() {
  const favoriteAnimals = useGetFavoriteAnimalsList();
  const [animals, setAnimals] = useState<AnimalInformation[]>(favoriteAnimals);
  const [notifyFavoriteChange, setNotifyFavoriteChange] = useState<number>(
    Date.now()
  );

  useEffect(() => {
    if (favoriteAnimals().length !== animals.length) {
      setAnimals(favoriteAnimals);
    }
  }, [notifyFavoriteChange, favoriteAnimals, animals.length]);

  return (
    <div className="w-5/6">
      <AnimalsOverview
        animals={animals}
        setNotifyFavoriteChange={setNotifyFavoriteChange}
        allowAnimalAttributeRate={true}
      />
    </div>
  );
}
