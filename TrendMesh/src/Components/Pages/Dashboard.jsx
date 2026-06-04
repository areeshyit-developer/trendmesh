import React, { useState, useEffect, useMemo } from "react";
import TMbg from "../Assets/TMbg.png";
import userIcon from "../Assets/userIcon.png";
import fblogo from "../Assets/fblogo.png";
import twlogo from "../Assets/twlogo.png";
import instalogo from "../Assets/instalogo.png";
import TMlogo from "../Assets/TMlogo.png";
import tiklogo from "../Assets/tiklogo.png";
import DB from "../Assets/DB.png";
import Facebookpg from "../Pages/Facebookpg";
import api from "../api";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Users, TrendingUp, Heart } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Cell,
  Pie,
  CartesianGrid,
} from "recharts";
import "./Dashboard.css";

const DashboardHome = () => {
  const [platform, setPlatform] = useState("All Platforms");
  const [stats, setStats] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    const getStats = async () => {
      try {
        const res = await api.get("/dashboard/combined-stats");
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error("Axios Fetch Error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    getStats();
  }, []);

  const current = useMemo(() => {
    if (!stats) return { followers: 0, engagement: 0, likes: 0 };

    
    const fb = stats.facebook || {};
    const ig = stats.instagram || {};
    const tt = stats.tiktok || {};
    const tw = stats.twitter || {};
    const all = stats.all || {};

    let selected = {};
    if (platform === "Facebook Only") {
      selected = fb;
    } else if (platform === "Instagram Only") {
      selected = ig;
    } else if (platform === "TikTok Only") {
      selected = tt;
    } else if (platform === "Twitter Only") {
      selected = tw;
    } else {
      selected = all;
    }

    return {
      followers: Number(selected.followers || 0),
      engagement: Number(selected.engagement || 0),
      likes: Number(selected.likes || 0)
    };
  }, [stats, platform]);

  const data = [
    { day: "Mon", reach: 120, likes: 80, comments: 30 },
    { day: "Tue", reach: 160, likes: 100, comments: 40 },
    { day: "Wed", reach: 180, likes: 120, comments: 50 },
    { day: "Thu", reach: 90, likes: 60, comments: 25 },
    { day: "Fri", reach: 140, likes: 90, comments: 35 },
    { day: "Sat", reach: 200, likes: 140, comments: 55 },
    { day: "Sun", reach: 110, likes: 70, comments: 20 },
  ];

  const sentimentData = [
    { name: "Positive", value: 29.5, fill: "#00D09C" },
    { name: "Neutral", value: 44.7, fill: "#FFC400" },
    { name: "Negative", value: 25.8, fill: "#FF007F" },
  ];

  return (
    <div className="dashboard-content">
      <div className="welcome-box fade-in">
        <div className="welcome-text">
          <h2>Welcome Back, {user?.name || "User"}!</h2>
          <p>You got 80% improved performance this week.</p>
        </div>
        <img src={DB} alt="Welcome" className="welcome-img" />
      </div>

      <div className="dashboard-header-row">
        <h3>Dashboard Overview</h3>
        <select 
          className="platform-dropdown" 
          value={platform} 
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="All Platforms">All Platforms</option>
          <option value="Facebook Only">Facebook Only</option>
          <option value="Instagram Only">Instagram Only</option>
          <option value="TikTok Only">TikTok Only</option>
          <option value="Twitter Only">Twitter Only</option>
        </select>
      </div>

      <div className="stats-row fade-in">
        <div className="stat-box-small">
          <div className="stat-card-header"><Users className="stat-icon" /></div>
          <h2>{loading ? "..." : (current?.followers ?? 0).toLocaleString()}</h2>
          <p>Total Followers</p>
        </div>

        <div className="stat-box-small">
          <div className="stat-card-header"><TrendingUp className="stat-icon" /></div>
          <h2>{loading ? "..." : `${current?.engagement ?? 0}%`}</h2>
          <p>User Engagement</p>
        </div>

        <div className="stat-box-small">
          <div className="stat-card-header"><Heart className="stat-icon" /></div>
          <h2>
            {loading 
              ? "..." 
              : (current?.likes >= 1000 
                  ? (current.likes / 1000).toFixed(1) + "K" 
                  : current?.likes ?? 0)}
          </h2>
          <p>Total Likes</p>
        </div>
      </div>

      <div className="insta-stats-container">
        <div className="stats-box performance-chart">
          <h3>Weekly Performance</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={data} barGap={4} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="day" axisLine={{stroke: '#ccc'}} tickLine={false} />
                <YAxis axisLine={{stroke: '#ccc'}} tickLine={false} />
                <Tooltip cursor={{ fill: "#f0f0f0" }} />
                <Bar name="Reach" dataKey="reach" fill="#0022ff" radius={[4, 4, 0, 0]} />
                <Bar name="Likes" dataKey="likes" fill="#ff00aa" radius={[4, 4, 0, 0]}  />
                <Bar name="Comments" dataKey="comments" fill="#6600ff" radius={[4, 4, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            <p><span className="legend-dot reach-dash"></span> Reach</p>
            <p><span className="legend-dot likes-dash"></span> Likes</p>
            <p><span className="legend-dot comments-dash"></span> Comments</p>
          </div>
        </div>

        <div className="stats-box sentiment-chart">
          <h3>Share of Sentiment</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ value }) => `${value}%`}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="sentiment-legend">
            <div><span className="legend-dot pos-dash"></span> Positive</div>
            <div><span className="legend-dot neu-dash"></span> Neutral</div>
            <div><span className="legend-dot neg-dash"></span> Negative</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    api.get("/facebook/me").catch(console.error);
  }, []);

  const socialMedia = [
    { name: "Facebook", icon: fblogo, route: "/dashboard/facebook" },
    { name: "Instagram", icon: instalogo, route: "/dashboard/instagram" },
    { name: "Twitter", icon: twlogo, route: "/dashboard/twitter" },
    { name: "TikTok", icon: tiklogo, route: "/dashboard/tiktok" },
  ];

  const scheduledData = [
    { date: "2025-1-27", platform: "instagram", time: "08:30 AM" },
    { date: "2025-1-27", platform: "twitter", time: "11:30 AM" },
    { date: "2025-1-28", platform: "tiktok", time: "09:30 AM" },
    { date: "2025-1-28", platform: "facebook", time: "09:30 AM" },
  ];

  return (
    <div className="dashboard-view" style={{ backgroundImage: `url(${TMbg})` }}>
      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="logo-section">
            <img src={TMlogo} alt="TrendMesh Logo" className="logo" />
          </div>


          <div className="user-section">
            <img 
             src={user?.avatar ? `http://localhost:5000/${user.avatar}` : userIcon}
              alt="User Icon" 
              className="user-icon" 
              style={{ borderRadius: "50%", width: "40px", height: "40px", objectFit: "cover" }}
            />
            <span>{user?.email || "Guest User"}</span>
          </div>
          <div className="menu">
            <h4>Social Media</h4>
            <div className="social-buttons">
              {socialMedia.map((media, index) => (
                <button
                  key={index}
                  className={`social-btn ${location.pathname === media.route ? "active" : ""}`}
                  onClick={() => navigate(media.route)}
                >
                  <img src={media.icon} alt={media.name} className="icon" />
                  <span>{media.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="logout">Log Out</div>
        </aside>

        <main className="main-container">
          <div className="content-box">
            <nav className="navbar">
              <div className="nav-buttons">
                <button 
                  className={isActive("/dashboard") ? "active-nav" : ""} 
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </button>
                <button 
                  className={isActive("/dashboard/scheduledposts") ? "active-nav" : ""} 
                  onClick={() => navigate("/dashboard/scheduledposts")}
                >
                  Scheduled Posts
                </button>
                <button 
                  className={isActive("/dashboard/aichat") ? "active-nav" : ""} 
                  onClick={() => navigate("/dashboard/aichat")}
                >
                  AI ✦
                </button>
                <button 
                  className={isActive("/dashboard/createpost") ? "active-nav" : ""} 
                  onClick={() => navigate("/dashboard/createpost")}
                >
                  Create Post
                </button>
              </div>
            </nav>
            {location.pathname === "/dashboard" ? (
              <DashboardHome />
            ) : (
              <Outlet context={{ scheduledData }} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;