const stripe = require('stripe')('sk_test_51Oaa1OHJ2EAdcao3nYmyGrf9WCnKcYhMF5j89Z5oOUFpj8wv9DFkJd4UarJJ2Bjaa7WQyf83VHOs5V6jxJLodNCa00XI0tuTH3');

class stripeServices {
    static async createPaymentIntent(amount, currency, paymentMethod, description) {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount, // Stripe expects amount in cents
          currency,
          payment_method_types: ['card'],
          payment_method: paymentMethod,
          confirm: true, // Automatically confirm the payment intent
          description,
        });
        return paymentIntent;
      } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
      }
    }
  
    static async retrievePaymentIntent(paymentIntentId) {
        try {
          if (!paymentIntentId) {
            throw new Error('PaymentIntent ID is undefined or empty.');
          }
      
          const stripePaymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
          return stripePaymentIntent;
        } catch (error) {
          console.error('Error retrieving payment intent:', error);
          throw error;
        }
      }
      
  
    static async cancelPaymentIntent(paymentIntentId) {
      try {
        await stripe.paymentIntents.cancel(paymentIntentId);
      } catch (error) {
        console.error('Error canceling payment intent:', error);
        throw error;
      }
    }

    static async updatePaymentIntent(paymentIntentId, updatedData) {
        // Handle updating logic here
        // You might want to cancel the existing Payment Intent and create a new one with the updated details
        try {
          // Retrieve existing Payment Intent
          const existingPaymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
          // Cancel the existing Payment Intent
          await stripe.paymentIntents.cancel(paymentIntentId);
    
          // Create a new Payment Intent with updated details
          const updatedPaymentIntent = await stripe.paymentIntents.create({
            ...existingPaymentIntent,
            ...updatedData,
          });
    
          return updatedPaymentIntent;
        } catch (error) {
          console.error('Error updating payment intent:', error);
          throw error;
        }
    }

}
module.exports = stripeServices;
