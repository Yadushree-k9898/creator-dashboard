import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/slices/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", bio: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(form));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input w-full"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Bio"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="textarea w-full"
          ></textarea>
        </div>
        <button type="submit" className="btn w-full bg-blue-600 text-white">
          Save Changes
        </button>
      </form>
    </div>
  );
}
