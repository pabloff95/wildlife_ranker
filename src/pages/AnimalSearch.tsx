import AnimalSearchForm from "../components/AnimalSearchForm";
import { useState, useEffect } from "react";
import {
  useSearchAnimal,
  UseSearchAnimalReturn,
  AnimalInformation,
} from "../hooks/useSearchAnimal";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AnimalsOverview from "../components/AnimalsOverview";
import Button from "@mui/material/Button";

export default function AnimalSearch() {
  const [query, setQuery] = useState<string>("");
  const [animals, setAnimals] = useState<null | AnimalInformation[]>(null);
  const { isLoading, error, animalInformation }: UseSearchAnimalReturn =
    useSearchAnimal({
      query,
    });

  useEffect(() => {
    if (animalInformation) {
      setAnimals(animalInformation);
    }
  }, [animalInformation]);

  return (
    <div className="h-full w-5/6 flex flex-col gap-4 items-center">
      <div className={`w-full ${animals && animals.length > 0 ? "my-24" : ""}`}>
        <AnimalSearchForm setQuery={setQuery} />
        {query === "" && (
          <Alert severity="info" className="w-full mt-2">
            Search for an animal to see their attributes!
          </Alert>
        )}
        {isLoading && (
          <div className="w-full my-12 flex flex-col gap-2">
            <CircularProgress className="mx-auto" />
            <p className="opacity-80 text-md text-center">
              Loading information...
            </p>
          </div>
        )}
        {error && (
          <Alert severity="error" className="w-full mt-2">
            {error}
          </Alert>
        )}
        {animals && animals.length > 0 && !isLoading && (
          <div className="mt-2">
            <Button variant="outlined" onClick={() => setAnimals(null)}>
              Clean search
            </Button>
          </div>
        )}
      </div>
      {animals && !isLoading && (
        <AnimalsOverview
          animals={animals}
          sectionClassName="mb-6"
          allowAnimalAttributeRate={false}
        />
      )}
    </div>
  );
}
