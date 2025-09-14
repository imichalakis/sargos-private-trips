export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl text-blue-600 font-bold mb-6 text-center">
          Welcome to Sargos Private Trips
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Luxury Yacht Experiences
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Discover the ultimate luxury and adventure experience with our private yachts in the most stunning destinations across Greece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Luxury Yachts</h3>
            <p className="text-gray-600">Experience the finest vessels with premium amenities.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Expert Crew</h3>
            <p className="text-gray-600">Professional and experienced crew members.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Greek Islands</h3>
            <p className="text-gray-600">Explore the most beautiful destinations in Greece.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
