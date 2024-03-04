const editProfileNormalize = (data) => {
  const newData = {
    first: data.name.first,
    middle: data.name.middle,
    last: data.name.last,
    phone: data.phone,
    url: data.image.url,
    alt: data.image.alt,
    country: data.address.country,
    city: data.address.city,
    street: data.address.street,
    houseNumber: data.address.houseNumber,
  };
  return newData;
};
export { editProfileNormalize };
