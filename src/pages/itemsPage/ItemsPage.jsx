import { Fragment, useEffect, useState } from "react";
import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import nextKey from "generate-my-key";
import ItemComponent from "../../components/ItemComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useSelector } from "react-redux";
import likeItemNormalization from "./likeItemNormalization";
import useQueryParams from "../../hooks/useQueryParams";
import { toast } from "react-toastify";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { textAlign } from "@mui/system";

// const filterValues = {
//   clothing: ["Dress", "Skirt", "Shirt"],
//   accessories: ["belt", "hat"],
// };

const ItemsPage = () => {
  let { category = "", filter = "" } = useQueryParams();
  category = category.toLowerCase();
  filter = filter.toLowerCase();
  const [items, setItems] = useState([]);
  console.log({ items, category, filter });

  useEffect(() => {
    axios
      .get("/items")
      .then(({ data }) => {
        if (userData) data = likeItemNormalization(data, userData._id);
        setItems(data);
      })
      .catch((err) => {
        toast("Can't get the items from server", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, []);

  // const [dataFromServer, setDataFromServer] = useState([]);
  // const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const navigate = useNavigate();

  const userData = useSelector((bigPie) => bigPie.authSlice.userData);

  // useEffect(() => {
  //   axios
  //     .get("/items")
  //     .then(({ data }) => {
  //       //console.log("data", data);
  //       if (userData) data = likeItemNormalization(data, userData._id);
  //       //console.log("userData", userData);
  //       setInitialDataFromServer(data);
  //       setDataFromServer(data);
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       toast("Can't get the items from server", {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     });
  // }, []);

  // useEffect(() => {
  //   if (!initialDataFromServer.length) return;
  //   //const filter = filter ? filter : "";
  //   // const filterSubvalues = filterValues[filter];
  //   setDataFromServer(
  //     initialDataFromServer.filter((item) => {
  //       return (
  //         (filter ? item.title?.indeitemOf(filter) !== -1 : true) &&
  //         (category ? item.category === category : true)
  //       );
  //     })
  //   );
  //   // setDataFromServer(
  //   //   initialDataFromServer.filter(
  //   //     (item) =>
  //   //       filterSubvalues.some((x) => item.title.toLowerCase().startsWith(x))
  //   //     //item.title.toLowerCase().startsWith(filter.toLowerCase())
  //   //   )
  //   // );
  // }, [filter, initialDataFromServer]);
  const handleDeleteItem = async (_id) => {
    setDeleteDialogOpen(true);
    setDeleteItemId(_id);
  };

  const confirmDeleteItem = async () => {
    try {
      const { data } = await axios.delete("/items/" + deleteItemId);
      // setDataFromServer((dataFromServerCopy) =>
      //   dataFromServerCopy.filter((item) => item._id !== deleteItemId)
      // );
      setItems((data) => data.filter((item) => item._id !== deleteItemId));
      setDeleteDialogOpen(false);
    } catch (err) {
      toast("There is an error on deleting", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setDeleteDialogOpen(false);
    }
  };

  const cancelDeleteItem = () => {
    setDeleteDialogOpen(false);
    setDeleteItemId(null);
  };

  // const handleLikeItem = async (_id) => {
  //   try {
  //     const { data } = await axios.patch("/items/" + _id);
  //     // setInitialDataFromServer(
  //     //   initialDataFromServer.map((item) =>
  //     //     item._id == _id ? { ...item, likes: !item.likes } : item
  //     //   )
  //     // );
  //     setItems((data) =>
  //       data.map((item) => {
  //         return item._id === _id ? { ...item, likes: !item.likes } : item;
  //       })
  //     );
  //   } catch (err) {
  //     toast("There's a problem with the likes request from server", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };
  const handleViewItem = async (_id) => {
    navigate(`${ROUTES.ITEM}/${_id}`);
  };

  const handleAllItems = () => {
    // console.log(initialDataFromServer);
    // setDataFromServer(initialDataFromServer);
    navigate(ROUTES.ITEMS);
  };
  // const handleLikeSuccess = (_id) => {
  //   setInitialDataFromServer(
  //     initialDataFromServer.map((item) =>
  //       item._id == _id ? { ...item, likes: !item.likes } : item
  //     )
  //   );
  // };
  const handleLikeSuccess = (_id) => {
    setItems((items) =>
      items.map((item) =>
        item._id === _id ? { ...item, likes: !item.likes } : item
      )
    );
  };
  const handleCategoryButton = (e) => {
    // console.log(initialDataFromServer, "D");
    // if (!initialDataFromServer.length) return;
    const category = e.target.value;
    navigate(`${ROUTES.ITEMS}?category=${category}`);
    //const categoryUrl = category ? category : "";

    // setDataFromServer(
    //   initialDataFromServer.filter((item) => item.category.startsWith(category))
    // );
  };

  // const handleDressesFilter = () => {
  //   console.log(initialDataFromServer);
  //   if (!initialDataFromServer.length) return;
  //   setDataFromServer(
  //     initialDataFromServer.filter((item) => item.title.startsWith("Dress"))
  //   );
  // };
  // const handleBeltsFilter = () => {
  //   console.log(initialDataFromServer);
  //   if (!initialDataFromServer.length) return;
  //   setInitialDataFromServer(
  //     initialDataFromServer.filter((item) => item.title.startsWith("Belt"))
  //   );
  // };

  const filteredItems = items.filter((item) => {
    return (
      (filter ? item.title.toLowerCase().startsWith(filter) : true) &&
      (category ? item.category.toLowerCase() === category : true)
    );
  });

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: "center",
          mt: 2,
          mb: 2,
          backgroundColor: "background.default",
        }}
      >
        <Button
          variant="text"
          sx={{ mr: 3 }}
          value="accessories"
          onClick={handleCategoryButton}
        >
          Accessories
        </Button>
        <Button
          variant="text"
          sx={{ mr: 3 }}
          value="clothing"
          onClick={handleCategoryButton}
        >
          Clothing
        </Button>
        <Button
          variant="text"
          sx={{ mr: 3 }}
          value="bags"
          onClick={handleCategoryButton}
        >
          Bags
        </Button>
        <Button
          variant="text"
          sx={{ mr: 3 }}
          value="shoes"
          onClick={handleCategoryButton}
        >
          Shoes
        </Button>
        <Button variant="text" value="others" onClick={handleCategoryButton}>
          Others
        </Button>
      </Box>
      <Container sx={{ paddingBottom: "60px" }}>
        {/* <Grid container spacing={2}>
          <Grid item xs={12} md={12}> */}
        <Grid
          container
          spacing={2}
          sx={{
            paddingLeft: { xs: "0 !important", sm: "auto" },
            paddingRight: { xs: "0 !important", sm: "auto" },
          }}
        >
          {!filteredItems.length && (
            <div
              style={{
                display: "flex",
                textAlign: "center",
                paddingTop: "5vh",
              }}
            >
              <Typography variant="h4">No items found...</Typography>
            </div>
          )}
          {filteredItems.map((item) => (
            <Grid item key={nextKey()} xs={12} sm={6} md={6} lg={4}>
              <ItemComponent
                _id={item._id}
                title={item.title}
                brand={item.brand}
                price={`${item.price}  $`}
                size={item.size}
                status={item.status}
                phone={item.phone}
                address={`${item.address.city}, ${item.address.street} ${item.address.houseNumber}`}
                img={item.image.url}
                alt={item.image.alt}
                description={item.description}
                date={item.createdAt}
                bizNumber={item.bizNumber}
                like={item.likes}
                itemNumber={item.itemNumber}
                onDeleteItem={handleDeleteItem}
                //onEditItem={handleEditItem}
                // onLikeItem={handleLikeItem}
                onLikeSuccess={handleLikeSuccess}
                onViewItem={handleViewItem}
              />
            </Grid>
          ))}
          {/* </Grid>
          </Grid> */}
        </Grid>

        <Button
          variant="outlined"
          sx={{
            mt: 2,
            width: { xs: "auto", md: "30%" },
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "15px",

            display: filter === "" && category === "" ? "none" : "flex",
            justifyContent: "center",
          }}
          onClick={handleAllItems}
        >
          Back to all items
        </Button>
        {/* <div className="App">
        <h2>Add Image:</h2>
        <input type="file" onChange={handleChange} />
        <img src={file} />
      </div> */}
      </Container>
      <Dialog
        open={deleteDialogOpen}
        onClose={cancelDeleteItem}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Item?"}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteItem}>Cancel</Button>
          <Button onClick={confirmDeleteItem} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ItemsPage;
