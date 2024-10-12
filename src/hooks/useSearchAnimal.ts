import { useEffect, useState } from "react";

interface AnimalInformation {
  name: string;
  taxonomy: {
    [key: string]: string;
  };
  locations: string[];
  characteristics: {
    [key: string]: string;
  };
}

interface UseSearchAnimalProps {
  query: string;
}

interface UseSearchAnimalReturn {
  animalInformation: AnimalInformation[] | null;
  error: string;
  isLoading: boolean;
}

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

        const data = await response.json();
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
export type { UseSearchAnimalReturn, AnimalInformation };
