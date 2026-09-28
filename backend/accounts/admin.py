from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
# Register your models here.
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ("Contact information", {
            "fields": ("phone_number", "social_media_account")
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Contact information", {
            "fields": ("phone_number", "social_media_account")
        }),
    )

    list_display=(
        "username",
        "email",
        "first_name",
        "last_name",
        "phone_number",
        "is_staff",
        "social_media_account",
    )
