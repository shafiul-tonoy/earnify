/* eslint-disable react-hooks/exhaustive-deps */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../../../hooks/useUserInfo";
import "./CheckoutForm.css";

const CheckOutFormBuyer = ({ 
  purchaseInfo, 
  onClose 
}) => {
  const {refetch} = useUserInfo()  
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    getPaymentIntent();
  }, [purchaseInfo]);



  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        cost: purchaseInfo?.cost,
        coins: purchaseInfo?.coins,
        buyerEmail: purchaseInfo?.userEmail,
      });
      
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error("Error in getPaymentIntent:", err);
    }
  };
  
  const handleSubmit = async (event) => {
    console.log("Handling Payment Submission");
    console.log("Purchase Info:", purchaseInfo);
   
  
    setProcessing(true);
    event.preventDefault();
  
    if (!stripe || !elements) {
      console.error("Stripe.js is not loaded");
      setProcessing(false);
      return;
    }
  
    const card = elements.getElement(CardElement);
  
    if (!card) {
      console.error("Card Element is not available");
      setProcessing(false);
      return;
    }
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
  
    if (error) {
      console.error("Payment Method Error:", error);
      setProcessing(false);
      return;
    }
  
    console.log("Payment Method Created:", paymentMethod);
  
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: purchaseInfo?.name,
          email: purchaseInfo?.email,
        },
      },
    });
  

    
  
    if (paymentIntent.status === "succeeded") {
      try {
        await axiosSecure.patch(`/update/coin`, {
          email: purchaseInfo?.userEmail,
          change: parseInt(purchaseInfo?.coins),
        });
  
        await axiosSecure.post(`/orders`, {
            ...purchaseInfo,
            transactionId: paymentIntent?.id,            
        });
  
        refetch();
        navigate("/dashboard");
      } catch (err) {
        console.error("Error saving data or updating coins:", err);
      } finally {
        setProcessing(false);
        onClose();
      }
    } else {
      console.error("Payment Failed:", paymentIntent);
      setProcessing(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex justify-around mt-2 gap-2">
        <button className="btn"> {`Pay ${purchaseInfo?.cost}$`}</button>        
      </div>
    </form>
  );
};

export default CheckOutFormBuyer;
