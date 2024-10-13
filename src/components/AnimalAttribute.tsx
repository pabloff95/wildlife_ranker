import { useState } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import IconButton from "@mui/material/IconButton";
import { AnimalInformation, AnimalAttributes } from "../hooks/useSearchAnimal";
import { ANIMAL_RATE } from "../constants";
import useUpdateFavoriteAnimal from "../hooks/localStorage/useUpdateFavoriteAnimal";

interface AnimalAttributeProps {
  animal: AnimalInformation;
  title: string;
  attributeKey: keyof AnimalAttributes;
  allowAnimalAttributeRate: boolean;
}

export default function AnimalAttribute({
  animal,
  title,
  allowAnimalAttributeRate,
  attributeKey,
}: AnimalAttributeProps) {
  const [attributeRate, setAttributeRate] = useState<number>(
    animal.attributes[attributeKey].rate
  );

  const updateFavoriteAnimal = useUpdateFavoriteAnimal({ animal });

  const rateAttribute = (rate: number) => {
    const oldRate = animal.attributes[attributeKey].rate;

    const newRate = oldRate === rate ? ANIMAL_RATE.notRated : rate;

    animal.attributes[attributeKey].rate = newRate;

    updateFavoriteAnimal();
    setAttributeRate(newRate);
  };

  return (
    <div className="flex items-center gap-0.5">
      <b>{title}</b>
      <span>{animal.attributes[attributeKey].value}</span>
      {allowAnimalAttributeRate && (
        <div>
          <IconButton onClick={() => rateAttribute(ANIMAL_RATE.like)}>
            <ThumbUpAltIcon
              fontSize="small"
              className={
                attributeRate === ANIMAL_RATE.like ? "text-blue-500" : ""
              }
            />
          </IconButton>
          <IconButton onClick={() => rateAttribute(ANIMAL_RATE.dislike)}>
            <ThumbDownIcon
              fontSize="small"
              className={
                attributeRate === ANIMAL_RATE.dislike ? "text-blue-500" : ""
              }
            />
          </IconButton>
        </div>
      )}
    </div>
  );
}
