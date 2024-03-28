const stripe = require('stripe')('sk_test_51Oaa1OHJ2EAdcao3N47ys1pvDo2VP2YI4wslqtgFt4L0VBL0p7Sj3nD6u4Lg7sx0SXlgbHkqA1XNBQADTlyuAru800SfbiS1mn');
// paymentController.js
const paymentServices = require('../services/payment.services');
const stripeServices = require('../services/stripe.services');

exports.createPayment = async (req, res, next) => {
  try {
    const { userId, amount, currency, paymentMethod } = req.body;

    const paymentIntent = await stripeServices.createPaymentIntent(
    amount*100,
    currency,
    paymentMethod,
    `Payment for user ${userId}`
    );

    // Assuming you have a default status or you obtain it from somewhere
    //const status = 'Successful';

    // Store the paymentIntent.id or other relevant details in your database
    const payment = await paymentServices.createPayment(
    userId,
    amount,
    currency,
    paymentMethod,
    paymentIntent.id,
    paymentIntent.status, // Make sure to provide the status
    );

    res.json({ status: true, success: payment, _id: payment.id });

  } catch (error) {
    next(error);
  }
};


exports.getPayment = async (req, res, next) => {
    try {
      const userId = req.query.userId;
      //const transactionId = req.query.transactionId;
  
      // Retrieve payment information from your database
      let payment = await paymentServices.getPayment(userId);
  
      if (!payment) {
        return res.status(404).json({ status: false, error: 'Payment not found!' });
      }
  
      // Log the retrieved payment details
      console.log('Retrieved Payment Details:', payment);
  
      // Use the paymentIntentId from your database to retrieve details from Stripe
      //const stripePaymentIntent = await stripeServices.retrievePaymentIntent(payment.transactionId);
  
      res.json({ status: true, success: payment });
    } catch (error) {
      next(error);
    }
  };

exports.getPaymentDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    let paymentDetails = await paymentServices.getPaymentDetails(id);

    if (!paymentDetails) {
      return res.status(404).json({ status: false, error: 'Payment not found!' });
    }

    // Use the paymentIntentId from your database to retrieve details from Stripe
    const stripePaymentIntent = await stripeServices.retrievePaymentIntent(paymentDetails.transactionId);

    res.json({ status: true, success: { ...paymentDetails, stripePaymentIntent } });
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return res.status(500).json({ status: false, error: 'Error fetching payment details' });
  }
};

exports.deletePayment = async (req, res, next) => {
  try {
    const { id } = req.body;

    // Retrieve payment details from your database
    const paymentDetails = await paymentServices.getPaymentDetails(id);

    if (!paymentDetails) {
      return res.status(404).json({ status: false, error: 'Payment not found' });
    }

    // Call Stripe API to cancel PaymentIntent
    await stripeServices.cancelPaymentIntent(paymentDetails.transactionId);

    // Delete payment from your database
    const deletedPayment = await paymentServices.deletePayment(id);

    return res.json({ status: true, success: "Payment deleted successfully" });
  } catch (error) {
    console.error('Error deleting payment:', error);
    return res.status(500).json({ status: false, error: 'Error deleting payment' });
  }
};

exports.updatePayment = async (req, res, next) => {
  try {
    const paymentId = req.params.id;
    const updatedData = req.body.updatedData;

    // Retrieve payment details from your database
    const paymentDetails = await paymentServices.getPaymentDetails(paymentId);

    if (!paymentDetails) {
      return res.status(404).json({ status: false, error: 'Payment not found' });
    }

    // Call Stripe API to update PaymentIntent
    const updatedStripePaymentIntent = await stripeServices.updatePaymentIntent(paymentDetails.transactionId, {
      // Update relevant fields based on your application's logic
      ...updatedData,
    });

    // Update payment in your database with updated details
    const updatedPayment = await paymentServices.updatePayment(paymentId, updatedData);

    return res.json({ status: true, success: updatedPayment });
  } catch (error) {
    console.error('Error updating payment:', error);
    return res.status(500).json({ status: false, error: 'Error updating payment' });
  }
};

exports.getAllPayment = async (req, res, next) => {
  try {
    const allPayment = await paymentServices.getAllPayment();

    // Fetch additional details from Stripe for each payment
    const paymentsWithStripeDetails = await Promise.all(
      allPayment.map(async (payment) => {
        const stripePaymentIntent = await stripeServices.retrievePaymentIntent(payment.transactionId);
        return { ...payment, stripePaymentIntent };
      })
    );

    res.json({ status: true, success: paymentsWithStripeDetails });
  } catch (error) {
    console.error('Error fetching all payment:', error);
    return res.status(500).json({ status: false, error: 'Error fetching all payment' });
  }
};

 // const { userId, cardNumber, expirationDate, cvv } = req.body;

    // // Create a Payment Method
    // const paymentMethod = await stripeServices.createPaymentMethod({
    //   type: 'card',
    //   card: {
    //     number: cardNumber,
    //     exp_month: expirationDate.split('/')[0], // Assuming expirationDate is in MM/YY format
    //     exp_year: expirationDate.split('/')[1],
    //     cvc: cvv,
    //   },
    // });

    // // Attach Payment Method to Customer (if applicable)

    // // Create a Payment Intent
    // const paymentIntent = await stripeServices.createPaymentIntent({
    //   amount: 5000, // Assuming the amount is in cents (50.00 USD)
    //   currency: 'myr',
    //   payment_method: paymentMethod.id,
    //   description: `Payment for user ${userId}`,
    // });

    // Store payment details in your database