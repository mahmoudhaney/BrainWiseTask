from rest_framework import serializers
from ..models import Employee
import re

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
        read_only_fields = ('days_employed',)

    def validate_designation(self, value):
        if not re.match(r'^[a-zA-Z0-9 ]+$', value):
            raise serializers.ValidationError('The designation field should contain only alphabetic characters, numbers, and spaces.')
        return value

    def validate(self, attrs):
        company = attrs.get('company')
        department = attrs.get('department')

        if department and company and department.company != company:
            raise serializers.ValidationError({'department': 'The department must belong to the specified company.'})

        return attrs
