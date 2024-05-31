from rest_framework import status
from rest_framework.test import APITestCase
from .models import Company, Department
from django.urls import reverse
from users.tests import create_admin_user, authenticate_user

def HTTP_AUTHORIZATION_HEADER(access_token):
    return {'HTTP_AUTHORIZATION': f'Bearer {access_token}'}

class CompanyListCreateViewTestCase(APITestCase):
    def setUp(self):
        self.url = reverse('company:company-list-create')
        self.admin_user = create_admin_user()
        self.refresh_token, self.access_token = authenticate_user(self.admin_user)
        self.headers = HTTP_AUTHORIZATION_HEADER(self.access_token)
        self.data = {
            'name': 'Test Company 1'
        }

    def test_create_company_success(self):
        response = self.client.post(self.url, self.data, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('name', response.data)
        self.assertIn('num_departments', response.data)
        self.assertIn('num_employees', response.data)

    def test_create_company_invalid_name(self):
        data = {'name': 'Invalid@Name!'}
        response = self.client.post(self.url, data, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)

    def test_create_company_with_missing_name(self):
        data = {}
        response = self.client.post(self.url, data, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)

class CompanyRetrieveUpdateDestroyViewTestCase(APITestCase):
    def setUp(self):
        self.company = Company.objects.create(name='TestCompany')
        self.url = reverse('company:company-detail', args=[self.company.id])
        self.admin_user = create_admin_user()
        self.refresh_token, self.access_token = authenticate_user(self.admin_user)
        self.headers = HTTP_AUTHORIZATION_HEADER(self.access_token)

    def test_update_company_success(self):
        data = {'name': 'UpdatedCompany'}
        response = self.client.put(self.url, data, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('name', response.data)
        self.assertEqual(response.data['name'], 'UpdatedCompany')

    def test_update_company_partial_success(self):
        data = {'name': 'PartialUpdateCompany'}
        response = self.client.patch(self.url, data, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('name', response.data)
        self.assertEqual(response.data['name'], 'PartialUpdateCompany')

    def test_update_company_invalid_name(self):
        data = {'name': 'Invalid@Name!'}
        response = self.client.put(self.url, data, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)

    def test_delete_company_success(self):
        response = self.client.delete(self.url, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Company.objects.filter(id=self.company.id).exists())

    def test_delete_company_without_authorization(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_company_with_invalid_token(self):
        headers = HTTP_AUTHORIZATION_HEADER('invalidtoken')
        response = self.client.delete(self.url, **headers)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class DepartmentListCreateViewTestCase(APITestCase):
    def setUp(self):
        self.url = reverse('company:department-list-create')
        self.admin_user = create_admin_user()
        self.refresh_token, self.access_token = authenticate_user(self.admin_user)
        self.headers = HTTP_AUTHORIZATION_HEADER(self.access_token)
        self.company = Company.objects.create(name='TestCompany')
        self.data = {
            'name': 'TestDepartment 1',
            'company': self.company.id
        }

    def test_create_department_success(self):
        response = self.client.post(self.url, self.data, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('name', response.data)
        self.assertIn('company', response.data)

    def test_create_department_without_company(self):
        data = {'name': 'TestDepartment2'}
        response = self.client.post(self.url, data, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('company', response.data)

    def test_create_department_invalid_name(self):
        data = {
            'name': 'Invalid@Name!',
            'company': self.company.id
        }
        response = self.client.post(self.url, data, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)

    def test_create_department_without_authorization(self):
        response = self.client.post(self.url, self.data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_department_with_invalid_token(self):
        headers = HTTP_AUTHORIZATION_HEADER('invalidtoken')
        response = self.client.post(self.url, self.data, **headers)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class DepartmentRetrieveUpdateDestroyViewTestCase(APITestCase):
    def setUp(self):
        self.company = Company.objects.create(name='TestCompany')
        self.department = Department.objects.create(name='TestDepartment', company=self.company)
        self.url = reverse('company:department-detail', args=[self.department.id])
        self.admin_user = create_admin_user()
        self.refresh_token, self.access_token = authenticate_user(self.admin_user)
        self.headers = HTTP_AUTHORIZATION_HEADER(self.access_token)
        self.data = {
            'name': 'UpdatedDepartment',
            'company': self.company.id
        }

    def test_update_department_success(self):
        response = self.client.put(self.url, self.data, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('name', response.data)
        self.assertEqual(response.data['name'], 'UpdatedDepartment')

    def test_update_department_invalid_name(self):
        self.data['name'] = 'Invalid@Name!'
        response = self.client.put(self.url, self.data, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)

    def test_delete_department_success(self):
        response = self.client.delete(self.url, **self.headers)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Department.objects.filter(id=self.department.id).exists())

    def test_delete_department_without_authorization(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_department_with_invalid_token(self):
        headers = HTTP_AUTHORIZATION_HEADER('invalidtoken')
        response = self.client.delete(self.url, **headers)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
