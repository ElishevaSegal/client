import { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { inputsValueObj } from "./inputsValueObj";
import { editProfileNormalize } from "./editProfileNormalize";
import { editProfileSubmit } from "./editProfileSubmit";
import ROUTES from "../../routes/ROUTES";
import { getToken } from "../../service/storageService";
import { jwtDecode } from "jwt-decode";
import { AccountCircle } from "@mui/icons-material";
import ImageUpload from "../../components/imageInput";
import ProfileImage from "../../components/profileImage";

const EditProfile = () => {
  const navigate = useNavigate();
  const urlRef = useRef();
  const [errorsState, setErrorsState] = useState(null);
  const [inputsValue, setInputsValue] = useState(inputsValueObj);
  const { userId } = useParams();
  let token = getToken();
  let idFromToken = jwtDecode(token)._id;
  useEffect(() => {
    axios
      .get(`/users/${idFromToken}`)
      .then(({ data }) => {
        setInputsValue(editProfileNormalize(data.user));
        //console.log(inputsValue.url);
      })

      .catch((err) => {
        console.log(err);
        toast.info("Error from server, can't get your profile to edit", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }, []);
  const handleInputsChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleNavigate = () => {
    navigate(ROUTES.PROFILE);
  };
  const handleEditProfile = (event) => {
    event.preventDefault();
    const childState = urlRef.current.getChildState();

    editProfileSubmit(
      inputsValue,
      setErrorsState,
      navigate,
      idFromToken,
      childState
    );
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
      <Typography
        component="h1"
        variant="h5"
        sx={{ fontSize: { xs: "2.5rem", md: "4rem" } }}
      >
        Edit Profile
      </Typography>

      <Box
        component="form"
        noValidate
        onSubmit={handleEditProfile}
        sx={{ mt: 3, mb: 7, width: { xs: "90vw", md: "50vw" } }}
      >
        <Grid container spacing={2}>
          <ProfileImage url={inputsValue.url} ref={urlRef} />
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
            />
            {errorsState && errorsState.last && (
              <Alert severity="warning">{errorsState.last}</Alert>
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
            />
            {errorsState && errorsState.phone && (
              <Alert severity="warning">{errorsState.phone}</Alert>
            )}
          </Grid>

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
            />
            {errorsState && errorsState.houseNumber && (
              <Alert severity="warning">{errorsState.houseNumber}</Alert>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item lg={8} md={8} sm={8} xs>
            <Button
              variant="outlined"
              sx={{ mt: 2, width: "100%", ml: "0%" }}
              onClick={handleEditProfile}
            >
              Update Changes
            </Button>
          </Grid>
          <Grid item xs>
            <Link to={ROUTES.PROFILE}>
              <Button
                variant="outlined"
                sx={{
                  mt: 2,
                  width: "100%",
                  ml: "0%",
                }}
                onClick={handleNavigate}
              >
                Discard Changes
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end"></Grid>
      </Box>
    </Box>
  );
};
export default EditProfile;