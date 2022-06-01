import AddBoxIcon from "@mui/icons-material/AddBox";
import CreateSubItemForm from "./CreateSubItemForm";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { listIdType } from "../interface/model";

export default function SubItemButton({ listId }: listIdType) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        endIcon={<AddBoxIcon />}
        sx={{
          fontSize: "10px",
          margin: "10px auto 5px auto",
          padding: "0px",
          width: "45%",
          bgcolor: "#022A54",
        }}
      >
        Add Subitem
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Create Item"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <CreateSubItemForm listId={listId} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
