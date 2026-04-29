import { useState } from "react";
import { useNotifications } from "../context/NotificationContext";
import "./notifications.css";

const NotificationCenter = () => {
  const { notifications, markAsRead } = useNotifications();
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="notification-wrapper">

      {/* 🔔 BELL ICON */}
      <div
        className="notification-bell"
        onClick={() => setOpen(!open)}
      >
        🔔
        {unreadCount > 0 && (
          <span className="badge">{unreadCount}</span>
        )}
      </div>

      {/* DROPDOWN PANEL */}
      {open && (
        <div className="notification-dropdown">
          <h4>Notifications</h4>

          {notifications.length === 0 ? (
            <p className="empty">No notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`notification-item ${n.read ? "read" : ""}`}
                onClick={() => markAsRead(n.id)}
              >
                <p>{n.message}</p>
                <small>
                  {new Date(n.createdAt).toLocaleTimeString()}
                </small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;