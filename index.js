import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", function (req, res) {
  res.send("Hello Wosald");
});

app.listen(3000);
