import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import DirectionsIcon from "@mui/icons-material/Directions";

export default function AnimalSearch() {
  return (
    <Paper component="form" className="flex align-items-center w-4/6">
      <IconButton type="button" aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        className="grow"
        placeholder="Search an animal"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}
