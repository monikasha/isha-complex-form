import React from "react";
import { useState } from "react";
import Slider from "./Slider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BulbasaurIcon, { EeveeIcon, SquirtleIcon } from "./icons/Bulbasaur";
import "./FormComponent.css";
import PlaceOrder from "./PlaceOrder";
import Chip from "@mui/material/Chip";
import PopUpModal from "./PopUpModal";

const requestStructure = {
  fullName: "",
  codeName: "",
  nearestCenter: "",
  startingRegion: "",
  selectedPokemon: "",
  bucket: {
    pokeBall: "",
    greatBall: "",
    superPotion: "",
    hyperPotion: "",
    bag: "",
  },
  cost: "",
};

const FormComponent = () => {
  const [bucketChanged, setBucketChanged] = useState(false);
  const [currentObject, setCurrentObject] = useState(requestStructure);
  const [cost, setCost] = useState(0);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleObjectChange = (name, value) => {
    if (name === "bucket") {
      const temp = JSON.parse(JSON.stringify(currentObject));
      const bucket = temp.bucket;
      bucket[Object.keys(value)[0]] = Object.values(value)[0];
      bucket.bag = Object.values(value)[1] ? Number(bucket.bag) + 1 : bucket.bag;
      temp.bucket = bucket;
      setCurrentObject(temp);
      calculateCost(temp);
      setBucketChanged(false);
    } else {
      setCurrentObject({ ...currentObject, [name]: value });
    }
  };

  const calculateCost = (tempObject) => {
    const newCost =
      Number([tempObject.bucket.bag] * 2) +
      Number([tempObject.bucket.greatBall] * 10) +
      Number([tempObject.bucket.pokeBall] * 5) +
      Number([tempObject.bucket.superPotion] * 10) +
      Number([tempObject.bucket.hyperPotion] * 20);
    setCurrentObject((prevObject) => ({
      ...prevObject,
      cost: newCost,
    }));
  };

  const handleDeleteChip = (chip) => {
    console.log(chip);
    const temp = JSON.parse(JSON.stringify(currentObject));
    const bucket = temp.bucket;
    bucket[chip]=0;
    setCurrentObject(temp);
    calculateCost(temp);
  };

  return !showInfoModal ? (
    <div className="complexForm my-3">
      <h1 className="formHeader my-3">Fill This Form</h1>
      <p className="my-4 text-wrap mx-auto text-xs">
        We'll use this info to dominate the poke world! Muhahahahah
      </p>
      {!bucketChanged ? (
        <div>
          <div className="row mx-5 my-5">
            <input
              className="inputField"
              name="fullName"
              value={currentObject.fullName}
              type="text"
              onChange={(e) => {
                handleObjectChange("fullName", e.target.value);
              }}
              placeholder="Full Name"
            ></input>
          </div>
          <div className="row mx-5 my-5">
            <input
              className="inputField"
              name="codeName"
              value={currentObject.codeName}
              type="text"
              onChange={(e) => {
                handleObjectChange("codeName", e.target.value);
              }}
              placeholder="Code Name"
            ></input>
          </div>
          <div className="row mx-5 my-5">
            <Slider
              value={currentObject.nearestCenter}
              onChange={(e) => {
                handleObjectChange("nearestCenter", e.target.value);
              }}
            />
            <label className="" style={{ fontSize: "14px" }}>
              How far is your nearest pokemon center (in KMs)
            </label>
          </div>
          <div className="row mx-5 my-5 text-start">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              displayEmpty
              value={currentObject.startingRegion}
              label="Region"
              onChange={(e) => {
                handleObjectChange("startingRegion", e.target.value);
              }}
              sx={{ "& fieldset": { border: "none" }, color: 'grey', fontSize: '15px', padding: '0' }}
            >
              <MenuItem value="" selected="true" disabled>
                Whats your starting region?
              </MenuItem>
              <MenuItem value={"Kanto"}>Kanto</MenuItem>
              <MenuItem value={"Jhonto"}>Jhonto</MenuItem>
              <MenuItem value={"Hoenn"}>Hoenn</MenuItem>
            </Select>
          </div>
          <div className="row mx-5">
            <label className="text-start" style={{ fontSize: "15px" }}>
              Choose your starter pokemon
            </label>
            <div
              className="d-flex my-4"
              style={{ justifyContent: "space-between", opacity: "0.8" }}
            >
              <div
                className={`pokemonIcon ${
                  currentObject.selectedPokemon === 1 ? "selected" : ""
                }`}
                onClick={() => {
                  handleObjectChange("selectedPokemon", 1);
                }}
              >
                <BulbasaurIcon />
              </div>
              <div
                className={`pokemonIcon ${
                  currentObject.selectedPokemon === 2 ? "selected" : ""
                }`}
                onClick={() => {
                  handleObjectChange("selectedPokemon", 2);
                }}
              >
                <EeveeIcon />
              </div>
              <div
                className={`pokemonIcon ${
                  currentObject.selectedPokemon === 3 ? "selected" : ""
                }`}
                onClick={() => {
                  handleObjectChange("selectedPokemon", 3);
                }}
              >
                <SquirtleIcon />
              </div>
            </div>
          </div>
          <div className="row mx-5 my-3">
            <label className="text-start col-11 " style={{ fontSize: "15px" }}>
              What do you want to pack?
            </label>
            <span
              className="rounded bg-red rounded-circle col-1 text-center text-start opacity-75 pointer-event"
              onClick={() => setBucketChanged(true)}
              style={{
                color: "white",
                backgroundColor: "red",
                fontSize: "100%",
                height: "30px",
              }}
            >
              +
            </span>
          </div>
          <div className="row mx-5 my-3">
            {Object.keys(currentObject.bucket).map((key) => {
              const bucket = currentObject.bucket;
              return bucket[key] ? <Chip
              className="p-0 m-0"
                label={`${bucket[key]} ${key}`}
                variant="outlined"
                onDelete={()=>handleDeleteChip(key)}
                sx={{width: '100px', fontSize: '8px'}}
              /> : '';
            })}
          </div>
          <div className="row mx-5 my-5">
            <label className="text-start col-10" style={{ fontSize: "16px" }}>
              Total Cost
            </label>
            <span className="col-2 text-black">$ {currentObject.cost}</span>
          </div>

          <div className="row mx-5 my-5">
            <button
              className="w-50 border-0 rounded rounded-1 mx-auto opacity-75"
              style={{ color: "white", backgroundColor: "red" }}
              onClick={() => setShowInfoModal(true)}
            >
              Start My Journey
            </button>
          </div>
        </div>
      ) : (
        <PlaceOrder handleObjectChange={handleObjectChange} />
      )}
    </div>
  ) : <PopUpModal currentObject={currentObject} />;
};

export default FormComponent;
