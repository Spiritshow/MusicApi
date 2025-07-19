import express from 'express';
import Stripe from "stripe";
import dotenv from "dotenv";

const payment = express.Router();

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-06-30.basil' });

payment.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            }
        });
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).send({ error: 'Ошибка при создании оплаты' });
    }
});

export default payment;