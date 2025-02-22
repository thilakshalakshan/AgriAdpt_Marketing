import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

const testimonials = [
  { 
    quote: "AgriAdpt helped me manage water efficiently, saving my crops during drought!", 
    name: "Saman Perera", 
    image: "https://images.pexels.com/photos/7193997/pexels-photo-7193997.jpeg"
  },
  { 
    quote: "I can now plan my paddy farming better with real-time weather updates!", 
    name: "Kamal Rajapaksha", 
    image: "data:image/jpeg;base64,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"
  },
  { 
    quote: "The pest control advisories reduced my pesticide usage by 40%, making my farm healthier!", 
    name: "Nimali Gunawardena", 
    image: "https://images.pexels.com/photos/12520179/pexels-photo-12520179.jpeg"
  },
  { 
    quote: "With AgriAdpt, I know exactly when to irrigate, reducing water waste and saving money!", 
    name: "Bandara Senanayake", 
    image: "data:image/jpeg;base64,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"
  },
  { 
    quote: "AI-driven insights helped me grow climate-resilient crops, improving my harvest!", 
    name: "Tharindu Jayasuriya", 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNJrhnT7m7tQUPkCzx-RJdvVAmFo7cI-g8Ow&s"
  }
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white text-center">
      <h3 className="text-4xl font-extrabold text-green-700">What Sri Lankan Farmers Say</h3>
      <p className="text-lg text-gray-600 mt-2 mb-8">
        Real farmers, real experiences with AgriAdapt.
      </p>

      <div className="max-w-3xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              className="p-8 bg-white shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl"
            >
              <div className="flex flex-col items-center">
                {/* Profile Image */}
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-20 h-20 rounded-full border-4 border-green-500 mb-4 shadow-md object-cover"
                />
                {/* Testimonial Text */}
                <p className="text-lg italic text-gray-700">"{testimonial.quote}"</p>
                {/* Name */}
                <h4 className="mt-3 font-semibold text-green-600 text-lg">- {testimonial.name}</h4>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
