import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { AnimalInformation } from "../hooks/useSearchAnimal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import useToggleFavoriteAnimal from "../hooks/localStorage/useToggleFavoriteAnimal";
import useIsAnimalInFavoriteList from "../hooks/localStorage/useIsAnimalInFavoriteList";

interface AnimalOvervierwCardProps {
  animal: AnimalInformation;
}

export default function AnimalOvervierwCard({
  animal,
}: AnimalOvervierwCardProps) {
  const { attributes, name, scientificName, locations, _id } = animal;
  const { groupBehavior, habitat, diet, group, lifespan } = attributes;

  const [isFavourite, setIsFavourite] = useState<boolean>(
    useIsAnimalInFavoriteList({ _id })
  );

  const toggleFavoriteAnimal = useToggleFavoriteAnimal({ animal });

  const toggleFavorite = () => {
    toggleFavoriteAnimal();
    setIsFavourite(!isFavourite);
  };

  return (
    <Card className="min-w-[30%]">
      <CardContent className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="opacity-90">{scientificName}</p>
        <p className="opacity-80 text-sm">{locations.join(" | ")}</p>
        <p>
          <b>Group: </b>
          <span>{group}</span>
        </p>
        <p>
          <b>Diet: </b>
          <span>{diet}</span>
        </p>
        <p>
          <b>Habitat: </b>
          <span>{habitat}</span>
        </p>
        <p>
          <b>Lifespan: </b>
          <span>{lifespan}</span>
        </p>
        <p>
          <b>Group behavior: </b>
          <span>{groupBehavior}</span>
        </p>
      </CardContent>
      <CardActions>
        <IconButton aria-label="favorite" onClick={toggleFavorite}>
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
