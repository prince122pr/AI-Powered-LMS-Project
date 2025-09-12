import logo from "../assets/EdGine_Logos/logo-png.png";

const Footer = () => {
  return (
    <footer className="py-12 px-4 w-full sm:px-6 md:px-12 bg-black text-white flex flex-col items-center">
        <div className="w-full flex justify-between px-10 flex-wrap gap-6">
          <div className="">
            <img src={logo} alt="EdGine Logo" className="w-[150px] mb-4" />
            <p className="text-gray-400 font-[f3]">
              Transforming education through <br /> technology and innovation.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="www.linkedin.com/in/prince-web-developer" className="text-gray-400 hover:text-orange-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 34" width="34" height="34">
  <title>LinkedIn</title>
  <path d="M8.3 12.5h4.7v14.5H8.3V12.5zm2.3-7.4a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4zm7.8 7.4h4.5v2h.1c.6-1.1 2-2.3 4.1-2.3 4.4 0 5.2 2.9 5.2 6.7v7.1h-4.7v-6.3c0-1.5 0-3.5-2.1-3.5-2.1 0-2.4 1.6-2.4 3.3v6.5h-4.7V12.5z" fill="#0077B5"/>
</svg>

              </a>
             
              <a href="https://www.instagram.com/prince__122__/" className="text-gray-400 hover:text-orange-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-[f2] font-bold mb-4">Courses</h3>
            <ul className="space-y-2 font-[f3]">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Data Science</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Digital Marketing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">UX/UI Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Mobile Development</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-[f2] font-bold mb-4">Company</h3>
            <ul className="space-y-2 font-[f3]">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Partners</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-[f2] font-bold mb-4">Legal</h3>
            <ul className="space-y-2 font-[f3]">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Copyright</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 font-[f3]">© {new Date().getFullYear()} EdGine. All rights reserved.</p>
        </div>
      </footer>
  )
}

export default Footer
