import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { useDispatch, useSelector } from "react-redux";
import { IRootState, IRootThunkDispatch } from "../redux/store";
import { addCheckListThunk } from "../redux/submitForm/thunks";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";

export default function AddCheckListForm() {
  const dispatch = useDispatch<IRootThunkDispatch>();
  const param = useParams();
  const { pid } = param;
  const navigate = useNavigate();
  const [inputFields, setInputField] = useState([
    {
      area: "",
      description: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const handleChangeInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const values = [...inputFields];
    //@ts-ignore
    values[index][event.target.name] = event.target.value;
    setInputField(values);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(addCheckListThunk(inputFields, pid, navigate));
  };

  const handleAddField = () => {
    setInputField([
      ...inputFields,
      {
        area: "",
        description: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  //@ts-ignore
  const handleDeleteRows = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputField(values);
  };

  return (
    <>
      <form>
        {inputFields.map((field, index) => (
          <Box
            key={index}
            mb={4}
            sx={{
              padding: "0px 15px 30px 15px",
              border: "outset",
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
              name="area"
              label="Area"
              required={true}
              fullWidth
              value={field.area}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeInput(index, event)
              }
            />
            <TextField
              multiline
              maxRows={3}
              name="description"
              label="Description"
              value={field.description}
              required={true}
              fullWidth
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeInput(index, event)
              }
            />
            <TextField
              name="startDate"
              label="Start Date"
              required={true}
              fullWidth
              InputLabelProps={{ shrink: true, required: true }}
              type="date"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeInput(index, event)
              }
            />
            <TextField
              name="endDate"
              label="Due Date"
              required={true}
              fullWidth
              InputLabelProps={{ shrink: true, required: true }}
              type="date"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeInput(index, event)
              }
            />
          </Box>
        ))}
        <Button
          variant="contained"
          type="submit"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
          sx={{ color: "white", backgroundColor: "#022A54", width: "100%" }}
        >
          Send
        </Button>
      </form>
    </>
  );
}
