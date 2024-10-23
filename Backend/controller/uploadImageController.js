const cloudinary = require("../storage/cloudinary");

const uploadImageController = (Model, updateMethod) => {
  return async (req, res) => {
    const { id } = req.params;

    try {
      let files = req.files || (req.file ? [req.file] : null);

      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      let uploadedFiles = [];

      for(const file of files ){

        const newFile = await cloudinary.uploader.upload( file.path, {resource_type:'auto', folder: 'Images'});
        uploadedFiles.push(newFile.url);
      }

      const newContent = {
        name: req.body.name,
        files: uploadedFiles,
      };

      const updatedCampaign = await Model.findByIdAndUpdate(id, { $push: { contents: newContent } }, {
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

module.exports = uploadImageController;
