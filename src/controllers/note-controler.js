import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    return res.status(200).json(notes);
    return;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createNotes = async (req, res) => {
  try {
    const body = req.body;
    const { title, text, userId } = body;

    const note = new Note({
      title,
      text,
      userId,
    });
    await note.save();

    console.log(body);
    return res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "error creating note" });
  }
};
