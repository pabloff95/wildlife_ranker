import { ANIMAL_LIST_NAME } from "../../constants/strings";
import { AnimalInformation } from "../useSearchAnimal";

export default function useGetFavoriteAnimalsList() {
  return () => {
    const favoriteAnimals = localStorage.getItem(ANIMAL_LIST_NAME);

    const parsedFavoriteAnimals = favoriteAnimals
      ? JSON.parse(favoriteAnimals)
      : [];

    return parsedFavoriteAnimals.map(
      ({ animal }: { animal: AnimalInformation }) => animal
    );
  };
}
