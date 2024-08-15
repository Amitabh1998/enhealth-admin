const Educations = ({ data }) => {
  console.log(data);
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-lg p-6 grid  lg:grid-cols-10 gap-4">
      <div className="lg:col-span-5">
        <div className="font-semibold text-lg txt-gray-700 mb-4">
          Education Details
        </div>
        {data?.profile.educations?.map((e) => (
          <div className="grid grid-cols-2 gap-2 border p-4 rounded w-full">
            <div className="text-gray-800 font-semibold">Institute Name</div>
            <div className="text-gray-600">{e?.school}</div>
            <div className="text-gray-800 font-semibold">Degree</div>
            <div className="text-gray-600">{e?.qualification}</div>
            <div className="text-gray-800 font-semibold">Year</div>
            <div className="text-gray-600">{e?.year}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Educations;
