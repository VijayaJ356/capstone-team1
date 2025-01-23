**API contract between the Backend and front-end**

Customer Registration
----------------

Customer Object
```
{
  "username": "nitinchandrasp1",
  "password": "Pass@123",
  "name": {
    "first": "Nitin Chandra",
    "last": "S P1"
  },
  "dob": "1990-01-22",
  "sex": "MALE",
  "email": "nitinchandrasp1@gmail.com",
  "address": {
    "houseNo": "Houseno1",
    "street": "Street1",
    "city": "City1",
    "pin": "Pin1",
    "state": "State1",
    "country": "Country1"
  }
}
```
Transaction Object
```
{
  "username": "nitin4",
  "creditcards": [
    {
      "creditCardId": 1,
      "transactions": [
        {
          "transactionDate": "4/17/2024",
          "transactionTime": "2:40 PM",
          "transactionType": "cr",
          "transactionAmount": 1000.0
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
  "username": "nitinchandrasp1",
  "password": "Pass@123",
  "name": {
    "first": "Nitin Chandra",
    "last": "S P1"
  },
  "dob": "1990-01-22",
  "sex": "MALE",
  "email": "nitinchandrasp1@gmail.com",
  "address": {
    "houseNo": "Houseno1",
    "street": "Street1",
    "city": "City1",
    "pin": "Pin1",
    "state": "State1",
    "country": "Country1"
  }
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
  "username": "nitinchandrasp1",
  "password": "Pass@123",
  "name": {
    "first": "Nitin Chandra",
    "last": "S P1"
  },
  "dob": "1990-01-22",
  "sex": "MALE",
  "email": "nitinchandrasp1@gmail.com",
  "address": {
    "houseNo": "Houseno1",
    "street": "Street1",
    "city": "City1",
    "pin": "Pin1",
    "state": "State1",
    "country": "Country1"
  }
}
```
**Success Response:**

Code: 400
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
{
  "username": "nitinchandrasp12",
  "password": "Pass@123",
  "name": {
    "first": "Nitin Chandra",
    "last": "S P1"
  },
  "dob": "1990-01-22",
  "sex": "MALE",
  "email": "nitinchandrasp1@gmail.com",
  "address": {
    "houseNo": "Houseno1",
    "street": "Street1",
    "city": "City1",
    "pin": "Pin1",
    "state": "State1",
    "country": "Country1"
  }
}
```
**Success Response:**

Code: 400
Content:
```
Please validate the data: Email already exists
```
## HTTP Method
### 2.3. User Story: Register as customer invalid case
### GET /api/customer/register
### Url
```
http://{hostname}/api/customer/register
```
**Body** 
{
  "username": "niti",
  "password": "Pass@123",
  "name": {
    "first": "Nitin Chandra",
    "last": "S P1"
  },
  "dob": "1990-01-22",
  "sex": "MALE",
  "email": "nitinchandrasp1@gmail.com",
  "address": {
    "houseNo": "Houseno1",
    "street": "Street1",
    "city": "City1",
    "pin": "Pin1",
    "state": "State1",
    "country": "Country1"
  }
}
```
**Success Response:**

Code: 400
Content:
```
{
  "username": "Username must be at least 6 characters"
}
```

## HTTP Method
### 2.4. User Story: Register as customer invalid case
### GET /api/customer/register
### Url
```
http://{hostname}/api/customer/register
```
**Body** 
{
  "username": "niti",
  "password": "Pass",
  "name": {
    "first": "Nitin Chandra",
    "last": "S P1"
  },
  "dob": "1990-01-22",
  "sex": "MALE",
  "email": "nitinchandrasp1@gmail.com",
  "address": {
    "houseNo": "Houseno1",
    "street": "Street1",
    "city": "City1",
    "pin": "Pin1",
    "state": "State1",
    "country": "Country1"
  }
}
```
**Success Response:**

Code: 400
Content:
```
{
  "password": "Password must contain at least one special character"
}
```

**## HTTP Method
### 3. User Story: list the transaction based on description spent by user
### GET /api/customer/register
### Url**
```
http://{hostname}/api/{transcationtype}
```
**URL Params:** username 
**URL Params:** transcationtype 
**Success Response:**

Code: 200
Content:
```

  {
    "transactionId": 562399765992,
    "transactionDate": "4/17/2024",
    "transactionTime": "2:40 PM",
    "transactionType": "cr",
    "transactionAmount": 1000
  }

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










