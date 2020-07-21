from django.http import HttpResponse


class StripeWH_Handler:
    """ Handle stripe webhook"""

    def __init__(self, request):
        self.request = request

    def handle_event(self, event):
        """
        handle a generic/unknown/unexpected event
        """
        return HttpResponse(
            content=f'Unhandled Webhook received: {event["type"]}',
            status=200)

    def handle_payment_intent_succeeded(self, event):
        """
        handle the payment intent succeeded webhook from stripe
        """
        intent = event.data.object
        print(intent)
        return HttpResponse(
            content=f'Webhook received: {event["type"]}',
            status=200)

    def handle_payment_intent_payment_failed(self, event):
        """
        handle the payment intent payment failed webhook from stripe
        """
        return HttpResponse(
            content=f'Webhook received: {event["type"]}',
            status=200)
