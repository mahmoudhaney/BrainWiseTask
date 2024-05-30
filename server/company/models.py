from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=255)
    num_departments = models.PositiveIntegerField(default=0, editable=False)
    num_employees = models.PositiveIntegerField(default=0, editable=False)
    
    def update_counts(self):
        self.num_departments = self.departments.count()
        self.num_employees = sum(department.employees.count() for department in self.departments.all())
        self.save()

class Department(models.Model):
    company = models.ForeignKey(Company, related_name='departments', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    num_employees = models.PositiveIntegerField(default=0, editable=False)
    
    def update_employee_count(self):
        self.num_employees = self.employees.count()
        self.save()
        self.company.update_counts()
