from django.db import models
from company.models import Company, Department
from django.utils import timezone
from django.conf import settings

class Employee(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, related_name='employees', on_delete=models.CASCADE)
    designation = models.CharField(max_length=100, null=False, blank=False)
    hired_on = models.DateField(null=True, blank=True)
    days_employed = models.PositiveIntegerField(null=True, blank=True, editable=False)
    
    def save(self, *args, **kwargs):
        if self.hired_on:
            self.days_employed = (timezone.now().date() - self.hired_on).days
        super().save(*args, **kwargs)
        self.department.update_employee_count()

    def __str__(self) -> str:
        return str(self.user.username)