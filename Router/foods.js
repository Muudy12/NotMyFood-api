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
  const foodById = foods.find((f) => f.id === foodId);
  res.json(foodById);
});

router.post("/foods/:id/comment", (req, res) => {
  const { name, comment } = req.body;
  const foodId = req.params.id;
  const foods = JSON.parse(fs.readFileSync("./Data/foods.json"));
  foods.forEach((food) => {
    if (food.id === foodId) {
      food.comments.push({
        id: newId(),
        name: name,
        date: Date.now(),
        comment: comment,
      });
    }
  });

  fs.writeFileSync("./Data/foods.json", JSON.stringify(foods));

  const foodById = foods.find((f) => f.id === foodId);
  res.json(foodById);
});

router.delete("/foods/:id/comments/:commentId", (req, res) => {
  const commentId = req.params.commentId;
  const foodId = req.params.id;
  const foods = JSON.parse(fs.readFileSync("./Data/foods.json"));
  foods.forEach((food) => {
    if (food.id === foodId) {
      food.comments = food.comments.filter((c) => c.id !== commentId);
    }
  });

  fs.writeFileSync("./Data/foods.json", JSON.stringify(foods));

  const foodById = foods.find((f) => f.id === foodId);
  res.json(foodById.comments);
});

export default router;
