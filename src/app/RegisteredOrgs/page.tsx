"use client";

import React, { useEffect, useState } from "react";

interface DonorOrg {
  id: string;
  OrganisationName: string;
  OrganisationEmail: string;
  OrganisationPhone: string;
  OrganisationAddress: string;
  OrganisationCity: string;
  OrganisationState: string;
}

const RegisteredOrgsPage = () => {
  const [orgs, setOrgs] = useState<DonorOrg[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const res = await fetch("/api/orgForm");
        const data = await res.json();
        console.log("Fetched orgs:", data); // Optional: check data
        setOrgs(data.donors); // ✅ Correct way
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrgs();
  }, []);
  

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-red-800">Registered Organizations</h1>

      {loading ? (
        <p>Loading...</p>
      ) : orgs.length === 0 ? (
        <p>No organizations registered yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orgs.map((org) => (
            <div
              key={org.id}
              className="border border-red-200 rounded-xl p-4 shadow-md bg-white dark:bg-gray-900"
            >
              <h2 className="text-xl font-bold text-red-700">{org.OrganisationName}</h2>
              <p><strong>Email:</strong> {org.OrganisationEmail}</p>
              <p><strong>Phone:</strong> {org.OrganisationPhone}</p>
              <p><strong>Address:</strong> {org.OrganisationAddress}</p>
              <p><strong>City:</strong> {org.OrganisationCity}</p>
              <p><strong>State:</strong> {org.OrganisationState}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegisteredOrgsPage;
