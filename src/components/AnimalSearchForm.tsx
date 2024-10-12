import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DirectionsIcon from "@mui/icons-material/Directions";

interface AnimalSearchFormProps {
  setQuery: Dispatch<SetStateAction<string>>;
}

export default function AnimalSearchForm({ setQuery }: AnimalSearchFormProps) {
  const [isWrongInput, setIsWrongInput] = useState<boolean>(false);

  const searchAnimal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { userQuery } = Object.fromEntries(
      new window.FormData(event.currentTarget)
    );

    if (!userQuery) {
      setIsWrongInput(true);
      return;
    }

    setIsWrongInput(false);
    setQuery(userQuery.toString());
  };

  return (
    <div className=" w-4/6">
      <Paper
        component="form"
        className="flex align-items-center"
        onSubmit={searchAnimal}
      >
        <IconButton type="button" aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          className="grow"
          name="userQuery"
          placeholder="Search an animal"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" aria-label="directions" type="submit">
          <DirectionsIcon />
        </IconButton>
      </Paper>
      {isWrongInput && (
        <p className="text-red-500 opacity-90">
          Please introduce a valid text!
        </p>
      )}
    </div>
  );
}
