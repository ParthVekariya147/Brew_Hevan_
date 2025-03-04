const Subscriber = require("../model/Subscriber");

exports.subscribe = async (req, res) => {
  const { email } = req.body;

  console.log("Received subscription request for email:", email);

  if (!email || !email.endsWith("@gmail.com")) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  try {
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({ message: "You are already subscribed!" });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    return res.status(201).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error("Error during subscription:", error);
    return res.status(500).json({ message: "Server error." });
  }
};
