import { AnimalInformation } from "../hooks/useSearchAnimal";
import Alert from "@mui/material/Alert";
import AnimalOvervierwCard from "./AnimalOverviewCard";
import { Dispatch, SetStateAction } from "react";

interface AnimalsOverviewProps {
  animals: AnimalInformation[];
  allowAnimalAttributeRate: boolean;
  setNotifyFavoriteChange?: Dispatch<SetStateAction<number>>;
  sectionClassName?: string;
}

export default function AnimalsOverview({
  animals,
  sectionClassName,
  allowAnimalAttributeRate,
  setNotifyFavoriteChange,
}: AnimalsOverviewProps) {
  if (animals.length === 0) {
    return (
      <Alert severity="warning" className="w-full">
        No animals were found!
      </Alert>
    );
  }

  return (
    <section
      className={`w-full flex flex-row flex-wrap mx-auto justify-center gap-4 ${
        sectionClassName ?? ""
      }`}
    >
      {animals.map((animal) => {
        return (
          <AnimalOvervierwCard
            animal={animal}
            key={animal._id}
            setNotifyFavoriteChange={setNotifyFavoriteChange}
            allowAnimalAttributeRate={allowAnimalAttributeRate}
          />
        );
      })}
    </section>
  );
}
