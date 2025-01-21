import useUserInfo from "../../../hooks/useUserInfo";
import Loading from "../../../components/Loading";
import { withdrawCalculation } from "../../../utilities/calculations";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { successAlert } from "../../../utilities/sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Withdrawals() {
  const navigate = useNavigate();
  const { data: userInfo, isLoading, error } = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [withdrawable, setWithdrawable] = useState(true);

  const coin = userInfo?.coin || 0;
  const withdrawalAmount = withdrawCalculation(coin);

  const coinToWithdraw = watch("coinToWithdraw", 0);

  const onSubmit = async (data) => {
    const withdrawal_coin = parseInt(data.coinToWithdraw, 10); // Ensure integer
    const worker_name = userInfo.name;
    const worker_email = userInfo.email;
    const withdrawal_amount = parseFloat(data.withdrawAmount); // Allow decimals
    const payment_system = data.paymentSystem;
    const account_number = parseInt(data.accountNumber, 10); // Ensure integer
    const withdrawal_date = new Date().toLocaleDateString();
    const status = "Pending";

    const withdrawalData = {
      withdrawal_coin,
      worker_name,
      worker_email,
      withdrawal_amount,
      payment_system,
      account_number,
      withdrawal_date,
      status,
    };

    if (withdrawable) {
      try {
        const response = await axiosSecure.post("/withdrawals", withdrawalData);
        console.log("Task Created:", response.data);
        successAlert("data added successfully!");
        return navigate("/dashboard");
      } catch (error) {
        console.error(
          "Error creating task:",
          error.response ? error.response.data : error.message
        );
        throw error;
      }
    }
  };

  useEffect(() => {
    const amount = coinToWithdraw * 0.05; // 20 coins = 1 dollar => 1 coin = $0.05
    setValue("withdrawAmount", amount.toFixed(2)); // Update withdraw amount
    setWithdrawable(coinToWithdraw <= coin);
  }, [coinToWithdraw, setValue, coin]);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!userInfo) return <div>No user found</div>;

  return (
    <>
      <h1>Withdrawals</h1>
      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat">
          <div className="stat-title">Total Earning</div>
          <div className="stat-value">{userInfo.coin} </div>
        </div>
        <div className="stat">
          <div className="stat-title">Maximum Withdrawal Amount</div>
          <div className="stat-value">$ {withdrawalAmount}</div>
        </div>
      </div>
      {/* form start  */}
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Withdrawal Form
          </h3>

          {/* Coin to Withdraw */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coin to Withdraw:
            </label>
            <input
              type="number"
              {...register("coinToWithdraw", {
                required: "This field is required",
                min: {
                  value: 200,
                  message: "You must withdraw at least 200 coins.",
                },
              })}
              placeholder="Enter coins to withdraw"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Validation Errors */}
            {errors.coinToWithdraw && (
              <p className="text-sm text-red-500 mt-1">
                {errors.coinToWithdraw.message}
              </p>
            )}
            {/* Exceed Coin Validation */}
            {coinToWithdraw > coin && (
              <p className="text-sm text-red-500 mt-1">
                Coins exceed your total available balance.
              </p>
            )}
          </div>

          {/* Withdraw Amount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Withdraw Amount ($):
            </label>
            <input
              type="text"
              {...register("withdrawAmount")}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-gray-600"
            />
          </div>

          {/* Payment System */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Payment System:
            </label>
            <select
              {...register("paymentSystem", { required: true })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Bkash">Bkash</option>
              <option value="Rocket">Rocket</option>
              <option value="Nagad">Nagad</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Account Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number:
            </label>
            <input
              type="text"
              {...register("accountNumber", { required: true })}
              placeholder="Enter your account number"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button or Insufficient Coin */}
          {withdrawable ? (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Withdraw
            </button>
          ) : (
            <p className="text-sm text-red-500 text-center">
              Insufficient coin
            </p>
          )}
        </form>
      </div>
    </>
  );
}
