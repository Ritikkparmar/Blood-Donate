import React from "react";
import { BiFemale } from "react-icons/bi";
import { FaCircleUser } from "react-icons/fa6";

interface Donor {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  bloodGroup: string;
  age: number;
  phone: string;
  address: string;
  state: string;
  city: string;
  email: string;
}

const DonorCard: React.FC<{ donor: Donor }> = ({ donor }) => (
  <div className="bg-white shadow-md rounded-xl p-6 text-center mb-4 md:mb-0 transform transition duration-300 hover:shadow-lg border border-gray-100">
    <div className="mb-4">
      {donor.gender.toLowerCase() === "male" ? (
        <FaCircleUser className="w-16 h-16 text-blue-600 inline-block" />
      ) : (
        <BiFemale className="w-16 h-16 text-pink-600 inline-block" />
      )}
    </div>
    <h2 className="text-2xl font-bold text-gray-800 mb-3">{`${donor.firstName} ${donor.lastName}`}</h2>
    <div className="text-lg font-semibold text-red-600 mb-4">
      Blood Group: {donor.bloodGroup}
    </div>
    <div className="flex flex-col space-y-2 text-gray-600">
      <div className="flex justify-between items-center">
        <span className="font-semibold">Age:</span>
        <span>{donor.age} years</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-semibold">Phone:</span>
        <span>{donor.phone}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-semibold">City:</span>
        <span>{donor.city}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-semibold">State:</span>
        <span>{donor.state}</span>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-gray-100">
      <p className="text-sm text-gray-500">{donor.address}</p>
    </div>
  </div>
);

export default DonorCard;