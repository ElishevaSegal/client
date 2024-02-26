import { useRef, useState } from "react";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { inputsValueObj } from "./inputsValueObj";
import { submit } from "./submit";
import ImageUpload from "../../components/imageInput";
import ProfileImage from "../../components/profileImage";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorsState, setErrorsState] = useState(null);
  const [inputsValue, setInputsValue] = useState(inputsValueObj);
  const [thisChecked, setChecked] = useState(false);
  const urlRef = useRef();
  const handleCheckChange = (e) => {
    setChecked(e.target.checked);
  };
  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const childState = urlRef.current.getChildState();
    submit(navigate, inputsValue, setErrorsState, thisChecked, childState);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "60px",
      }}
    >
      <ProfileImage ref={urlRef} />
      {/* <LockOutlinedIcon /> */}

      <Typography
        component="h1"
        variant="h5"
        sx={{ fontSize: { xs: "2.5rem", md: "4rem" } }}
      >
        Sign up
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3, mb: 7, width: { xs: "90vw", md: "50vw" } }}
      >
        <Grid container spacing={2} sx={{ color: "secondary.main" }}>
          <Grid item xs={12} sm={4}>
            <TextField
              autoComplete="given-name"
              name="first"
              required
              fullWidth
              id="first"
              label="First Name"
              autoFocus
              value={inputsValue.first}
              onChange={handleInputsChange}
              sx={{
                "& fieldset": {
                  borderColor: "inputs.default",
                },
                "&:hover fieldset": {
                  borderColor: "primary.dark",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.dark",
                },
              }}
            />
            {errorsState && errorsState.first && (
              <Alert severity="warning">{errorsState.first}</Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              autoComplete="given-name"
              name="middle"
              fullWidth
              id="middle"
              label="Middle Name"
              autoFocus
              value={inputsValue.middle}
              onChange={handleInputsChange}
              sx={{
                "& fieldset": {
                  borderColor: "inputs.default",
                },
                "&:hover fieldset": {
                  borderColor: "primary.dark",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.dark",
                },
              }}
            />
            {errorsState && errorsState.middle && (
              <Alert severity="warning">{errorsState.middle}</Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              id="last"
              label="Last Name"
              name="last"
              autoComplete="family-name"
              value={inputsValue.last}
              onChange={handleInputsChange}
              sx={{
                "& fieldset": {
                  borderColor: "inputs.default",
                },
                "&:hover fieldset": {
                  borderColor: "primary.dark",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.dark",
                },
              }}
            />
            {errorsState && errorsState.last && (
              <Alert severity="warning">{errorsState.last}</Alert>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={inputsValue.email}
              onChange={handleInputsChange}
              sx={{
                "& fieldset": {
                  borderColor: "inputs.default",
                },
                "&:hover fieldset": {
                  borderColor: "primary.dark",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.dark",
                },
              }}
            />
            {errorsState && errorsState.email && (
              <Alert severity="warning">{errorsState.email}</Alert>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={inputsValue.password}
              onChange={handleInputsChange}
              sx={{
                "& fieldset": {
                  borderColor: "inputs.default",
                },
                "&:hover fieldset": {
                  borderColor: "primary.dark",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.dark",
                },
              }}
            />
            {errorsState && errorsState.password && (
              <Alert severity="warning">{errorsState.password}</Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="phone"
              label="Phone"
              id="phone"
              autoComplete="new-phone"
              value={inputsValue.phone}
              onChange={handleInputsChange}
              sx={{
                "& fieldset": {
                  borderColor: "inputs.default",
                },
                "&:hover fieldset": {
                  borderColor: "primary.dark",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.dark",
                },
              }}
            />
            {errorsState && errorsState.phone && (
              <Alert severity="warning">{errorsState.phone}</Alert>
            )}
          </Grid>
          {/* <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="alt"
              label="Alt"
              id="alt"
              autoComplete="new-alt"
              value={inputsValue.alt}
              onChange={handleInputsChange}
              sx={{
                "& fieldset": {
                  borderColor: "inputs.default",
                },
                "&:hover fieldset": {
                  borderColor: "primary.dark",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.dark",
                },
              }}
            />
            {errorsState && errorsState.alt && (
              <Alert severity="warning">{errorsState.alt}</Alert>
            )}
          </Grid> */}

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              name="country"
              label="Country"
              id="country"
              autoComplete="new-country"
              value={inputsValue.country}
              onChange={handleInputsChange}
              sx={{
                "& fieldset": {
                  borderColor: "inputs.default",
                },
                "&:hover fieldset": {
                  borderColor: "primary.dark",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.dark",
                },
              }}
            />
            {errorsState && errorsState.country && (
              <Alert severity="warning">{errorsState.country}</Alert>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              name="city"
              label="City"
              id="city"
              autoComplete="new-city"
              value={inputsValue.city}
              onChange={handleInputsChange}
              sx={{
                "& fieldset": {
                  borderColor: "inputs.default",
                },
                "&:hover fieldset": {
                  borderColor: "primary.dark",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.dark",
                },
              }}
            />
            {errorsState && errorsState.city && (
              <Alert severity="warning">{errorsState.city}</Alert>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              name="street"
              label="Street"
              id="street"
              autoComplete="new-street"
              value={inputsValue.street}
              onChange={handleInputsChange}
              sx={{
                "& fieldset": {
                  borderColor: "inputs.default",
                },
                "&:hover fieldset": {
                  borderColor: "primary.dark",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.dark",
                },
              }}
            />
            {errorsState && errorsState.street && (
              <Alert severity="warning">{errorsState.street}</Alert>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              name="houseNumber"
              label="House Number"
              id="houseNumber"
              autoComplete="new-houseNumber"
              value={inputsValue.houseNumber}
              onChange={handleInputsChange}
              sx={{
                "& fieldset": {
                  borderColor: "inputs.default",
                },
                "&:hover fieldset": {
                  borderColor: "primary.dark",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.dark",
                },
              }}
            />
            {errorsState && errorsState.houseNumber && (
              <Alert severity="warning">{errorsState.houseNumber}</Alert>
            )}
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={thisChecked}
                  onChange={handleCheckChange}
                  color="primary"
                />
              }
              label="Seller account"
              color="primary"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href={ROUTES.LOGIN} variant="body2">
              Already have an account? Log in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegisterPage;