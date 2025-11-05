import { Calendar, SunMedium } from "lucide-react";
import { useState, useEffect } from "react";

const Header = ({ themeSetter, currTheme }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const clock = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(clock);
  }, []);

  const date_display_options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <nav>
      <div className="date-time">
        <h4 className="time">{time.toLocaleTimeString()}</h4>
        <div className="date-info">
          <Calendar strokeWidth={1.8} size={16} />
          <p>{time.toLocaleDateString("en-US", date_display_options)}</p>
        </div>
      </div>

      <div className="app-info">
        <div className="app-name-tagline">
          <h3>BeFocus</h3>
          <p>Stay productive, stay focused</p>
        </div>
      </div>
    </nav>
  );
};

export default Header;
