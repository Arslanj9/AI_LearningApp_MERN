function RoadmapModal({ item, onClose }) {
    if (!item) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        {/* Modal Box */}
        <div className="bg-white max-w-xl w-full rounded-xl p-6 relative shadow-lg">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
  
          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {item.topic}
          </h3>
  
          {/* Details */}
          <p className="text-gray-600 mb-4">
            {item.details}
          </p>
  
          {/* Techniques */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Key Topics & Techniques
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {item.techniques.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
  export default RoadmapModal;
  