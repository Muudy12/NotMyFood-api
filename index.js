import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./Router/foods.js";

const app = express();
const port = process.env.PORT || 8080;

// malwares:
app.use(cors());
app.use(express.json());

app.use(router);

router.get("/", (req, res) => {
    res.send("Welcome to api page!");
});

app.listen(port, (req, res) => {
    console.log(`Listening on port: ${port}`);
});