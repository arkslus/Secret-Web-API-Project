// 1. Import express and axios
const axios = require("axios");
const express = require("express");
const app = express();

// require full path
const path = require("path");

// 3. Use the public folder for static files.
app.use(express.static(path.join(__dirname, "public")));

// render the file through ejs
app.set("view engine", "ejs");
// change the default views directory
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://secrets-api.appbrewery.com/random");
    res.render("index.ejs", {
      secret: result.data.secret,
      user: result.data.username,
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000!");
});
