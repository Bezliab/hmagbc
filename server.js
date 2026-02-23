const path = require("path");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("pages/home"));
app.get("/about", (req, res) => res.render("pages/about"));
app.get("/services", (req, res) => res.render("pages/services"));
app.get("/events", (req, res) => res.render("pages/events"));
app.get("/sermons", (req, res) => res.render("pages/sermons"));
app.get("/resources", (req, res) => res.render("pages/resources"));
app.get("/contact", (req, res) => res.render("pages/contact"));
app.get("/admin", (req, res) => res.render("pages/admin"));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
