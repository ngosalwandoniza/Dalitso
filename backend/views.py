from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from .models import FacebookPost
import json
# Create your views here.
#view for home 
def index(request):
    # Get latest Facebook posts
    facebook_posts = FacebookPost.objects.filter(is_active=True)[:3]
    context = {
        'facebook_posts': facebook_posts
    }
    return render(request,'backend/index.html', context)

def articles(request):
    # Get all Facebook posts for articles page
    facebook_posts = FacebookPost.objects.filter(is_active=True)
    context = {
        'facebook_posts': facebook_posts
    }
    return render(request,'backend/articles.html', context)

def incepta_article(request):
    return render(request, 'backend/incepta_article.html')

@csrf_exempt
def contact_form(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            message = data.get('message')
            
            # Email content
            subject = f'New Contact Form Message from {name}'
            email_content = f"""
            Name: {name}
            Message: {message}
            
            This message was sent from your website contact form.
            """
            
            # Send email
            send_mail(
                subject=subject,
                message=email_content,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL],
                fail_silently=False,
            )
            
            return JsonResponse({'status': 'success', 'message': 'Message sent successfully!'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)
