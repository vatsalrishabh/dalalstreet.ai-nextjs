import api from "@/lib/api";

// razorpay payment service

export const createOrder = async (amount: number, token: string) => {
    try {
        const response = await api.post(
        '/api/v1/payments/create-order',
        { "amount":amount },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );  
        console.log('Order created:', response)
        console.log('Order ID:', response.data);
        return response.data;
    } catch (error) {       
        console.error('Error creating order:', error);
        throw error;
    }
}