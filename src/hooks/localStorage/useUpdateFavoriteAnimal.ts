import { AnimalInformation } from "../useSearchAnimal";
import { ANIMAL_LIST_NAME } from "../../constants";

interface UseUpdateFavoriteAnimalProps {
  animal: AnimalInformation;
}

export default function useUpdateFavoriteAnimal({
  animal,
}: UseUpdateFavoriteAnimalProps): () => void {
  return () => {
    const animalEntry = {
      _id: animal._id,
      animal,
    };

    const favoriteAnimals = localStorage.getItem(ANIMAL_LIST_NAME);

    const parsedFavoriteAnimals = favoriteAnimals
      ? JSON.parse(favoriteAnimals)
      : [];

    const updatedAnimalsList = parsedFavoriteAnimals.filter(
      ({ _id }: { _id: string }) => _id !== animalEntry._id
    );

    if (updatedAnimalsList.lenght === parsedFavoriteAnimals.length) {
      // The animal was not in the list
      return;
    }

    updatedAnimalsList.push(animalEntry);

    localStorage.setItem(ANIMAL_LIST_NAME, JSON.stringify(updatedAnimalsList));
  };
}
