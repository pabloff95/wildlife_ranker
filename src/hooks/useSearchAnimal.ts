import { useEffect, useState } from "react";
import { ANIMAL_RATE } from "../constants";

interface AnimalNinjaAPIRawData {
  name: string;
  taxonomy: {
    [key: string]: string;
  };
  locations: string[];
  characteristics: {
    [key: string]: string;
  };
}

interface AnimalAttributeObj {
  value: string;
  rate: number;
}

interface AnimalAttributes {
  groupBehavior: AnimalAttributeObj;
  habitat: AnimalAttributeObj;
  diet: AnimalAttributeObj;
  group: AnimalAttributeObj;
  lifespan: AnimalAttributeObj;
}

interface AnimalInformation {
  _id: string;
  name: string;
  scientificName: string;
  locations: string[];
  attributes: AnimalAttributes;
}

interface UseSearchAnimalProps {
  query: string;
}

interface UseSearchAnimalReturn {
  animalInformation: AnimalInformation[] | null;
  error: string;
  isLoading: boolean;
}

const parseAnimalNinjaAPIResponse = (
  animalsRawData: AnimalNinjaAPIRawData[]
): AnimalInformation[] => {
  return animalsRawData.map((animal) => {
    const { name, taxonomy, locations, characteristics } = animal;

    // The API does not provide a id, so instead here a fake id is created instead, in order to track the animals in the favorite list
    const fakeId = `${name.split(" ").join("_")}_${taxonomy.scientific_name
      .split(" ")
      .join("_")}`;

    const attributes = {
      // Here just a few atrributes listed to meet the requirements of this app
      groupBehavior: {
        value: characteristics?.group_behavior || "-",
        rate: ANIMAL_RATE.notRated,
      },
      habitat: {
        value: characteristics?.habitat || "-",
        rate: ANIMAL_RATE.notRated,
      },
      diet: {
        value: characteristics?.diet || "-",
        rate: ANIMAL_RATE.notRated,
      },
      group: {
        value: characteristics?.group || "-",
        rate: ANIMAL_RATE.notRated,
      },
      lifespan: {
        value: characteristics?.lifespan || "-",
        rate: ANIMAL_RATE.notRated,
      },
    };

    return {
      _id: fakeId,
      name,
      scientificName: taxonomy.scientific_name,
      locations,
      attributes,
    };
  });
};

const useSearchAnimal = ({
  query,
}: UseSearchAnimalProps): UseSearchAnimalReturn => {
  const [animalInformation, setAnimalInformation] = useState<
    AnimalInformation[] | null
  >(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetState = () => {
    setIsLoading(true);
    setAnimalInformation(null);
    setError("");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!query) {
        return;
      }

      resetState();

      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/animals?name=${query}`,
          {
            headers: {
              "X-Api-Key": import.meta.env.VITE_API_NINJAS_API_KEY,
            },
          }
        );

        if (!response.ok) {
          const standarQueryError = "Failed to fetch animals";

          setError(standarQueryError);
          throw new Error(standarQueryError);
        }

        const data = await response
          .json()
          .then((jsonData) => parseAnimalNinjaAPIResponse(jsonData));

        setAnimalInformation(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred");
        }
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return { animalInformation, error, isLoading };
};

export { useSearchAnimal };
export type {
  UseSearchAnimalReturn,
  AnimalInformation,
  AnimalAttributes,
  AnimalAttributeObj,
};
