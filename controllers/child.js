const Child = require("../models/child");
const cloudinary = require("cloudinary");

// Add a child
// get api/child/add
exports.addChild = async (req, res) => {
  try {
    // const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //   folder: 'avatars',
    //   width: 150,
    //   crop: "scale"
    // })
    const {
      name,
      Sex,
      DateOfBirth,
      fatherName,
      motherName,
      stateId,
      districtId,
    } = req.body;

    child = new Child({
      name,
      Sex,
      DateOfBirth,
      fatherName,
      motherName,
      stateId,
      districtId,
      // avatar: {
      //   public_id: result.public_id,
      //   url: result.secure_url
      // },
      createdBy: req.user.id,
    });

    await child.save();
    res.status(201).json({
      child,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};

// get ALL children
// get api/child
exports.getChildren = async (req, res) => {
  try {
    const children = await Child.find();
    res.status(200).json({
      children,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
}

// getSingleChildDetails api/child/:id
exports.getChildDetails = async (req, res) => {
  try {
    const child = await Child.findById(req.params.id)
    res.status(200).json({
      child
    })
  } catch (err) {
    console.error(err.message)
    res.status(404).send("Child not found")
    }
}