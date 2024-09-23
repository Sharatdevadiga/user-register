import User from "../models/user.js";
import Address from "../models/address.js";

const register = async (req, res) => {
  try {
    const { name, region, city, state, country, pin } = req.body;

    // Create new user if not already exists
    let user = await User.findOne({ name });
    if (!user) {
      user = new User({ name });
      await user.save();
    }

    // Create a new address and associate it with the existing or new user
    const newAddress = new Address({
      region,
      city,
      state,
      country,
      pin,
      user: user._id,
    });
    await newAddress.save();

    // Push the new address to the user's addresses array
    user.addresses.push(newAddress._id);
    await user.save();

    res.status(201).json({ message: "Address added successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error adding address", error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("addresses"); // Fetch all users and populate addresses
    res.status(200).json(users); // Send users as a response
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export { register, getAllUsers };
