import { FaLeaf, FaUtensils, FaBox } from "react-icons/fa";

const ImpactStats = () => {
  return (
    <div className="py-12 px-6 md:px-12 lg:px-20 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="bg-white shadow-md rounded-2xl p-6">
          <FaBox className="text-5xl text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold">12,500 kg</h3>
          <p className="text-gray-600">Total Food Donated</p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6">
          <FaUtensils className="text-5xl text-orange-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold">25,000+</h3>
          <p className="text-gray-600">Meals Saved</p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6">
          <FaLeaf className="text-5xl text-teal-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold">18,000 kg</h3>
          <p className="text-gray-600">CO₂ Reduced</p>
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
