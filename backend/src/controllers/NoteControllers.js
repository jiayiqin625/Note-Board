import Note from "../model/Note.js";

export async function getNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching notes", error });
    }
} 
export const createNote = async (req, res) => {
    try {
        const {title, content} = req.body
        const newNote = new Note({title, content})

        const savedNote = await newNote.save();
        res.json(savedNote); 
    } catch (error) {
        console.error("Error in controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function updateNote(req,res) {
    try {
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title,content}, {new: true});
        if(!updatedNote) res.json({message:"failed"})
        res.json(updatedNote);
    } catch (error) {
        console.error("Error in controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteNote = async (req,res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message: "Note not found"});
        res.json({message: "Note deleted successfully"});
    } catch (error) {
        console.error("Error in controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function getNoteById(req,res) {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({message: "Note not found"});
        res.json({message: "Note found", note});
    } catch (error) {
        console.error("Error in controller", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}