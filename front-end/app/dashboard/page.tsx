"use client";

import { useState, useEffect } from "react";
import DashboardNavBar from "../components/DashboardNavBar";
import FarmerDashboard from "../components/dashboard/FarmerDashboard";
import BuyerDashboard from "../components/dashboard/BuyerDashboard";
import RegistrationForm from "../components/registration/RegistrationForm";
import { checkHashpackConnection, isFarmerRegistered, getFarmerDetails, initHashConnect } from "../utils/hedera";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("farmer");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [farmerData, setFarmerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await initHashConnect();
      const connected = await checkHashpackConnection();
      setIsConnected(connected);

      if (connected) {
        const walletAddress = getConnectedAccountID();
        if (walletAddress) {
          const registered = await isFarmerRegistered();
          setIsRegistered(registered);

          if (registered) {
            const details = await getFarmerDetails();
            setFarmerData(details);
          }
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Dummy data for a user who is both a farmer and a buyer
  const dummyUser = {
    id: 1,
    fullName: "Alex Doe",
    companyName: "Alex's Organics",
    farmName: "Green Valley Farms",
    cropType: "Organic Vegetables",
    location: "California, USA",
    wallet: "0x1234...5678"
  };

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (!isRegistered) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center backdrop-blur-sm">
        <RegistrationForm onRegister={() => setIsRegistered(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavBar isRegistered={isRegistered} isConnected={isConnected} />
      <main className="container mx-auto p-6">
        <div className="mb-8">
          <div className="flex border-b border-gray-300">
            <button
              className={`px-6 py-3 text-lg font-medium ${
                activeTab === "farmer"
                  ? "border-b-2 border-green-500 text-green-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("farmer")}
            >
              Farmer Dashboard
            </button>
            <button
              className={`px-6 py-3 text-lg font-medium ${
                activeTab === "buyer"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("buyer")}
            >
              Buyer Dashboard
            </button>
          </div>
        </div>

        {activeTab === "farmer" ? (
          <FarmerDashboard farmer={farmerData || dummyUser} />
        ) : (
          <BuyerDashboard buyer={dummyUser} />
        )}
      </main>
    </div>
  );
}