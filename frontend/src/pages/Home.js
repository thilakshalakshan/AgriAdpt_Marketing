import { useState, useEffect, useRef } from "react";
import styled from "styled-components"; 
import Testimonials from "../components/Testimonials"; // Import testimonials component
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi"; // Icons for dark mode toggle
import { FaGlobe, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showServices, setShowServices] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const dropdownRef = useRef(null);
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing, ${email}!`);
    setEmail(""); // Clear input after submission
  };
  

   // Close dropdown when clicking outside
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowServices(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  
  
  return (
    <div>
{/* Navigation Bar */}
<nav className={`fixed top-0 w-full z-50 ${darkMode ? "bg-gray-900" : "bg-white"} 
    bg-opacity-80 backdrop-blur-md shadow-md transition-all duration-300`}>

    <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/images/logo.jpg" alt="AgriAdapt Logo" className="w-10 h-10" />
        <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-green-700"}`}>
          AgriAdpt
        </h1>
      </div>

      {/* Search Bar (Now Visible in Mobile Too) */}
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 shadow-inner w-64">
        <input
          type="text"
          placeholder="🔍 Search farming tips..."
          className="bg-transparent outline-none text-gray-700 dark:text-white w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Desktop Navigation Menu */}
      <ul className={`hidden md:flex space-x-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        <li className="hover:text-green-500 cursor-pointer transition-all duration-300">Home</li>
        <li className="hover:text-green-500 cursor-pointer transition-all duration-300">About</li>

        {/* Services Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <li
            className="hover:text-green-500 cursor-pointer transition-all duration-300 flex items-center"
            onClick={() => setShowServices(!showServices)}
          >
            Services ⬇
          </li>
          {showServices && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute ${darkMode ? "bg-gray-800 text-white" : "bg-white"} 
                         shadow-md mt-2 rounded-md p-2 space-y-2 z-10 w-48`}
            >
              <li className="hover:text-green-600 px-3 py-1 cursor-pointer">AI-Based Crop Monitoring</li>
              <li className="hover:text-green-600 px-3 py-1 cursor-pointer">Water Management System</li>
              <li className="hover:text-green-600 px-3 py-1 cursor-pointer">Climate Advisory & Pest Control</li>
            </motion.ul>
          )}
        </div>

        <li className="hover:text-green-500 cursor-pointer transition-all duration-300">Contact</li>
      </ul>

      {/* Play Store Download Button */}
      <a 
        href="https://play.google.com/store/apps/details?id=com.agriadapt.app" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hidden md:flex items-center bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md 
                  hover:bg-green-700 transition-all"
      >
        📲 Get the App
      </a>

      {/* Dark Mode Toggle */}
      <button onClick={() => setDarkMode(!darkMode)} className="hidden md:flex text-xl">
        {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-600" />}
      </button>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-green-600 text-2xl" onClick={() => setShowMenu(!showMenu)}>
        ☰
      </button>
    </div>

    {/* Mobile Navigation Menu (Fixed Issues) */}
    {showMenu && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"} 
          space-y-3 p-4 shadow-md absolute w-full`}
      >
        <li className="hover:text-green-500 cursor-pointer">Home</li>
        <li className="hover:text-green-500 cursor-pointer">About</li>

        {/* Services Dropdown for Mobile (Now Properly Styled) */}
        <div className="relative">
          <li
            className="hover:text-green-500 cursor-pointer transition-all duration-300"
            onClick={() => setShowServices(!showServices)}
          >
            Services ⬇
          </li>
          {showServices && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`bg-white dark:bg-gray-800 shadow-md mt-2 rounded-md p-2 space-y-2 z-10 w-full`}
            >
              <li className="hover:text-green-600 px-3 py-1 cursor-pointer">AI-Based Crop Monitoring</li>
              <li className="hover:text-green-600 px-3 py-1 cursor-pointer">Water Management System</li>
              <li className="hover:text-green-600 px-3 py-1 cursor-pointer">Climate Advisory & Pest Control</li>
            </motion.ul>
          )}
        </div>

        <li className="hover:text-green-500 cursor-pointer">Contact</li>

        {/* Play Store Button for Mobile */}
        <a 
          href="https://play.google.com/store/apps/details?id=com.agriadapt.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block text-center bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md 
                    hover:bg-green-700 transition-all"
        >
          📲 Download App
        </a>

        {/* Dark Mode Toggle */}
        <button onClick={() => setDarkMode(!darkMode)} className="w-full flex justify-center text-xl mt-3">
          {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-600" />}
        </button>
      </motion.div>
    )}
</nav>



{/* Hero Section */}
<motion.section
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="relative bg-cover bg-center min-h-screen flex items-center justify-center px-4 sm:px-8 text-center"
  style={{ backgroundImage: "url('/images/hero.jpg')" }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 opacity-50"></div>

  {/* Content */}
  <div className="relative z-10 text-white max-w-3xl">
    <motion.h2
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-md"
    >
      Empowering Sri Lankan Farmers with Smart Agriculture
    </motion.h2>

    <p className="mt-4 text-lg sm:text-xl leading-relaxed text-wrap">
    Boost yields, save water, and get real-time farming insights with AgriAdpt!
    </p>

    {/* CTA Buttons */}
    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-green-500 to-green-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        🌱 Learn More
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="bg-white text-green-700 px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-gray-100 flex items-center gap-2"
      >
        📞 Contact Experts
      </motion.button>
    </div>
  </div>
</motion.section>


 {/* About Section */}
 <HomeContainer>



 <section id="about" className="bg-gray-100 py-16 w-full">
  <div className="max-w-6xl mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-green-700">
        About <span className="text-green-600">AgriAdpt</span>
      </h2>

      {/* Description */}
      <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mt-6 mx-auto max-w-4xl sm:max-w-5xl px-4 sm:px-8">
        <span className="font-semibold text-green-700">AgriAdpt</span> is a 
        <span className="font-semibold text-green-700"> Smart Farming Advisory System</span>  
        built to <span className="font-semibold text-green-700">empower Sri Lankan farmers.</span>  
        With the help of <span className="font-semibold text-green-700">real-time IoT sensors, AI-driven insights, and predictive weather models,</span>  
        AgriAdpt supports farmers in <span className="font-semibold text-green-700">optimizing water use, planning crops efficiently, and mitigating climate risks.</span>
      </p>

      {/* Visual Separator */}
      <div className="mt-8 w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
    </motion.div>

        {/* Information Cards */}
        <div className="mt-8 grid md:grid-cols-3 gap-6 px-10">
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-green-700">🌱 Our Aim</h3>
            <p className="text-gray-600 mt-2">
              We aim to provide **data-driven tools** that enhance **sustainable farming practices**, 
              helping farmers **adapt to climate challenges**.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }} 
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-green-700">🌍 Our Vision</h3>
            <p className="text-gray-600 mt-2">
              <em>"Empowering farmers with smart, sustainable solutions to ensure 
              resilience in Sri Lanka’s agriculture."</em>
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }} 
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-green-700">🚜 Our Mission</h3>
            <p className="text-gray-600 mt-2">
              By integrating **IoT sensors, AI, and weather data**, AgriAdpt helps farmers 
              optimize **water management, pest control, and resource efficiency**.
            </p>
          </motion.div>
        </div>

        {/* Key Statistics */}
        <div className="mt-8 p-6 bg-green-700 text-white text-center rounded-lg shadow-lg w-full">
          <h3 className="text-2xl font-bold">AgriAdpt Impact</h3>
          <div className="flex flex-wrap justify-center gap-6 mt-4">
            <div>
              <h4 className="text-3xl font-bold">85%</h4>
              <p className="text-lg">Water Efficiency Improved</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold">30%</h4>
              <p className="text-lg">Reduction in Crop Loss</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold">1,200+</h4>
              <p className="text-lg">Farmers Benefitted</p>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-12 text-center px-10">
          <blockquote className="text-xl italic text-gray-700 max-w-3xl mx-auto">
            "AgriAdpt has transformed how I plan my irrigation schedule. Now I know 
            exactly when to water my crops, saving me time and resources!"
          </blockquote>
          <p className="mt-2 text-green-700 font-semibold">- Farmer in North Central Sri Lanka</p>
        </div>

        {/* Expandable Section */}
        <div className="mt-8 text-center">
          {showMore ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }} 
              className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto"
            >
              <h3 className="text-2xl font-semibold text-green-700">How It Works</h3>
              <p className="text-gray-600 mt-2">
                AgriAdpt integrates **real-time water level monitoring**, **weather forecasting**, 
                and **AI-driven advisories** to help farmers **make informed decisions**. The system 
                collects data from **IoT sensors**, combines it with **weather predictions**, and 
                delivers personalized farming advice through a **mobile application**.
              </p>
              <button 
                className="mt-4 text-green-700 font-semibold underline"
                onClick={() => setShowMore(false)}
              >
                Show Less
              </button>
            </motion.div>
          ) : (
            <button 
              className="mt-4 text-green-700 font-semibold underline"
              onClick={() => setShowMore(true)}
            >
              Learn More ⬇
            </button>
          )}
        </div>
      </div>
    </section>

</HomeContainer>

{/* Service Section */}
<section className="py-16 bg-gray-100">
      <div className="w-full text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-green-700 mb-6">Our Services</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          AgriAdpt provides **AI-driven agricultural solutions** to enhance 
          **climate resilience, water management, and precision farming** for Sri Lankan farmers.
        </p>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-8 px-10">
          {/* Service 1 - Climate-Resilient Crop Planning */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl flex flex-col items-center text-center"
          >
            <span className="text-green-500 text-5xl">🌾</span>
            <h3 className="text-xl font-bold mt-4">Climate-Resilient Crop Planning</h3>
            <p className="text-gray-600 mt-2">
              Provides **data-driven planting schedules** based on **Agro-Ecological Regions (AERs)**, 
              soil conditions, and weather predictions to **reduce climate risks**.
            </p>
          </motion.div>

          {/* Service 2 - Smart Water Management */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl flex flex-col items-center text-center"
          >
            <span className="text-blue-500 text-5xl">💧</span>
            <h3 className="text-xl font-bold mt-4">Smart Water Management</h3>
            <p className="text-gray-600 mt-2">
              Uses **IoT-based real-time water level monitoring** with **ultrasonic sensors** 
              and **ESP32 microcontrollers** to **optimize irrigation** and **conserve water resources**.
            </p>
          </motion.div>

          {/* Service 3 - AI-Powered Weather & Pest Forecasting */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl flex flex-col items-center text-center"
          >
            <span className="text-yellow-500 text-5xl">🌦️</span>
            <h3 className="text-xl font-bold mt-4">AI-Powered Weather & Pest Forecasting</h3>
            <p className="text-gray-600 mt-2">
              Uses **near-cast & now-cast weather data** from the Department of Meteorology 
              to **predict rainfall, humidity**, and **pest outbreaks** for timely actions.
            </p>
          </motion.div>

          {/* Service 4 - Automated Agricultural Advisory System */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl flex flex-col items-center text-center"
          >
            <span className="text-orange-500 text-5xl">📊</span>
            <h3 className="text-xl font-bold mt-4">Automated Agricultural Advisory System</h3>
            <p className="text-gray-600 mt-2">
              AI-driven **real-time advisory generation** offering **irrigation plans, 
              crop recommendations, and pest control strategies** based on **sensor data**.
            </p>
          </motion.div>

          {/* Service 5 - IoT-Based Tank Cascade System Monitoring */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl flex flex-col items-center text-center"
          >
            <span className="text-red-500 text-5xl">🏞️</span>
            <h3 className="text-xl font-bold mt-4">IoT-Based Tank Cascade System Monitoring</h3>
            <p className="text-gray-600 mt-2">
              Uses **IoT sensors** to track **tank water levels in real-time**, ensuring 
              **effective resource distribution and sustainable irrigation**.
            </p>
          </motion.div>

          {/* Service 6 - Mobile App for Farmers */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl flex flex-col items-center text-center"
          >
            <span className="text-purple-500 text-5xl">📱</span>
            <h3 className="text-xl font-bold mt-4">Mobile App for Farmers</h3>
            <p className="text-gray-600 mt-2">
              Provides **real-time water level alerts, AI-driven irrigation recommendations,** 
              and **weather-based advisories** in **Sinhala, English and Tamil**.
            </p>
          </motion.div>
        </div>
      </div>
    </section>


      {/* Testimonials Section */}
      <Testimonials /> 

{/* Call to Action Section */}
<section className="py-16 bg-green-700 text-white text-center">
  <div className="max-w-4xl mx-auto px-6">
    {/* Heading */}
    <h3 className="text-4xl font-extrabold leading-tight">
      🌱 Ready to Revolutionize Sri Lankan Agriculture?
    </h3>
    
    {/* Subtitle */}
    <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
      Join thousands of Sri Lankan farmers using AgriAdpt’s **AI-powered insights** 
      to **maximize crop yields, optimize water use, and adapt to climate changes**. 
      Whether you manage **paddy fields, vegetable farms, or tea plantations**, 
      we’ve got you covered!
    </p>

    {/* CTA Button */}
    <motion.button 
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="mt-6 px-8 py-4 text-lg font-bold bg-white text-green-700 rounded-full shadow-lg 
                 transition-all duration-300 hover:bg-gray-100 hover:shadow-xl"
    >
      🚀 Get Started Today
    </motion.button>

    {/* Additional Info */}
    <p className="mt-3 text-sm opacity-80">
      💡 **100% Free for Farmers** | 📲 **Available in Sinhala, English & Tamil**
    </p>
  </div>
</section>



{/* Footer Section */}
<footer className="bg-gray-900 text-white py-12">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
    
    {/* Quick Links */}
    <div>
      <h4 className="text-lg font-bold text-green-400">Quick Links</h4>
      <ul className="mt-2 space-y-2 text-sm text-gray-300">
        <li><a href="/" className="hover:text-green-300 transition">🏡 Home</a></li>
        <li><a href="/about" className="hover:text-green-300 transition">📖 About</a></li>
        <li><a href="/services" className="hover:text-green-300 transition">🌱 Services</a></li>
        <li><a href="/contact" className="hover:text-green-300 transition">📞 Contact</a></li>
      </ul>
    </div>

    {/* Sri Lankan Agricultural Support */}
    <div>
      <h4 className="text-lg font-bold text-green-400">Agriculture Support</h4>
      <ul className="mt-2 space-y-2 text-sm text-gray-300">
        <li>
          <a href="https://www.doa.gov.lk" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
            🌾 Sri Lanka Dept. of Agriculture
          </a>
        </li>
        <li>
          <a href="https://www.narasrilanka.org" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
            🔬 National Agricultural Research
          </a>
        </li>
        <li>
          <a href="https://www.fao.org/srilanka" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
            🌍 FAO Sri Lanka
          </a>
        </li>
        <li>
          <a href="https://www.gov.lk" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition">
            🏛 Govt. Agri Support
          </a>
        </li>
      </ul>
    </div>

    {/* Newsletter Subscription */}
    <div>
      <h4 className="text-lg font-bold text-green-400">📩 Subscribe for Updates</h4>
      <form onSubmit={handleSubscribe} className="mt-3 flex flex-col sm:flex-row items-center gap-3 w-full">
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-green-400 w-full sm:flex-1"
        />
        <button 
          type="submit" 
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-md transition-all w-full sm:w-auto flex items-center justify-center"
        >
          ✅ Subscribe
        </button>
      </form>
      <p className="mt-2 text-sm opacity-80 text-center sm:text-left">
        📢 Get the latest farming insights, weather alerts & smart farming tips!
      </p>
    </div>

    {/* Social Media & Live Chat */}
    <div>
      <h4 className="text-lg font-bold text-green-400">Follow Us</h4>
      <div className="flex flex-col space-y-2 mt-3 text-sm text-gray-300">
        <a href="#" className="hover:text-green-300 transition flex items-center gap-2">
          <FaGlobe className="text-2xl" /> Website
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition flex items-center gap-2">
          <FaFacebookF className="text-2xl" /> Facebook
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition flex items-center gap-2">
          <FaInstagram className="text-2xl" /> Instagram
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300 transition flex items-center gap-2">
          <FaTwitter className="text-2xl" /> Twitter
        </a>
      </div>
    </div>
  </div>

  {/* Live Chat Support Button */}
  <div className="fixed bottom-6 right-6">
    <button className="bg-green-500 text-white px-5 py-3 rounded-full shadow-lg 
                       hover:bg-green-600 transition flex items-center space-x-2"
      onClick={() => alert('Live Chat Support Coming Soon!')}
    >
      💬 Chat with Us
    </button>
  </div>

  {/* Bottom Copyright & Terms */}
  <div className="text-center text-gray-400 text-sm mt-8 border-t border-gray-700 pt-4">
    © 2025 AgriAdpt. All rights reserved. | 
    <a href="/privacy" className="hover:text-green-300 transition"> Privacy Policy </a> | 
    <a href="/terms" className="hover:text-green-300 transition"> Terms of Service </a>
  </div>
</footer>



    </div>
  );
};

export default Home;
// Styled Components for About Section
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AboutSection = styled.section`
  background: linear-gradient(to right, #e8f5e9, #ffffff);
  padding: 60px 20px;
  text-align: center;
  width: 100%;

  .container {
    max-width: 900px;
    margin: 0 auto;
  }

  h2 {
    font-size: 2.2rem;
    color: #2d572c;
    margin-bottom: 20px;
  }

  .intro {
    font-size: 1.2rem;
    line-height: 1.7;
    color: #333;
    margin-bottom: 35px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  @media (min-width: 768px) {
    .content {
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

const Card = styled(motion.div)`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  padding: 25px;
  text-align: left;
  transition: transform 0.3s ease-in-out;
  width: 100%;

  h3 {
    color: #1b5e20;
    margin-bottom: 12px;
  }

  p {
    font-size: 1rem;
    color: #444;
  }

  @media (min-width: 768px) {
    max-width: 30%;
  }
`;