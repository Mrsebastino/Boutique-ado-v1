from django.shortcuts import render, redirect, reverse
from django.contrib import messages

from .forms import OrderForm

# Create your views here.


def checkout(request):
    bag = request.session.get('bag', {})
    if not bag:
        messages.error(request, "There is nothing in your bag")
        return redirect(reverse('products'))

    order_form = OrderForm()
    template = 'checkout/checkout.html'
    context = {
        'order_form': order_form,
        'stripe_public_key': 'pk_test_51H59X8BoP8OfuZRQrL2MMfCpNcfwRPs2oEYimPKpnkP6SekWGC1zV3i1IkGAOXRPfn6I4BbvHBhBJk0UZrql0sPP002O0vPffe',
        'client_secret': 'test client secret',
    }

    return render(request, template, context)
