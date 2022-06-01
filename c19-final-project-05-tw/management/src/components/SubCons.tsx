import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useEffect, useState } from "react";

import { ISubCon } from "../interface/model";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/*SubCons Function */
export default function SubCons() {
  const [subCons, setSubCon] = useState<Array<ISubCon>>([]);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  /* getALl SubCon Company */
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_API!;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${REACT_APP_BACKEND_URL}/getAllSubCon/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();
      /* DEBUG */
      setSubCon(result);
    };
    fetchData();
  }, []);

  /* DOM */
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {subCons.map((subCon) => (
            <MenuItem key={subCon.id} value={subCon.id}>
              {subCon.company}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
