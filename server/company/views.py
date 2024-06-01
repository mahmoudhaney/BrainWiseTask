from rest_framework import generics, permissions
from .models import Company, Department
from .serializers import CompanySerializer, DepartmentSerializer
from .permissions import IsAdminOrReadOnly

class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAdminOrReadOnly]

class CompanyRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAdminOrReadOnly]

class DepartmentListCreateView(generics.ListCreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        department = serializer.save()
        department.company.update_counts()

class DepartmentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAdminOrReadOnly]

    def perform_update(self, serializer):
        department = serializer.save()
        department.update_employee_count()

    def perform_destroy(self, instance):
        company = instance.company
        instance.delete()
        company.update_counts()

class DepartmentsByCompanyView(generics.ListAPIView):
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        company_id = self.kwargs['company_id']
        return Department.objects.filter(company_id=company_id)
