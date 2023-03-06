const { Router } = require("express");
let Stripe = require('stripe') // (process.env.STRIPE_SECRET_KEY)
const router = Router()
const YOUR_DOMAIN = 'http://localhost:3000';

router.post('/create-checkout-session', async (req, res) => {
	const skey = process.env.STRIPE_SECRET_KEY
	const stripe = new Stripe(skey)
	//#region
	debugger;
	const items = req.body.items;
	let lineItems = []
	items.forEach(item => {
		lineItems.push({
			price_data: {
				currency: "usd",
				product_data: {
					name: item.name
				},
				unit_amount: item.price * 100,
			},
			quantity: item.quantity,
		})
	})
	//#endregion
	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: `${YOUR_DOMAIN}?success=true`,
		cancel_url: `${YOUR_DOMAIN}?canceled=true`,
	});

	res.status(200).json({ stripeSession: session })
});

module.exports = router;