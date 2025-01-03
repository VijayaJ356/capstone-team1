**API contract between the Backend and front-end**

Customer Registration
----------------

Customer Object
```
{
  "username": "nitin16",
  "password": "Pass11*",
  "name": {
    "first": "nitin",
    "last": "16"
  },
  "dob": "1990-01-03",
  "sex": "MALE",
  "email": "nitin16@email.com",
  "address": {
    "houseNo": "89",
    "street": "street",
    "city": "city",
    "pin": "pin",
    "state": "kar",
    "country": "IND"
  },
  "active": true,
  "createdAt": "2025-01-03T02:05:15.375Z",
  "firstTimeLogin": true,
  "passwordHistory": [
    "string"
  ],
  "resetPasswordToken": "string",
  "resetPasswordTokenExpiry": "2025-01-03T02:05:15.375Z",
  "verificationToken": "string",
  "verificationTokenExpiry": "2025-01-03T02:05:15.375Z",
  "passwordExpiryDate": "2025-01-03T02:05:15.375Z",
  "passwordLastUpdated": "2025-01-03T02:05:15.375Z"
}
```
Transaction Object
```
{
"id": "6776e4eb3578da00dd0f99e8",
"username": "nitin17",
  "creditcards": [
    {
      "creditCardId": 1,
      "transactions": [
        {
          "transactionId": "26323484",
          "transactionDate": "4/17/2024",
          "transactionTime": "2:40 PM",
          "transactionType": "cr",
          "transactionAmount": 1000
        }
      ]
    }
  ]
}
```
## HTTP Method
### 1. User Story: Register as customer valid case
### GET /api/customer/register
### Url
```
http://{hostname}/api/customer/register
```
**Body** 
```
{
  "username": "nitin16",
  "password": "Pass11*",
  "name": {
    "first": "nitin",
    "last": "16"
  },
  "dob": "1990-01-03",
  "sex": "MALE",
  "email": "nitin16@email.com",
  "address": {
    "houseNo": "89",
    "street": "street",
    "city": "city",
    "pin": "pin",
    "state": "kar",
    "country": "IND"
  },
  "active": true,
  "createdAt": "2025-01-03T02:05:15.375Z",
  "firstTimeLogin": true,
  "passwordHistory": [
    "string"
  ],
  "resetPasswordToken": "string",
  "resetPasswordTokenExpiry": "2025-01-03T02:05:15.375Z",
  "verificationToken": "string",
  "verificationTokenExpiry": "2025-01-03T02:05:15.375Z",
  "passwordExpiryDate": "2025-01-03T02:05:15.375Z",
  "passwordLastUpdated": "2025-01-03T02:05:15.375Z"
}
```
**Success Response:**

Code: 200
Content:
```
Customer Registered Successfully, please validate your credit card on first login
```
## HTTP Method
### 2.1 User Story: Register as customer invalid case
### GET /api/customer/register
### Url
```
http://{hostname}/api/customer/register
```
**Body** 
```
{
  "username": "nitin16",
  "password": "Pass11*",
  "name": {
    "first": "nitin",
    "last": "16"
  },
  "dob": "1990-01-03",
  "sex": "MALE",
  "email": "nitin16@email.com",
  "address": {
    "houseNo": "89",
    "street": "street",
    "city": "city",
    "pin": "pin",
    "state": "kar",
    "country": "IND"
  },
  "active": true,
  "createdAt": "2025-01-03T02:05:15.375Z",
  "firstTimeLogin": true,
  "passwordHistory": [
    "string"
  ],
  "resetPasswordToken": "string",
  "resetPasswordTokenExpiry": "2025-01-03T02:05:15.375Z",
  "verificationToken": "string",
  "verificationTokenExpiry": "2025-01-03T02:05:15.375Z",
  "passwordExpiryDate": "2025-01-03T02:05:15.375Z",
  "passwordLastUpdated": "2025-01-03T02:05:15.375Z"
}
```
**Success Response:**

Code: 200
Content:
```
Please validate the data: username already exists
```
## HTTP Method
### 2.2. User Story: Register as customer invalid case
### GET /api/customer/register
### Url
```
http://{hostname}/api/customer/register
```
**Body** 
```
{
  "username": "nitin100",
  "password": "Pass11*",
  "name": {
    "first": "nitin",
    "last": "16"
  },
  "dob": "1990-01-03",
  "sex": "MALE",
  "email": "nitin16@email.com",
  "address": {
    "houseNo": "89",
    "street": "street",
    "city": "city",
    "pin": "pin",
    "state": "kar",
    "country": "IND"
  },
  "active": true,
  "createdAt": "2025-01-03T02:05:15.375Z",
  "firstTimeLogin": true,
  "passwordHistory": [
    "string"
  ],
  "resetPasswordToken": "string",
  "resetPasswordTokenExpiry": "2025-01-03T02:05:15.375Z",
  "verificationToken": "string",
  "verificationTokenExpiry": "2025-01-03T02:05:15.375Z",
  "passwordExpiryDate": "2025-01-03T02:05:15.375Z",
  "passwordLastUpdated": "2025-01-03T02:05:15.375Z"
}
```
**Success Response:**

Code: 200
Content:
```
Please validate the data: Email already exists
```
## HTTP Method
### 3. User Story: list the transaction based on description spent 
### GET /api/customer/register
### Url
```
http://{hostname}/api/{transcationtype}
```
**URL Params:** transcationtype 
**Success Response:**

Code: 200
Content:
```
{
    "transactionId": 762934044678,
    "transactionDate": "6/20/2024",
    "transactionTime": "4:43 AM",
    "transactionType": "cr",
    "transactionAmount": 1892.62
  },
  {
    "transactionId": 762934042368,
    "transactionDate": "1/17/2024",
    "transactionTime": "7:43 PM",
    "transactionType": "cr",
    "transactionAmount": 1143.43
  },
  {
    "transactionId": 762934045851,
    "transactionDate": "1/8/2024",
    "transactionTime": "1:09 PM",
    "transactionType": "cr",
    "transactionAmount": 2155.54
  },
```
## HTTP Method
### 4. User Story: Update Email Address for existing User
### GET /api/customer/{username}/email
### Url
```
http://{hostname}/api/customer/nitin14/email
```
**URL Params:** username 
**Body**
```
{
  "newEmail": "nitin14new@example.com"
}
```
**Success Response:**

Code: 200
Content:
```
Email updated successfully
```
## HTTP Method
### 5. User Story: Update Address for existing User
### GET /api/customer/{username}/address
### Url
```
http://{hostname}/api/customer/nitin14/address
```
**URL Params:** username 
**Body**
```
{
  "houseNo": "80",
  "street": "newstreet",
  "city": "newcity",
  "pin": "newpin",
  "state": "newstate",
  "country": "newcountry"
}
```
**Success Response:**

Code: 200
Content:
```
Address updated successfully
```










