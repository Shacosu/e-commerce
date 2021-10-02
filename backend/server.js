import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import "colors";

// Routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

app.get("/", (req, res) => {
	res.send("Api esta corriendo!");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () =>
	console.log(
		`Servidor corriendo en modo ${process.env.NODE_ENV} y en el puerto ${process.env.PORT}`
			.yellow.bold
	)
);
