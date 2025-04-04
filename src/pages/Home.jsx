export default function Home() {
  return (
    <div className="relative h-screen flex items-center justify-center text-center bg-gray-900 text-white">
      {/* Background Image */}
      <div
  className="absolute inset-0 bg-cover bg-center opacity-50"
  style={{ backgroundImage: "url('/concert.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}
></div>


      {/* Overlay Content */}
      <div className="relative z-10 p-6">
        <h1 className="text-5xl font-extrabold drop-shadow-md">
          Welcome to <span className="text-blue-400">Concert Ticketing</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Book your favorite events and concerts hassle-free. Get your tickets now and experience unforgettable moments!
        </p>

        {/* CTA Button */}
        <a href="/events">
          <button className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-lg transition transform hover:scale-105">
            Browse Events
          </button>
        </a>
      </div>
    </div>
  );
}
