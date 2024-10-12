import { ANIMAL_LIST_NAME } from "../../constants/strings";
import { AnimalInformation } from "../useSearchAnimal";

interface UseToggleFavoriteAnimalProps {
  animal: AnimalInformation;
}

export default function useToggleFavoriteAnimal({
  animal,
}: UseToggleFavoriteAnimalProps): () => void {
  return () => {
    const animalEntry = {
      _id: animal._id,
      animal,
    };

    const favoriteAnimals = localStorage.getItem(ANIMAL_LIST_NAME);

    const parsedFavoriteAnimals = favoriteAnimals
      ? JSON.parse(favoriteAnimals)
      : [];

    const updatedFavoriteAnimals = parsedFavoriteAnimals.filter(
      ({ _id }: { _id: string }) => _id !== animalEntry._id // Remove animal from the original list, if it needs to be added, this will be done aftewards
    );

    const isAnimalAlreadyInList =
      parsedFavoriteAnimals.length > 0 &&
      updatedFavoriteAnimals.length !== parsedFavoriteAnimals.length;

    if (!isAnimalAlreadyInList) {
      // Add animal to the favorites list
      updatedFavoriteAnimals.push(animalEntry);
    }

    localStorage.setItem(
      ANIMAL_LIST_NAME,
      JSON.stringify(updatedFavoriteAnimals)
    );
  };
}
