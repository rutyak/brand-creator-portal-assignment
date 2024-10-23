const fetchController = (Model) => {
  return async (req, res) => {
    try {
      const data = await Model.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = fetchController;