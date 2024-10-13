import { ANIMAL_LIST_NAME } from "../../constants";
import { AnimalInformation } from "../useSearchAnimal";

interface UseIsAnimalInFavoriteListProps {
  _id: string;
}

export default function useIsAnimalInFavoriteList({
  _id,
}: UseIsAnimalInFavoriteListProps): boolean {
  const favoriteAnimals = localStorage.getItem(ANIMAL_LIST_NAME);

  const parsedFavoriteAnimals = favoriteAnimals
    ? JSON.parse(favoriteAnimals)
    : [];

  return !!parsedFavoriteAnimals.find(
    (animal: AnimalInformation) => animal._id === _id
  );
}
