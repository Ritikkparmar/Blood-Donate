"use client";

import React, { useState, useEffect } from "react";
import DonorCard from "@/components/DonorCard";
import BloodGroupFilter from "@/components/BloodGroupFilter";

interface Donor {
  id: string;  // Changed to string as MongoDB uses string IDs
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

const FindBlood: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bloodGroupFilter, setBloodGroupFilter] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/donors", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch donors');
        }
        
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data && data.success && Array.isArray(data.donors)) {
          setDonors(data.donors);
          setError(null);
        } else {
          console.error("Invalid data format received:", data);
          setError("No donors found");
          setDonors([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch donors");
        setDonors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredDonors(
      bloodGroupFilter === ""
        ? donors
        : donors.filter((donor) => donor.bloodGroup === bloodGroupFilter)
    );
  }, [bloodGroupFilter, donors]);

  const handleBloodGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBloodGroupFilter(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Find Blood Donors</h1>
      
      <div className="max-w-xl mx-auto mb-8">
        <BloodGroupFilter
          bloodGroupFilter={bloodGroupFilter}
          handleBloodGroupChange={handleBloodGroupChange}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-900"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 py-8">
          <p>{error}</p>
        </div>
      ) : filteredDonors.length === 0 ? (
        <div className="text-center text-gray-600 py-8">
          <p>No donors found for the selected blood group.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FindBlood;
