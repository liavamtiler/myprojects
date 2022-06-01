import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { IRootThunkDispatch } from "../redux/store";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ISubCon } from "../interface/model";
import { useNavigate } from "react-router-dom";
import { addProjectInfo } from "../api/FormDataSubmit";

type Inputs = {
  projectCode: string;
  title: string;
  Location: string;
  contactPerson: string;
  buildingType: string;
  EstimatedProjectCost: string;
  description: string;
  startDate: string;
  endDate: string;
  subConArr: number[];
};

type IProps = {
  handleClose: () => void;
};

/* Project Form */
function ProjectForm({ handleClose }: IProps) {
  const dispatch = useDispatch<IRootThunkDispatch>();
  const { control, handleSubmit, watch, setValue } = useForm<Inputs>({
    defaultValues: {
      projectCode: "",
      title: "",
      Location: "",
      contactPerson: "",
      buildingType: "",
      EstimatedProjectCost: "",
      description: "",
      startDate: "",
      endDate: "",
      subConArr: [],
    },
  });
  const sunConArr = watch("subConArr");

  /*SubCons Function */
  const [subCons, setSubCon] = useState<Array<ISubCon>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`${process.env.REACT_APP_API}/getAllSubCon/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();
      setSubCon(result);
    };

    fetchData();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    const resp = await addProjectInfo(
      data.title,
      data.projectCode,
      data.Location,
      data.contactPerson,
      data.buildingType,
      data.EstimatedProjectCost,
      data.description,
      data.startDate,
      data.endDate,
      data.subConArr
    );
    if (resp.status === 200) {
      handleClose();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Controller
            name="projectCode"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Project Code"
                size="small"
                margin="normal"
              />
            )}
          />
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Project title"
                size="small"
                margin="normal"
              />
            )}
          />
          <Controller
            name="contactPerson"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Contact Person"
                size="small"
                margin="normal"
              />
            )}
          />{" "}
          <Controller
            name="buildingType"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Building Type"
                size="small"
                margin="normal"
              />
            )}
          />{" "}
          <Controller
            name="Location"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Location"
                size="small"
                margin="normal"
              />
            )}
          />{" "}
          <Controller
            name="EstimatedProjectCost"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Estimated Project Cost"
                size="small"
                margin="normal"
              />
            )}
          />{" "}
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Description"
                size="small"
                margin="normal"
              />
            )}
          />
          <Controller
            name="startDate"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Scheduled Project Start "
                size="small"
                margin="normal"
                type="date"
              />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                placeholder="Completion "
                size="small"
                margin="normal"
                type="date"
              />
            )}
          />
          <Select
            fullWidth
            multiple
            defaultValue={[]}
            value={sunConArr}
            onChange={(e) => setValue("subConArr", e.target.value as number[])}
          >
            {subCons.map((subCon) => (
              <MenuItem key={subCon.id} value={subCon.id}>
                {subCon.company}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: "30px",
            width: "100%",
            color: "white",
            backgroundColor: "#022A54",
          }}
        >
          Submit
        </Button>
      </form>
    </>
  );
}

export default ProjectForm;
