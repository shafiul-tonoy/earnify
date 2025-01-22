import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutFormBuyer from "./CheckOutFormBuyer";
import useAuth from "../../../hooks/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function PurchaseModal({ isOpen, onClose, info }) {
  const { user } = useAuth();
  const purchaseInfo = {
    ...info, // Include coins and cost
    userEmail: user.email,
    name: user.displayName, // Add user email
  };

  if (!isOpen) return null;

  return (
    <>
      <dialog
        id="custom_modal"
        className={`modal modal-bottom sm:modal-middle ${
          isOpen ? "modal-open" : ""
        }`}
      >
        <div className="modal-box bg-gradient-to-b from-white via-gray-100 to-gray-200 rounded-xl shadow-lg">
          {/* Modal Header */}
          <h3 className="font-extrabold text-2xl text-gray-800  text-center mb-4">
            Complete Your Purchase
          </h3>

          {/* Purchase Details */}
          <div className="text-center mb-6">
            <p className="text-lg text-gray-600">
              You're purchasing{" "}
              <span className="text-blue-600 font-bold">
                {purchaseInfo.coins} Coins
              </span>{" "}
              for{" "}
              <span className="text-green-600 font-bold">
                ${purchaseInfo.cost}
              </span>
            </p>
          </div>

          {/* Stripe Checkout Form */}
          <Elements stripe={stripePromise}>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <CheckOutFormBuyer purchaseInfo={purchaseInfo} onClose={onClose} />
            </div>
          </Elements>

          {/* Modal Actions */}
          <div className="modal-action flex justify-center">
            <button
              className="btn px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md shadow-lg hover:from-red-600 hover:to-red-700 transition duration-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
