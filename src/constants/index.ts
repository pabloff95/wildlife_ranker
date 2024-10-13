interface AnimalRate {
  like: number;
  dislike: number;
  notRated: number;
}

export const ANIMAL_LIST_NAME: string = "favoriteAnimals";
export const ANIMAL_RATE: AnimalRate = {
  like: 1,
  dislike: -1,
  notRated: 0,
};
