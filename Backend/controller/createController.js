const createController = (Model) => {
  return async (req, res) => {
    const { title, description, deadline } = req.body;

    try {
      if (!title || !description || !deadline) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const newData = await Model.create({ title, description, deadline });
      res.status(201).json(newData);
    } catch (error) {
      console.error("Error creating data:", error);
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = createController;