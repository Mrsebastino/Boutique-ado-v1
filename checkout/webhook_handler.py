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
            content=f'Webhook received: {event["type"]}',
            status=200)
