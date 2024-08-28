import express from "express";
import fs from "fs";
import { v4 as newId } from "uuid";

const router = express.Router();

router.get("/foods", (req, res) => {
    const foods = JSON.parse(fs.readFileSync("./Data/foods.json"));
    res.json(foods);
});

router.get("/foods/:id", (req, res) => {
    const foodId = req.params.id;
    const foods = JSON.parse(fs.readFileSync("./Data/foods.json"));
    const foodById = foods.find(f => f.id === foodId);
    res.json(foodById);
});

export default router;