from rest_framework import serializers
from .models import ContactMessage, Consultation, NewsletterSubscriber


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "phone", "service", "message"]

    def validate_phone(self, value):
        if not value.strip():
            raise serializers.ValidationError("ტელეფონი სავალდებულოა.")
        return value


class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = ["patient_name", "phone", "email", "service", "preferred_date", "notes"]

    def validate_phone(self, value):
        if not value.strip():
            raise serializers.ValidationError("ტელეფონი სავალდებულოა.")
        return value


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ["email"]

    def validate_email(self, value):
        if NewsletterSubscriber.objects.filter(email=value, is_active=True).exists():
            raise serializers.ValidationError("ეს ელ-ფოსტა უკვე გამოწერილია.")
        return value

    def create(self, validated_data):
        obj, created = NewsletterSubscriber.objects.get_or_create(
            email=validated_data["email"],
            defaults={"is_active": True},
        )
        if not created:
            obj.is_active = True
            obj.save()
        return obj
