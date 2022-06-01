import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { useDispatch } from "react-redux";
import { IRootThunkDispatch } from "../redux/store";
import { addSubItemThunk } from "../redux/submitForm/thunks";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import { listIdType } from "../interface/model";

export default function CreateSubItemForm({ listId }: listIdType) {
  const dispatch = useDispatch<IRootThunkDispatch>();
  const navigate = useNavigate();
  const [inputFields, setInputField] = useState([
    {
      title: "",
      description: "",
    },
  ]);
  const handleChangeInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const values = [...inputFields];
    //@ts-ignore
    values[index][event.target.name] = event.target.value;
    setInputField(values);
  };
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    //@ts-ignore
    dispatch(addSubItemThunk(inputFields, listId));
  };
  const handleAddField = () => {
    setInputField([
      ...inputFields,
      {
        title: "",
        description: "",
      },
    ]);
  };
  const handleDeleteRows = (index: number) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputField(values);
  };

  return (
    <Box>
      <form>
        {inputFields.map((field, index) => (
          <Box
            key={index}
            mb={4}
            sx={{
              border: "outset",
              padding: "0px 15px 30px 15px",
              borderRadius: "5px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <IconButton
                disabled={inputFields.length === 1}
                onClick={() => {
                  handleDeleteRows(index);
                }}
                sx={{ color: "#F65C5C" }}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton
                onClick={() => handleAddField()}
                sx={{ color: "#59677D" }}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <TextField
              name="title"
              label="Title"
              required={true}
              fullWidth
              value={field.title}
              onChange={(event) => handleChangeInput(index, event)}
            />
            <TextField
              name="description"
              label="Description"
              value={field.description}
              required={true}
              fullWidth
              onChange={(event) => handleChangeInput(index, event)}
            />
          </Box>
        ))}
        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          endIcon={<SendIcon />}
          sx={{ color: "white", backgroundColor: "#022A54", width: "100%" }}
        >
          Send
        </Button>
      </form>
    </Box>
  );
}
