export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      free: {
        priceId: 'price_1Q6FLLKGS2gdeh3wCbrQMelP',
        quota: {
          menus: 1,
          items: 15
        },
      },
      pro: {
        priceId: 'price_1Q6FM6KGS2gdeh3w3ytr93Ww',
        quota: {
          menus: 100,
          items: -1,
        },
      },
    },
  },
}