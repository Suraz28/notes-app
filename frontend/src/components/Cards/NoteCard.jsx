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
    <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-md hover:shadow-xl transition-all duration-300 ease-in-out w-full max-w-sm">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h6 className="text-lg font-semibold text-gray-800">{title}</h6>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn text-xl cursor-pointer transition-colors ${
            isPinned ? "text-yellow-500" : "text-gray-300 hover:text-gray-500"
          }`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-sm text-gray-700 mt-2 leading-relaxed">
        {showFull
          ? content
          : `${content?.slice(0, 60)}${content?.length > 60 ? "..." : ""}`}
      </p>

      {content?.length > 60 && (
        <button
          className="text-xs text-blue-600 underline mt-1"
          onClick={() => setShowFull((prev) => !prev)}
        >
          {showFull ? "See less" : "See more"}
        </button>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between">
        <div className="flex flex-wrap gap-1 text-xs">
          {tags.map((item, index) => (
            <a
              key={index}
              href={`https://google.com/search?q=${encodeURIComponent(item)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 rounded-full bg-indigo-100 text-indigo-600 hover:underline"
            >
              #{item}
            </a>
          ))}
        </div>
        <div className="flex gap-3 items-center text-lg">
          <MdCreate
            className="text-gray-600 hover:text-green-600 cursor-pointer transition"
            onClick={onEdit}
          />
          <MdDelete
            className="text-gray-600 hover:text-red-500 cursor-pointer transition"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
