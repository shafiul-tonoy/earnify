import PurchaseModal from "./PurchaseModal";
import { useState } from "react";

export default function PurchaseCoin() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null); // State to hold selected card info

  const openModal = (info) => {
    setSelectedInfo(info); // Set the coin and cost information
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setSelectedInfo(null); // Clear the selected info
    setModalOpen(false); // Close the modal
  };

  const cardData = [
    { coins: 10, cost: 1 },
    { coins: 150, cost: 10 },
    { coins: 500, cost: 20 },
    { coins: 1000, cost: 35 },
  ];

  return (
    <>
      <div className="container mx-auto p-6">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 text-center mb-6">
          Purchase Coins
        </h2>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="card rounded-lg shadow-lg bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 text-white p-6 transition-transform transform hover:scale-105"
            >
              <div className="card-body flex flex-col items-center text-center">
                {/* Coins */}
                <h2 className="text-4xl font-extrabold mb-2">{card.coins} Coins</h2>
                <p className="text-xl font-semibold mb-4">= {card.cost} $</p>
                {/* Button */}
                <button
                  className="px-4 py-2 rounded-md bg-white text-blue-600 font-bold hover:bg-blue-100 transition-colors duration-300"
                  onClick={() => openModal(card)}
                >
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Purchase Modal */}
        <PurchaseModal isOpen={isModalOpen} onClose={closeModal} info={selectedInfo} />
      </div>
    </>
  );
}
