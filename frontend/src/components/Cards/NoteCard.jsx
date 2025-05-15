import { useState } from "react";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  const [showFull, setShowFull] = useState(false);
  return (
    <div className="border rounded p-4 hover:shadow-xl transition-all ease-in-out bg-white self-start">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-xs text-slate-600 mt-2 ">
        {showFull
          ? content
          : `${content?.slice(0, 60)}${content?.length > 60 ? "..." : ""}`}
      </p>
      {content?.length > 60 && (
        <button
          className="text-[11px] mt-1 text-blue-500 underline "
          onClick={() => setShowFull((prev) => !prev)}
        >
          {showFull ? "See less" : "See more"}
        </button>
      )}
      <div className="flex items-center justify-between  mt-2">
        <div className="text-xs">
          {tags.map((item, index) => (
            <a
              key={index}
              href={`https://google.com/search?q=${encodeURIComponent(item)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-primary"
            >
              #{item}{" "}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
