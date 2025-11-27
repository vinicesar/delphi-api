import express from "express";
import cors from "cors";
import router from "./routes/user.routes";
import { db } from "./db";
import "dotenv/config";
import routerListItens from "./routes/listItens.routes";
import routerListStock from "./routes/listStock.routes";
import routerListHistory from "./routes/listHistory.routes";
import routerListCart from "./routes/listCart.routes";
import routerConsumo from "./routes/consumo.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use(router);
app.use(routerListItens);
app.use(routerListStock);
app.use(routerListHistory);
app.use(routerListCart);
app.use(routerConsumo
);

app.listen(3000, () => {
  db.connect()
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
  console.log("Server is running on port 3000");
});
