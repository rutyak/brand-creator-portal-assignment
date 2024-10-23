const Campaign = require("../model/CampaignSchema");

const updateController = (Model, updateMethod) => {
  return async (req, res) => {
    const { id } = req.params;

    try {
      const updateData = updateMethod === "patch"
        ? { $push: { applicants: req.body.applicant } } 
        : { applicants: req.body.applicants }; 

      const updatedCampaign = await Model.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

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

module.exports = updateController;
