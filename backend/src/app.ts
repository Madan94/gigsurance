import express, { Request, Response } from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";

//backend configs
import { connectToDatabase } from "./config/database.js";
import driverAuthRoutes from "./routes/driverAuth.routes.js";
import initializationRoutes from "./routes/intialization.routes.js";


dotenv.config();
connectToDatabase();

const app = express();

app.use(
  cors({
    origin: true, 
    credentials: true,
  })
);



app.use(express.json());

app.use((req: Request, res: Response, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Headers:', {
    authorization: req.headers.authorization ? 'Present' : 'Missing',
    'content-type': req.headers['content-type']
  });
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});



app.get("/", (req: Request, res: Response) => {
  res.send("GigSurance - Ensure your insurance");
});

app.use("/api", driverAuthRoutes);
app.use("/api/init", initializationRoutes);



export default app;
