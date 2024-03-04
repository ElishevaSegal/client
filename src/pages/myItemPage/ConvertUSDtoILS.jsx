import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

const ConvertCurrency = ({ api_key, amount }) => {
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const convertUSDToILS = async () => {
      if (!amount) {
        return;
      }
      try {
        const response = await fetch(
          `http://data.fixer.io/api/latest?access_key=${api_key}`
        );
        const data = await response.json();

        if (!data.success) {
          toast.info(`Error: ${data.error.info}`, {
            position: toast.POSITION.TOP_CENTER,
           });
          const amountInILSDefault = amount * 3.5;
          setConvertedAmount(amountInILSDefault);
          return;
        }

        const usdToIlsRate = data.rates.ILS;

        const amountInILS = amount * usdToIlsRate;

        setConvertedAmount(amountInILS.toFixed(2));
      } catch (error) {
        toast.info(`Error: ${error}`, {
          position: toast.POSITION.TOP_CENTER,
         });
      }
    };

    convertUSDToILS();
  }, [api_key, amount]);

  return (
    <Box
      sx={{
        backgroundColor: "sectionBackground.default",
        padding: 4,
        textAlign: "center",
      }}
    >
      <p style={{ display: !amount ? "none" : "flex" }}>
        {`${amount} USD is approximately`} <br /> {` ${convertedAmount} ILS`}
      </p>
    </Box>
  );
};

export default ConvertCurrency;