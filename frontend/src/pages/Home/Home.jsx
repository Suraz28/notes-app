import React, { useEffect, useState } from "react";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/Cards/EmptyCard";
import { useUser } from "../../Contexts/UserContext";
import SkeletonNote from "../../components/Skeleton/Skeleton";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { allNotes, getAllNotes, isSearch } = useUser();

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  // delete note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("delete-note/" + noteId);

      if (response.status === 200) {
        await getAllNotes();
        showToastMessage("Note Deleted Successfully", "delete");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.message) {
        console.log(error);
      }
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("update-note-pinned/" + noteId, {
        isPinned: !noteData.isPinned,
      });

      if (response.data && response.data.note) {
        await getAllNotes();
        showToastMessage("Note Updated Successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      await getAllNotes();
      setLoading(false);
    };
    fetchNotes();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        {loading ? (
          <div className="mt-7 gap-3 w-full grid grid-cols-1 mobile:grid-cols-2 md:grid-cols-3">
            {[...Array(allNotes.length)].map((_, i) => (
              <SkeletonNote key={i} />
            ))}
          </div>
        ) : allNotes.length > 0 ? (
          <div className="grid grid-cols-1 mobile:grid-cols-2 md:grid-cols-3 gap-3 mt-8">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={moment(item.createdOn).format("Do MMM, YYYY")}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            message={
              isSearch
                ? "Oops! no such notes can be found"
                : "No notes found. Create your notes by clicking plus icon below"
            }
          />
        )}
      </div>
      <button
        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: "null" });
        }}
      >
        <MdAdd className="text-[24px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
