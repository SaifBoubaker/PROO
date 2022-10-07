import React, { useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../redux/slices/category/categorySlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddCategory(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    title: "",
  };
  const [formValue, setFormValue] = useState(initialState);
  const { title } = formValue;

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory({ formValue, toast, navigate }));
  };

  const state = useSelector((state) => state.category);
  const { appErr, serverErr } = state;

  useEffect(() => {
    appErr && serverErr && toast.error(`${serverErr}-${appErr} `);
  }, [appErr, serverErr]);
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add New Category
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={onInputChange}
                  value={title}
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="New Category"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default AddCategory;
