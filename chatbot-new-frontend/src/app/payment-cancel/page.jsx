export default function PaymentCancel() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <h1 className="text-3xl font-bold text-red-700 mb-4">Payment Cancelled</h1>
      <p className="text-lg text-red-800 mb-2">Your payment was not completed.</p>
      <p className="text-red-700">You can try again anytime from the sidebar.</p>
    </div>
  );
}