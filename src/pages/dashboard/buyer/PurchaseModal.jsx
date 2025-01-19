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
    name:user.displayName // Add user email
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
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <Elements stripe={stripePromise}>
            <CheckOutFormBuyer purchaseInfo={purchaseInfo} onClose={onClose}/>
          </Elements>
          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
