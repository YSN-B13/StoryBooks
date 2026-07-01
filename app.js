const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const connectDB = require("./config/db");

// Load config
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
};

// Handlebars
app.engine('.hbs', exphbs({
    defaultLayout: 'main', 
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
