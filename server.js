const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));

app.get("/events", async (req, res) => {
    const city = req.query.city || "New York"; // Default city if none provided
    const API_KEY = process.env.TICKETMASTER_API_KEY;
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&city=${city}&classificationName=music`;

    try {
        const response = await axios.get(url);
        const events = response.data._embedded ? response.data._embedded.events : [];
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Error fetching events" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
