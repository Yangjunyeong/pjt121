from rest_framework import serializers
from .models import Review
from accounts.models import User

class ReviewSerializer(serializers.ModelSerializer):

    class UserSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = User
            fields = '__all__'
    user = UserSerializer(read_only=True)
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('movie', 'user',)
