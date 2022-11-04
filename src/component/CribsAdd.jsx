import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import Button from "./common/Button";

const validateAddCribs = yup.object().shape({
  name: yup
    .string()
    .min(2, "Too Short!")
    .max(40, "Too Long!")
    .required("Required"),
  img: yup.string().required("Required"),
  location: yup.string(),
});

const CribsAdd = (props) => {
  const {
    addCribs,
    add_loading,
    updateData,
    updateCribs,
    is_update,
    open,
    close,
  } = props;

  const onSubmit = async (values) => {
    if (is_update) updateCribs(values);
    else addCribs(values);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: is_update
      ? updateData
      : {
          name: "",
          img: "",
          location: "",
        },
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
    validationSchema: validateAddCribs,
  });

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>{is_update ? "Update" : "Create New"} Cribs</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                type="text"
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                value={formik.values.name}
                error={!formik.touched.name && Boolean(formik.errors.name)}
                helperText={!formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image Link"
                variant="outlined"
                type="text"
                onChange={formik.handleChange("img")}
                onBlur={formik.handleBlur("img")}
                value={formik.values.img}
                error={!formik.touched.img && Boolean(formik.errors.img)}
                helperText={!formik.touched.img && formik.errors.img}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                type="text"
                onChange={formik.handleChange("location")}
                onBlur={formik.handleBlur("location")}
                value={formik.values.location}
                error={
                  !formik.touched.location && Boolean(formik.errors.location)
                }
                helperText={!formik.touched.location && formik.errors.location}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: 1 }}>
            <Grid item xs={12}>
              <Button
                type="submit"
                disabled={!formik.isValid}
                variant="contained"
                loading={add_loading}
                fullWidth
              >
                {is_update ? "Update Cribs" : "Add Cribs"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CribsAdd;
