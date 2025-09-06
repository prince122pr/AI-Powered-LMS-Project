import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Contact = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSubmitted: false, error: null });
    
    // Simulate form submission with a timeout
    setTimeout(() => {
      // In a real app, you would send the form data to a server here
      console.log("Form submitted:", formData);
      setFormStatus({ isSubmitting: false, isSubmitted: true, error: null });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, isSubmitted: false }));
      }, 5000);
    }, 1500);
  };

  return (
    <div className="w-full overflow-hidden bg-gray-50 pt-10">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              We'd love to hear from you. Reach out to our team with any questions or feedback.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/src/assets/Some_Images/bg-1.jpg')] bg-cover bg-center opacity-20"></div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
              
              {formStatus.isSubmitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              
              {formStatus.error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {formStatus.error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={formStatus.isSubmitting}
                  className={`w-full px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium shadow-md hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 duration-300 ${
                    formStatus.isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {formStatus.isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">Get in Touch</h2>
              
              {/* Contact Info Cards */}
              <div className="space-y-6">
                {/* Address */}
                <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1 flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-gray-800">Our Location</h3>
                    <p className="text-gray-600">
                      123 Education Avenue<br />
                      Tech District, Innovation City<br />
                      CA 94103, United States
                    </p>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1 flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <FaPhone className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-gray-800">Phone Number</h3>
                    <p className="text-gray-600">
                      Main: +1 (555) 123-4567<br />
                      Support: +1 (555) 987-6543
                    </p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1 flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-gray-800">Email Address</h3>
                    <p className="text-gray-600">
                      General: info@edgine.edu<br />
                      Support: help@edgine.edu
                    </p>
                  </div>
                </div>
                
                {/* Hours */}
                <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1 flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <FaClock className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-gray-800">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center">Find Us</h2>
          
          {/* Map Placeholder - In a real app, you would embed a Google Map or similar here */}
          <div className="w-full h-96 bg-white rounded-xl shadow-md overflow-hidden relative">
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <FaMapMarkerAlt className="text-5xl text-orange-500 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Interactive Map Would Be Embedded Here</p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium shadow-md hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 duration-300"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Media Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center">Connect With Us</h2>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 hover:scale-110 duration-300"
            >
              <FaFacebook className="text-white text-2xl" />
            </a>
            
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 hover:scale-110 duration-300"
            >
              <FaTwitter className="text-white text-2xl" />
            </a>
            
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 hover:scale-110 duration-300"
            >
              <FaInstagram className="text-white text-2xl" />
            </a>
            
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 hover:scale-110 duration-300"
            >
              <FaLinkedin className="text-white text-2xl" />
            </a>
            
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-md hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 hover:scale-110 duration-300"
            >
              <FaYoutube className="text-white text-2xl" />
            </a>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800">How quickly can I expect a response to my inquiry?</h3>
              <p className="text-gray-600">
                We strive to respond to all inquiries within 24-48 business hours. For urgent matters, we recommend calling our support line directly.
              </p>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800">Do you offer technical support for students?</h3>
              <p className="text-gray-600">
                Yes, we provide technical support for all registered students. You can reach our dedicated student support team via email or phone during regular business hours.
              </p>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-3 text-gray-800">How can I become an educator on EdGine?</h3>
              <p className="text-gray-600">
                We're always looking for qualified educators to join our platform. Please send your resume and a brief teaching proposal to careers@edgine.edu, and our team will review your application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;