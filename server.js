const express = require("express");
const app = express();
const PORT = 5000;


// Set up middleware for verifying working hours
const authMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  // Check if it's a weekday and within working hours
  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
    next(); // Proceed to next middleware or route handler
  } else {
    res.send(
      "Sorry, the website is only available during working hours (Monday to Friday, 9 AM to 5 PM)."
    );
  }
};

app.use(authMiddleware);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/home.html");
});

app.get("/services", (req, res) => {
  res.sendFile(__dirname + "/public/services.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
});

app.get("/styles.css", (req, res) => {
  res.sendFile(__dirname + "/public/styles.css");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
