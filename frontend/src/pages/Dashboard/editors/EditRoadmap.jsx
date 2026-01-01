const EditRoadmap = ({ domain }) => {
    return (
      <>
        <h2 className="text-2xl font-semibold mb-4">Edit Roadmap</h2>
        <textarea
          className="w-full h-48 p-4 border rounded-lg"
          placeholder="Edit roadmap content..."
        />
        <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg">
          Save
        </button>
      </>
    );
  };
  
  export default EditRoadmap;
  