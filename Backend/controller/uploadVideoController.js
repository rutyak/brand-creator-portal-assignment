const cloudinary = require("../storage/cloudinary");

const uploadVideoController = (Model, updateMethod) => {
  return async (req, res) => {
    const { id } = req.params;

    try {
      const result = await cloudinary.uploader.upload(req.file.path,{resource_type: 'auto', folder:'Videos'});

      const newContent = {
        name: req.body.name,
        files: result.url,
      };

      const updatedCampaign = await Model.findByIdAndUpdate(id, { $push: { contents: newContent }}, {
        new: true,
        runValidators: true,
      });

      if (!updatedCampaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }

      res.status(200).json({ campaign: updatedCampaign });
    } catch (error) {
      console.error("Error updating campaign: ", error);
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = uploadVideoController;
