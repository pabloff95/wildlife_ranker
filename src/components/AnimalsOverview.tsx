import { AnimalInformation } from "../hooks/useSearchAnimal";
import Alert from "@mui/material/Alert";
import AnimalOvervierwCard from "./AnimalOverviewCard";

interface AnimalsOverviewProps {
  animals: AnimalInformation[];
  sectionClassName?: string;
}

export default function AnimalsOverview({
  animals,
  sectionClassName,
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
      className={`flex flex-row flex-wrap mx-auto justify-between gap-y-4 ${sectionClassName}`}
    >
      {animals.map((animal) => {
        return <AnimalOvervierwCard animal={animal} key={animal._id} />;
      })}
    </section>
  );
}
