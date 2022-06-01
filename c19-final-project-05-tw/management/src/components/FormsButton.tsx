import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddCheckListForm from "./AddCheckListForm";
import { useState } from "react";
import styles from "../css/CreateProject.module.css";
import ProjectForm from "./AddProjectForm";
import { Box } from "@mui/material";
import { NoteAdd } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { IRootState } from "../redux/store";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

/* Function Below  */
export default function CreateForm({ pathname }: any) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userLayerName = useSelector(
    (state: IRootState) => state.auth.userLayerName
  );

  return (
    <>
      {userLayerName === "admin" ? (
        <>
          <Box
            sx={{
              position: "fixed",
              left: "5%",
              bottom: "10%",
              borderRadius: "55px",
              zIndex: 999,
            }}
          >
            <IconButton
              aria-label="delete"
              size="large"
              className={styles.display}
              onClick={handleClickOpen}
            >
              <NoteAdd />
            </IconButton>
          </Box>

          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            maxWidth={false}
            open={open}
            sx={{
              backgroundColor: "black",
            }}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              {pathname === "/" ? (
                <div> Create Project</div>
              ) : (
                <div>Add CheckList</div>
              )}
            </BootstrapDialogTitle>
            <DialogContent dividers>
              {pathname === "/" ? (
                <ProjectForm handleClose={handleClose} />
              ) : pathname === "projectDetail" ? (
                <AddCheckListForm />
              ) : null}
            </DialogContent>
          </BootstrapDialog>
        </>
      ) : null}
    </>
  );
}
