import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  /* ---------------- ADD NOTIFICATION ---------------- */
  const addNotification = ({ type, message }) => {
    const newNotification = {
      id: Date.now(),
      type, // "overdue" | "due" | "completed" | "rescheduled"
      message,
      read: false,
      createdAt: new Date(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  /* ---------------- MARK AS READ ---------------- */
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  /* ---------------- CLEAR ALL ---------------- */
  const clearAll = () => {
    setNotifications([]);
  };

  /* ---------------- UNREAD COUNT ---------------- */
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        clearAll,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

/* ---------------- CUSTOM HOOK ---------------- */
export const useNotifications = () =>
  useContext(NotificationContext);