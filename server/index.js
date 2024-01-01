const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const admin = require("firebase-admin");
const db = require("./firebase");

if (process.env.NODE_ENV.trim() === 'development') {
    try {
        dotenv.config({ path: './config-dev.env'});
    } catch (e) {
        console.error(e)
    }
} else if (process.env.NODE_ENV.trim() === 'production') {
    dotenv.config({ path: './config.prod.env' });
} else {
    console.log(process.env.NODE_ENV);
    console.error('Invalid NODE_ENV. Use "development" or "production". ');
    process.exit(1);
}

const app = express();
// app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use("/", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
