from django.urls import path
from .views import (
    CompanyListCreateView, 
    CompanyRetrieveUpdateDestroyView, 
    DepartmentListCreateView, 
    DepartmentRetrieveUpdateDestroyView,
    DepartmentsByCompanyView
    )

app_name = 'company'

urlpatterns = [
    path('companies/', CompanyListCreateView.as_view(), name='company-list-create'),
    path('companies/<int:pk>', CompanyRetrieveUpdateDestroyView.as_view(), name='company-detail'),
    path('departments/', DepartmentListCreateView.as_view(), name='department-list-create'),
    path('departments/<int:pk>', DepartmentRetrieveUpdateDestroyView.as_view(), name='department-detail'),
    path('companies/<int:company_id>/departments/', DepartmentsByCompanyView.as_view(), name='departments-by-company'),
]