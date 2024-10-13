import { useState, Dispatch, SetStateAction } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { AnimalInformation } from "../hooks/useSearchAnimal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import useToggleFavoriteAnimal from "../hooks/localStorage/useToggleFavoriteAnimal";
import useIsAnimalInFavoriteList from "../hooks/localStorage/useIsAnimalInFavoriteList";
import AnimalAttribute from "./AnimalAttribute";

interface AnimalOverviewCardProps {
  animal: AnimalInformation;
  allowAnimalAttributeRate: boolean;
  setNotifyFavoriteChange?: Dispatch<SetStateAction<number>>;
}

export default function AnimalOvervierwCard({
  animal,
  allowAnimalAttributeRate,
  setNotifyFavoriteChange,
}: AnimalOverviewCardProps) {
  const { name, scientificName, locations, _id } = animal;

  const [isFavourite, setIsFavourite] = useState<boolean>(
    useIsAnimalInFavoriteList({ _id })
  );

  const toggleFavoriteAnimal = useToggleFavoriteAnimal({ animal });

  const toggleFavorite = () => {
    toggleFavoriteAnimal();
    setIsFavourite(!isFavourite);

    if (typeof setNotifyFavoriteChange === "function") {
      setNotifyFavoriteChange(Date.now());
    }
  };

  return (
    <Card className="min-w-[30%]">
      <CardContent className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="opacity-90">{scientificName}</p>
        <p className="opacity-80 text-sm">{locations.join(" | ")}</p>
        <AnimalAttribute
          animal={animal}
          title="Group:"
          attributeKey="group"
          allowAnimalAttributeRate={allowAnimalAttributeRate}
        />
        <AnimalAttribute
          animal={animal}
          title="Diet:"
          attributeKey="diet"
          allowAnimalAttributeRate={allowAnimalAttributeRate}
        />
        <AnimalAttribute
          animal={animal}
          title="Habitat:"
          attributeKey="habitat"
          allowAnimalAttributeRate={allowAnimalAttributeRate}
        />
        <AnimalAttribute
          animal={animal}
          title="Lifespan:"
          attributeKey="lifespan"
          allowAnimalAttributeRate={allowAnimalAttributeRate}
        />
        <AnimalAttribute
          animal={animal}
          title="Group behavior:"
          attributeKey="groupBehavior"
          allowAnimalAttributeRate={allowAnimalAttributeRate}
        />
      </CardContent>
      <CardActions>
        <IconButton onClick={toggleFavorite}>
          <FavoriteIcon
            className={`${
              isFavourite
                ? "text-red-500 hover:text-gray-500"
                : "text-gray-500 hover:text-red-500"
            }`}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}
