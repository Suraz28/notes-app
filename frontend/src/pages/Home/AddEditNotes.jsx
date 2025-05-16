import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({
  getAllNotes,
  noteData,
  type,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        await getAllNotes();
        showToastMessage("Note Added Successfully");
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        await getAllNotes();
        showToastMessage("Note Updated Successfully");
        onClose();
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="fixed inset-0 bg-white p-4 mlg:relative mlg:inset-auto mlg:rounded-xl mlg:shadow-lg mlg:max-w-2xl mlg:mx-auto w-full h-full mlg:h-auto mlg:p-6 z-50">
      <button
        className="w-8 h-8 absolute top-4 right-4 bg-gray-300 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition"
        onClick={onClose}
        aria-label="Close modal"
      >
        <MdClose className="text-lg" />
      </button>

      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
        {type === "edit" ? "Edit Note" : "Add New Note"}
      </h2>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="title" className="text-sm text-gray-600 font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="border rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Your title..."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="content" className="text-sm text-gray-600 font-medium">
          Content
        </label>
        <textarea
          id="content"
          className="border rounded px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          placeholder="Write here..."
          rows={6}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="text-sm text-gray-600 font-medium">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-2">{error}</p>}

      <button
        className="w-full md:w-auto mt-5 px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        onClick={handleAddNote}
      >
        {type === "edit" ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
};

export default AddEditNotes;
