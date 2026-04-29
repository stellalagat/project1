import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      const res = await API.put("/auth/me", {
        name,
        email,
      });

      setUser(res.data);
      alert("Profile updated successfully");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <div className="profile-loading">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>

        <div className="profile-id">
          ID: <span>{user?.id}</span>
        </div>

        <div className="profile-field">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="profile-field">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="save-btn" onClick={updateProfile}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;