import { db } from "@/lib/db";
import { plans } from "@/lib/plans";
import stripe from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.log("STRIPE Webhook signature verification ERROR : ", error);
    return new Response("Webhook signature verification failed.", {
      status: 400,
    });
  }

  try {
    switch (event.type) {
      // PAIEMENT
      case "checkout.session.completed": {
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id
        );

        const customerId = session?.customer as string;
        const customerEmail = session?.customer_details?.email;

        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id
        );

        const priceId = lineItems.data[0].price?.id;
        const plan = plans
          .flatMap((p) => p.pro)
          .find((plan) => plan.priceId === priceId);

        if (!plan) {
          console.log("No plan found!");
          break;
        }

        if (customerEmail) {
          try {
            await db.user.update({
              where: { email: customerEmail },
              data: { plan: plan.name, customerId: customerId },
            });
          } catch {
            console.log("USER NOT FOUND");
            break;
          }
        }

        // SEND EMAIL
        break;
      }

      // DELETE
      case "customer.subscription.deleted": {
        const subscription = await stripe.subscriptions.retrieve(
          event.data.object.id
        );

        try {
          await db.user.update({
            where: { customerId: subscription.customer as string },
            data: { plan: null },
          });
        } catch {
          console.log("USER CUSTOMERID DELETED NOT FOUND");
        }
        break;
      }

      // CHECKOUT SESSION EXPIRED
      case "checkout.session.expired": {
        // SEND EMAIL TO PROMOTION
        console.log("SESSION EXPIRED");
        break;
      }

      // RETRIEVE WHEN SUB UPDATE
      case "customer.subscription.updated": {
        // SEND EMAIL TO PREVENT
        console.log("THE SUBSCRIPTION WILL END IN ...");
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }
  } catch (error) {
    console.log("STRIPE EVENT ERROR : ", error);
    return new Response("Webhook event failed.", {
      status: 400,
    });
  }

  return new Response("OK", { status: 200 });
}
