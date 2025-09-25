export const getAllNotes = async (req, res) => {
  return res.json({
    notes: 1,
    author: "John Doe",
    pages: 200,
  });
};

export const createNotes = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    return res.status(201).json({ message: "Note created successfully" });
  } catch (error) {}
};
