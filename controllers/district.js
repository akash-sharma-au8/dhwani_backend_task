const District = require("../models/district");


// post api/district/create
exports.createDistrict = async (req, res) => {
  const { name,stateId } = req.body;
  try {
    let district = await District.findOne({ name });

      if (district) {
        return res.status(400).json({
          message: "District already exists",
        });
      }

    district = new District({
      name,
      stateId,
      createdBy: req.user.id
    });
    await district.save();
    res.status(201).json({
      district,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
}

// get api/district
exports.getAllDistrict = async (req, res) => {
  try {
    const districts = await District.find();
    res.status(200).json({
      districts,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
}

