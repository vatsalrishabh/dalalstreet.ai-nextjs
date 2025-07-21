import api from "@/lib/api";

export const createRazorpayOrder = (token: string, amount: number) => {
  return api.post(
    `/api/v1/payments/create-order`,
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getPaymentHistory = (token: string, page = 1, limit = 10) => {
  return api.post('/api/v1/payments/payment-history', { page, limit }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}; 