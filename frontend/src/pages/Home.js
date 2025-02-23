import { useState, useEffect, useRef } from "react";
import styled from "styled-components"; 
import Testimonials from "../components/Testimonials"; // Import testimonials component
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi"; // Icons for dark mode toggle
import { FiSearch } from "react-icons/fi"; // Import Search Icon
import { FaBars } from "react-icons/fa";
import { FaGlobe, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";


const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -50, transition: { duration: 0.3, ease: "easeIn" } },
};

// ✅ Move the function definition **before return**
const Home = () => {
  const [email, setEmail] = useState(""); // Manages input in the Subscribe form
  const [showMore, setShowMore] = useState(false); // Manages "Learn More" section visibility
  const [showSearch, setShowSearch] = useState(false); // Manages search bar visibility
  const [searchTerm, setSearchTerm] = useState(""); // Manages search input value
  const [showServices, setShowServices] = useState(false); // Manages services dropdown
  const [showMenu, setShowMenu] = useState(false); // Manages mobile menu
  const [darkMode, setDarkMode] = useState(false); // Manages dark mode toggle
  const dropdownRef = useRef(null); // Reference for services dropdown
const searchRef = useRef(null); // Reference for search bar
  

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
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false); // Close search bar when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  
  
  return (
    <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
  >
   
    <div>
{/* Navigation Bar */}
<nav className={`fixed top-0 w-full z-50 ${darkMode ? "bg-gray-900" : "bg-white"} 
        bg-opacity-80 backdrop-blur-md shadow-md transition-all duration-300`}>

      {/* Navbar Container */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/images/logo.jpg" alt="AgriAdapt Logo" className="w-10 h-10" />
          <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-green-700"}`}>
            AgriAdpt
          </h1>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="relative flex-grow max-w-md hidden sm:flex justify-center items-center">
          <input
            type="text"
            placeholder="Search farming tips..."
            className="w-full bg-white dark:bg-gray-700 rounded-full px-4 py-2 shadow-md border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute right-3 text-gray-500 dark:text-gray-300 text-xl cursor-pointer" />
        </div>

        {/* Mobile Search Button */}
        <button
          className="sm:hidden text-gray-600 dark:text-white text-xl"
          onClick={() => setShowSearch(!showSearch)}
        >
          <FiSearch />
        </button>

        {/* Mobile Search Input */}
        {showSearch && (
          <div ref={searchRef} className="absolute top-14 left-0 w-full px-4">
            <input
              type="text"
              placeholder="Search farming tips..."
              className="w-full bg-white dark:bg-gray-700 rounded-full px-4 py-2 shadow-md border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute right-5 top-3 text-gray-500 dark:text-gray-300 text-xl cursor-pointer" />
          </div>
        )}

        {/* Desktop Navigation */}
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
                className={`absolute left-0 w-52 rounded-md p-2 shadow-lg z-50 ${
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"
                }`}
              >
                <li className="hover:text-green-400 px-3 py-2 cursor-pointer">AI-Based Crop Monitoring</li>
                <li className="hover:text-green-400 px-3 py-2 cursor-pointer">Water Management System</li>
                <li className="hover:text-green-400 px-3 py-2 cursor-pointer">Climate Advisory & Pest Control</li>
              </motion.ul>
            )}
          </div>

          <li className="hover:text-green-500 cursor-pointer transition-all duration-300">Contact</li>
        </ul>

        {/* Dark Mode Toggle */}
        <button onClick={() => setDarkMode(!darkMode)} className="hidden md:flex text-xl">
          {darkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-600" />}
        </button>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-green-600 text-2xl" onClick={() => setShowMenu(!showMenu)}>
          <FaBars />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {showMenu && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-700"} space-y-3 p-4 shadow-md absolute w-full`}
        >
          <li className="hover:text-green-500 cursor-pointer">Home</li>
          <li className="hover:text-green-500 cursor-pointer">About</li>

          {/* Services Dropdown for Mobile */}
          <div className="relative">
            <li className="hover:text-green-500 cursor-pointer transition-all duration-300" onClick={() => setShowServices(!showServices)}>
              Services ⬇
            </li>
            {showServices && (
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 shadow-md mt-2 rounded-md p-2 space-y-2 z-10 w-full"
              >
                <li className="hover:text-green-600 px-3 py-1 cursor-pointer">AI-Based Crop Monitoring</li>
                <li className="hover:text-green-600 px-3 py-1 cursor-pointer">Water Management System</li>
                <li className="hover:text-green-600 px-3 py-1 cursor-pointer">Climate Advisory & Pest Control</li>
              </motion.ul>
            )}
          </div>

          <li className="hover:text-green-500 cursor-pointer">Contact</li>
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
    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold rounded-full shadow-md hover:shadow-lg flex items-center gap-2 w-full sm:w-auto max-w-xs"
      >
        🌱 Learn More
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="bg-white text-green-700 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-semibold rounded-full shadow-md hover:bg-gray-100 flex items-center gap-2 w-full sm:w-auto max-w-xs"
      >
        📞 Contact Experts
      </motion.button>
    </div>
  </div>
</motion.section> {/* ✅ Closing tag added here */}


 {/* About Section */}
 <HomeContainer>
  <section id="about" className="bg-gray-100 py-16 w-full">
    <div className="max-w-6xl mx-auto px-6 text-center">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-extrabold text-green-700 leading-tight"
      >
        About <span className="text-green-600">AgriAdpt</span>
      </motion.h2>

      {/* Section Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-gray-700 text-lg sm:text-xl leading-relaxed mt-4 max-w-3xl mx-auto px-4 sm:px-8"
      >
        <span className="font-semibold text-green-700">AgriAdpt</span> is a
        <span className="font-semibold text-green-700"> Smart Farming Advisory System</span>  
        designed to <span className="font-semibold text-green-700">empower Sri Lankan farmers.</span>  
        Using <span className="font-semibold text-green-700">real-time IoT sensors, AI-driven insights, and predictive weather models,</span>  
        we help farmers <span className="font-semibold text-green-700">optimize water use, plan crops efficiently, and mitigate climate risks.</span>
      </motion.p>

      {/* Visual Separator */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8 }}
        className="mt-6 w-16 h-1 bg-green-500 mx-auto rounded-full"
      ></motion.div>
    </div>

    {/* Information Cards Section */}
    <div className="mt-12 grid md:grid-cols-3 gap-6 px-6 sm:px-10">
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center"
      >
        <span className="text-green-500 text-4xl">🌱</span>
        <h3 className="text-xl font-semibold text-green-700 mt-3">Our Aim</h3>
        <p className="text-gray-600 mt-2">
          Providing **data-driven tools** to enhance **sustainable farming practices** and **help farmers adapt to climate challenges**.
        </p>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.05 }} 
        className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center"
      >
        <span className="text-blue-500 text-4xl">🌍</span>
        <h3 className="text-xl font-semibold text-green-700 mt-3">Our Vision</h3>
        <p className="text-gray-600 mt-2">
          "Empowering farmers with smart, sustainable solutions to ensure **resilience in Sri Lanka’s agriculture**."
        </p>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.05 }} 
        className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center"
      >
        <span className="text-orange-500 text-4xl">🚜</span>
        <h3 className="text-xl font-semibold text-green-700 mt-3">Our Mission</h3>
        <p className="text-gray-600 mt-2">
          Integrating **IoT sensors, AI, and weather data** to help farmers **optimize water management, pest control, and resource efficiency**.
        </p>
      </motion.div>
    </div>
  </section>
</HomeContainer>


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
 
</motion.div>
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