import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";
import commentRoute from "./routes/commentRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://blogifypk.vercel.app",
  "https://www.blogifypk.vercel.app",
];

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)
  .concat(defaultAllowedOrigins)
  .filter((origin, index, array) => array.indexOf(origin) === index);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server listening at port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server because the database connection failed.", error.message || error);
    process.exit(1);
  }
};

if (process.env.VERCEL) {
  await connectDB();
} else {
  startServer();
}

export default app;