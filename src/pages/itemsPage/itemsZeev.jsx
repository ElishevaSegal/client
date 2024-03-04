import { useEffect, useState } from "react";
import { Box, Container, Grid, Link, Typography, Button } from "@mui/material";
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

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const { category = "", filter = "" } = useQueryParams();

  useEffect(() => {
    axios
      .get("/items")
      .then(({ data }) => {
        setItems(
          data.filter((x) => {
            return (
              (filter
                ? x.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1
                : true) &&
              (category
                ? x.category.toLowerCase() === category.toLowerCase()
                : true)
            );
          })
        );
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
  }, [filter]);


  const handleDeleteItem = async (_id) => {
    try {
      const { data } = await axios.delete("/items/" + _id);
      setItems((dataFromServerCopy) =>
        dataFromServerCopy.filter((item) => item._id != _id)
      );
    } catch (err) {
      toast("There is error on deleting", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
 
  const handleLikeItem = async (_id) => {
    try {
      const { data } = await axios.patch("/items/" + _id);
      setItems(
        items.map((item) =>
          item._id == _id ? { ...item, likes: !item.likes } : item
        )
      );
    } catch (err) {
      toast("There's a problem with the likes request from server", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleViewItem = async (_id) => {
    navigate(`${ROUTES.ITEM}/${_id}`);
  };

  const handleAllItems = () => {
    navigate(ROUTES.ITEMS);
  };
  const handleLikeSuccess = (_id) => {
    setItems(
      items.map((item) =>
        item._id == _id ? { ...item, likes: !item.likes } : item
      )
    );
  };
  const handleCategoryButton = (e) => {
    if (!items.length) return;
    const category = e.target.value;
    navigate(`${ROUTES.ITEMS}?category=${category}`);

  };


  return (
    <Container sx={{ paddingBottom: "60px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid item key={nextKey()} xs={12} sm={6} md={4} lg={4}>
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
                  like={item.likes.includes(userData._id)}
                  itemNumber={item.itemNumber}
                  onDeleteItem={handleDeleteItem}
                  //onEditItem={handleEditItem}
                  onLikeItem={handleLikeItem}
                  onLikeSuccess={handleLikeSuccess}
                  onViewItem={handleViewItem}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              height: "100%",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "70%",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "center",
              }}
              value="accessories"
              onClick={handleCategoryButton}
            >
              Belts
            </Button>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "70%",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "center",
              }}
              value="clothing"
              onClick={handleCategoryButton}
            >
              Dresses
            </Button>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "70%",
                marginBottom: "15px",
                display: "flex",
                justifyContent: "center",
              }}
              value="bags"
              onClick={handleCategoryButton}
            >
              Bags
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Button
        variant="outlined"
        sx={{
          mt: 2,
          width: "30%",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "15px",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={handleAllItems}
      >
        Back to all items
      </Button>
    </Container>
  );
};

export default ItemsPage;
