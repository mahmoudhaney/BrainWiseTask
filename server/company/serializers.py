from rest_framework import serializers
from .models import Company, Department
import re

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'
        read_only_fields = ('num_departments', 'num_employees')

    def validate_name(self, value):
        if not re.match(r'^[a-zA-Z0-9 ]+$', value):
            raise serializers.ValidationError('The name field should contain only alphabetic characters and numbers.')
        return value

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'
        read_only_fields = ('num_employees',)

    def validate_name(self, value):
        if not re.match(r'^[a-zA-Z0-9 ]+$', value):
            raise serializers.ValidationError('The name field should contain only alphabetic characters and numbers.')
        return value
