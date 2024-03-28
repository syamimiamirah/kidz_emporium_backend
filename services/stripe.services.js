const stripe = require('stripe')('sk_test_51Oaa1OHJ2EAdcao3N47ys1pvDo2VP2YI4wslqtgFt4L0VBL0p7Sj3nD6u4Lg7sx0SXlgbHkqA1XNBQADTlyuAru800SfbiS1mn');

class stripeServices {
  static async createPaymentMethod(tokenId) {
    try {
      // Create a payment method using the token ID
      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          token: tokenId
        }
      });
      
      return paymentMethod;
    } catch (error) {
      console.error('Error creating payment method:', error);
      throw error;
    }
  }
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
  // static async createPaymentIntentWithBackoff(data) {
  //   const { amount, currency, paymentMethod, description } = data;

  //   const initialDelay = 1000; // Initial delay in milliseconds
  //   const maxRetries = 5; // Maximum number of retry attempts

  //   let delay = initialDelay;
  //   let retryCount = 0;

  //   while (retryCount < maxRetries) {
  //       try {
  //           const paymentIntent = await stripe.paymentIntents.create({
  //               amount,
  //               currency,
  //               payment_method_types: ['card'],
  //               payment_method,
  //               confirm: true,
  //               description,
  //           });
  //           return paymentIntent;
  //       } catch (error) {
  //           if (error.statusCode !== 429 || retryCount === maxRetries - 1) {
  //               throw error;
  //           }
  //           retryCount++;
  //           delay *= 2; // Exponential backoff
  //           await new Promise(resolve => setTimeout(resolve, delay));
  //       }
  //   }

  //   throw new Error('Max retry attempts reached');
  // }
  
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
