import app from "./app";
import config from "./config/config";

const port = process.env.PORT || config.port || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
