import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AnimalAttribute from "../components/AnimalAttribute";

// Mock the useUpdateFavoriteAnimal hook
jest.mock("../hooks/localStorage/useUpdateFavoriteAnimal", () => {
  return jest.fn(() => jest.fn());
});

test("renders AnimalAttribute component", () => {
  const animal = {
    _id: "Monkey_Macaca_Fascicularis",
    name: "Monkey",
    scientificName: "Macaca Fascicularis",
    locations: [
      "Africa",
      "Asia",
      "Central-America",
      "Oceania",
      "South-America",
    ],
    attributes: {
      groupBehavior: {
        value: "-",
        rate: 0,
      },
      habitat: {
        value: "Tropical forests, grasslands and mountainous plains",
        rate: 0,
      },
      diet: {
        value: "Omnivore",
        rate: 0,
      },
      group: {
        value: "Mammal",
        rate: 1,
      },
      lifespan: {
        value: "10-30 years",
        rate: 0,
      },
    },
  };

  render(
    <AnimalAttribute
      animal={animal}
      title="Group:"
      attributeKey="group"
      allowAnimalAttributeRate={true}
    />
  );

  // Check if the title and attribute value are rendered
  expect(screen.getByText("Group:")).toBeInTheDocument();
  expect(screen.getByText("Mammal")).toBeInTheDocument();

  // Check if the thumbs up and thumbs down icons are rendered and if they status are correctly updated
  const thumbsUpIcon = screen.getByTestId("ThumbUpAltIcon");
  const thumbsDownIcon = screen.getByTestId("ThumbDownIcon");
  expect(thumbsUpIcon).toBeInTheDocument();
  expect(thumbsDownIcon).toBeInTheDocument();

  expect(thumbsUpIcon).toHaveClass("text-blue-500"); // Thumbs up icon has the "liked" state
  expect(thumbsDownIcon).not.toHaveClass("text-blue-500");

  fireEvent.click(thumbsDownIcon);

  expect(thumbsDownIcon).toHaveClass("text-blue-500"); // After the click, the "dislike" state is now selected
  expect(thumbsUpIcon).not.toHaveClass("text-blue-500");

  // Ensure that the updateFavoriteAnimal mock function was called during the click event
  const mockUpdateFavoriteAnimal = require("../hooks/localStorage/useUpdateFavoriteAnimal");
  expect(mockUpdateFavoriteAnimal).toHaveBeenCalledTimes(2); // 1 on mount + 1 for the click event
});
