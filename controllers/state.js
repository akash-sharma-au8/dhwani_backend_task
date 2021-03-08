const State = require("../models/state");

// creatState
// post api/state/create
exports.createState = async (req, res) => {
  const { name } = req.body;
  try {
    state = new State({
      name,
      createdBy: req.user.id,
    });
    await state.save();
    res.status(201).json({
      state,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};

// fetchAllstates
// get api/state
exports.getAllStates = async (req, res) => {
  try {
    const states = await State.find();
    res.status(200).json({
      states,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};
