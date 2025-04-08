import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './notification.css'; // for custom styles
import { Bell } from 'lucide-react'; // optional: or use any icon

const WebSocketNotification = () => {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const socket = new WebSocket('ws://yourserver.com/ws');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data); // Assume: { type, message }

      // Show toast
      toast[data.type || 'info'](data.message);

      // Store message
      setMessages((prev) => [
        { id: Date.now(), ...data },
        ...prev.slice(0, 9), // Keep only last 10
      ]);
    };

    return () => socket.close();
  }, []);

  return (
    <div>
      {/* Notification Icon */}
      <div className="notification-icon" onClick={() => setOpen(!open)}>
        <Bell />
        {messages.length > 0 && <span className="badge">{messages.length}</span>}
      </div>

      {/* Notification Dropdown */}
      {open && (
        <div className="dropdown">
          <h4>Recent Notifications</h4>
          {messages.length === 0 ? (
            <p>No notifications</p>
          ) : (
            <ul>
              {messages.map((msg) => (
                <li key={msg.id} className={`type-${msg.type || 'info'}`}>
                  {msg.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default WebSocketNotification;
