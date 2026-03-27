import express from "express";
import cors from "cors";
import { AccessToken } from "livekit-server-sdk";

const app = express();
app.use(cors());

const API_KEY = "APIMzMfbZqN7t69";
const API_SECRET = "eAEAGlLe5YdQzrKsvAVKuy4tSsXcV3IxO3n5xz95ciI";

app.get("/token", async (req, res) => {

  const room = req.query.room || "demo";
  const identity = req.query.user || "guest";

  const at = new AccessToken(API_KEY, API_SECRET, {
    identity: identity
  });

  // Correct LiveKit grant format
  at.addGrant({
    roomJoin: true,
    room: room,
    canPublish: true,
    canSubscribe: true
  });

  const token = await at.toJwt();

  res.json({ token });

});

app.listen(5000, () => {
  console.log("Token server running on 5000");
});