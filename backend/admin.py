from django.contrib import admin
from .models import FacebookPost

# Register your models here.
@admin.register(FacebookPost)
class FacebookPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'is_active')
    list_filter = ('is_active', 'created_at')
    search_fields = ('title', 'content')
    readonly_fields = ('created_at',)
