# Full-Stack Task

## Requirements
1. Backend
    - [x] User logic is in a separate app called `users`.
    - [x] Company Model.
    - [x] Department Model.
    - [x] Employee Model.
    - [x] Validations & Business Logic.
    - [x] Security & Permissions.
    - [x] APIs.
    - [x] Testing **(Bonus)**.
    - [x] Logging **(Bonus)**.
    - [x] Change Password endpoint **(Bonus)**.
    - [x] Reset Password endpoint **(Bonus)**.
2. Front End
    - [x] Login Page.
    - [x] Company Management.
    - [x] Department Management.
    - [x] Employee Management.
    - [x] User Account Management **(Bonus)**.
    - [x] Department Management.
    - [x] Validations.
3. API Integration
    - [x] Integrate the frontend application with the backend API to facilitate data exchange.
    - [x] Implement the features in the front end by utilizing the provided APIs.
    - [x] Ensure that authentication and authorization are always handled throughout user activity.
    - [x] Handle all server-side thrown errors from API responses and provide appropriate & user-friendly messages as feedback to users.
    - [x] Ensure smooth user experience by managing loading states and displaying relevant messages.

## Technologies
- ReactJS
- Django REST Framework
- JWT
- PostgresSQL
- Version Controle (GIT)
- Docker
- Nginx



## Setup
**1. Make sure you have [Docker](https://www.docker.com/) installed on your PC and it's running.**

**2. Clone the repository or download a `ZIP`:**
```bash
git clone https://github.com/mahmoudhaney/BrainWiseTask.git

```

**3. Navigate to the directory where the application is installed, create a `.env` file with the following variables:**
```
SECRET_KEY = 'type_your_seceret_key_here'

DEV_DB_NAME = 'developmentdb'
DEV_DB_USER = 'postgres'
DEV_DB_PASSWORD = 'developmentpassword'
DEV_DB_HOST = 'postgres'
DEV_DB_PORT = '5432'

EMAIL_HOST_USER = 'test_email@example.com'
EMAIL_HOST_PASSWORD = 'your_email_host_password_here'
```

**4. Run the project**
Run in a **Development Environment**
```bash
docker-compose up
```



> ⚠ Then, the development server will be started at `http://localhost`

#
