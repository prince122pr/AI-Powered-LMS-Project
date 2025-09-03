
// Mock data for featured courses  
const featuredCourses = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      category: "Data Science",
      instructor: "Dr. Sarah Johnson",
      rating: 4.8,
      students: 1245,
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjaGluZSUyMGxlYXJuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      category: "Programming",
      instructor: "Alex Rivera",
      rating: 4.9,
      students: 2389,
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "Digital Marketing Masterclass",
      category: "Marketing",
      instructor: "Emma Thompson",
      rating: 4.7,
      students: 1876,
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }
  ];
const FeaturedCourses = () => {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-12 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-[f2] font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-black">
              Featured Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-[f3]">
              Explore our most popular courses and start your learning journey today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div 
                key={course.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer"
         
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-orange-100 text-orange-600 rounded-full">
                      {course.category}
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-700 ml-1">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-[f2] font-bold mb-2 text-gray-900">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">By {course.instructor}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{course.students} students</span>
                    <button className="text-sm font-medium text-orange-600 hover:text-orange-700">
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 text-white font-[f2] text-lg font-medium shadow-lg hover:shadow-gray-500/30 transition-all transform hover:-translate-y-1 hover:scale-105"
            >
              View All Courses
            </button>
          </div>
        </div>
      </section>
  )
}

export default FeaturedCourses