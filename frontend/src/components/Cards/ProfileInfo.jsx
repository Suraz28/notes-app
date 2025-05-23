import { useUser } from "../../Contexts/UserContext";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ handleLogout }) => {
  const { userInfo } = useUser();
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 cursor-pointer">
        {getInitials(userInfo.fullName)}
      </div>
      <div>
        <p className="text-sm font-medium">{userInfo.fullName}</p>
        <button
          className="text-sm underline text-primary"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
