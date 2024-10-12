import AnimalSearchForm from "../components/AnimalSearchForm";
import { useState } from "react";
import {
  useSearchAnimal,
  UseSearchAnimalReturn,
} from "../hooks/useSearchAnimal";

export default function AnimalSearch() {
  const [query, setQuery] = useState<string>("");
  const animalQuery: UseSearchAnimalReturn = useSearchAnimal({ query });

  return (
    <>
      <AnimalSearchForm setQuery={setQuery} />
    </>
  );
}
