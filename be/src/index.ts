import express from "express";
import umkmRoutes from "./routes/umkmRoutes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/umkm", umkmRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
