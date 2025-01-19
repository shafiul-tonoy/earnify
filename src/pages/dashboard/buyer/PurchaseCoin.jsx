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
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">Purchase Coins</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cardData.map((card, index) => (
            <div key={index} className="card bg-gray-700 text-neutral-content">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl">{card.coins} Coins</h2>
                <p>=</p>
                <p className="text-xl">{card.cost} $</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => openModal(card)} // Pass card info to modal
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <PurchaseModal isOpen={isModalOpen} onClose={closeModal} info={selectedInfo} />
      </div>
    </>
  );
}
