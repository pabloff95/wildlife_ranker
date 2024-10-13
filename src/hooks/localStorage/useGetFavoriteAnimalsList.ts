import { ANIMAL_LIST_NAME } from "../../constants";
import { AnimalInformation } from "../useSearchAnimal";

export default function useGetFavoriteAnimalsList() {
  return () => {
    const favoriteAnimals = localStorage.getItem(ANIMAL_LIST_NAME);

    const parsedFavoriteAnimals = favoriteAnimals
      ? JSON.parse(favoriteAnimals)
      : [];

    const animalsList = parsedFavoriteAnimals.map(
      ({ animal }: { animal: AnimalInformation }) => animal
    );

    return animalsList.sort((a: AnimalInformation, b: AnimalInformation) =>
      a.name.localeCompare(b.name)
    );
  };
}
