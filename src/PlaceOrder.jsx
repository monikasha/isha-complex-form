import React, { useState } from "react";
import Slider from "./Slider";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const label = { inputProps: { "aria-label": "Switch demo" } };

const PlaceOrder = (props) => {
  const { handleObjectChange } = props;
  const [selectedItem, setSelectedItem] = useState({
    itemType: "",
    costPerItem: "",
  });
  const [quantity, setQuantity] = useState(0);
  const [bag, setBag] = useState(false);

  const items = [
    { itemType: "pokeBall", costPerItem: 5, label: "Poke Ball" },
    { itemType: "greatBall", costPerItem: 10, label: "Great Ball" },
    { itemType: "superPotion", costPerItem: 10, label: "Super Potion" },
    { itemType: "hyperPotion", costPerItem: 20, label: "Hyper Potion" },
  ];

  const handleChange = (event) => {
    const { value } = event.target;
    const selectedOption = items.find((item) => item.itemType === value);

    setSelectedItem({
      itemType: value,
      costPerItem: selectedOption ? selectedOption.costPerItem : "",
    });
  };

  return (
    <div>
      <div className="row mx-5 my-5 text-start">
      <Select
      value={selectedItem.itemType} // Controlled component
      onChange={handleChange}
      displayEmpty // Ensures placeholder shows
      sx={{ "& fieldset": { border: "none" }, color: 'grey', fontSize: '15px', padding: '0' }}
    >
      {/* Placeholder Option */}
      <MenuItem value="" disabled>
        Choose Item
      </MenuItem>

      {/* Render menu items dynamically */}
      {items.map((item) => (
        <MenuItem key={item.itemType} value={item.itemType}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
      </div>
      <div className="row mx-5 my-5">
        <Slider
          value={quantity}
          min={0}
          max={10}
          onChange={(e) => {
            console.log(e);
            setQuantity(e.target.value);
          }}
        />
        <label className="text-start" style={{ fontSize: "15px" }}>
          Select Quantity
        </label>
      </div>
      <div className="row mx-5 my-5">
        <label className="col-10 text-start" style={{ fontSize: "15px" }}>
          I need a bag for that!
        </label>
        <Switch
          {...label}
          value={bag}
          onChange={(e) => setBag(e.target.value)}
          sx={{color: 'red'}}
        />
      </div>
      <div className="row mx-5 my-5">
        <label className="col text-start fw-bolder" style={{ fontSize: "15px" }}>
          Cost:
        </label>
        <span className="col text-end" style={{color: 'black'}}>
          {bag || bag === "on"
            ? `$ ${Number(Number(selectedItem.costPerItem) * Number(quantity)) + 2}`
            : `$ ${Number(selectedItem.costPerItem) * Number(quantity)} ` }
        </span>
      </div>
      <div className="row mx-5 my-5">
        <button
          className="w-50 border-0 rounded rounded-1 mx-auto opacity-75"
          style={{ color: "white", backgroundColor: "red" }}
          onClick={() =>
            handleObjectChange("bucket", {
              [selectedItem.itemType]: quantity,
              bag: bag || bag === "on" ? 1 : 0,
            })
          }
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
