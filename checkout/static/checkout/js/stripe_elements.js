/*
  Core logic/payment flow for this comes from here:
  https://stripe.com/docs/payments/accept-a-payment

  CSS from here:
  https://stripe.com/docs/stripe-js
*/

/* 
the slice at the end is to remove the "" in the key 
*/

let stripePublicKey = $("#id_stripe_public_key").text().slice(1, -1);
let clientSecret = $("#id_client_secret").text().slice(1, -1);
let stripe = Stripe(stripePublicKey);
let elements = stripe.elements();
let style = {
  base: {
    color: "#000",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#dc3545",
    iconColor: "#dc3545",
  },
};
let card = elements.create("card", { style: style });
card.mount("#card-element");

// Handle realtime validation errors on the card element
card.addEventListener("change", function (event) {
  let errorDiv = document.getElementById("card-errors");
  if (event.error) {
    let html = `
            <span class="icon" role="alert">
                <i class="fas fa-times"></i>
            </span>
            <span>${event.error.message}</span>
        `;
    $(errorDiv).html(html);
  } else {
    errorDiv.textContent = "";
  }
});

// Handle form submit
let form = document.getElementById("payment-form");

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  card.update({ disabled: true });
  $("#submit-button").attr("disabled", true);
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
      // Show error to your customer same as the error as above
    })
    .then(function (result) {
      if (result.error) {
        let errorDiv = document.getElementById("card-errors");
        let html = `
            <span class="icon" role="alert">
                <i class="fas fa-times"></i>
            </span>
            <span>${result.error.message}</span>`;
        $(errorDiv).html(html);
        card.update({ disabled: false });
        $("#submit-button").attr("disabled", false);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === "succeeded") {
          form.submit();
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
    });
});
