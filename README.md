# [Bike Servicing API](https://blogging-fawn-gamma.vercel.app/)

This project provides a RESTful API for managing a bike servicing center's operations, including customer, bike, and service record management. It supports full CRUD operations for customers and their bikes, as well as for service records. Special endpoints allow the assignment and completion of servicing jobs, enabling streamlined tracking of bike service progress. The API uses Prisma ORM with PostgreSQL and UUIDs for primary keys. Technologies used include Node.js, Express.js, and TypeScript. The system also features real-time status tracking for servicing jobs through statuses like “pending,” “in-progress,” and “done.”

---


## Live Links


- **Backend (Live)**: [Portfolio Backend](https://portfolio-backend5.vercel.app/)

## Source Code

- **Backend Source Code**: [Portfolio Backend GitHub](https://github.com/Md-sakib-al-hasan/PortfolioBackend5)

---

## Table of Contents


- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)



---

## Technologies

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL,Prisma ORM 
- **Validation**: Zod
- **TypeScript**: Ensures type safety across the application
- **Database Schema**: Ensures type safety across the application

---

## Installation

### Prerequisites

1. Node.js (v14 or later)
2. Postgres (local or cloud instance)
3. TypeScript (v4 or later)
4. ESLint (for linting TypeScript files)
5. Prettier (for code formatting)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Md-sakib-al-hasan/blogging

   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following environment variables:

   ```plaintext
   NODE_ENV=development
   DATABASE_URL="postgresql://usrname:password@localhost:portnumber/databasename?schema"
   PORT=3001
   bcrypt_salt_rounds=10
   ```

4. Start the server:
   ```bash
      npm run start
   ```

---

## Environment Variables

The application requires the following environment variables to be set in a .env file:

| Variable              | Description                                                             |
| --------------------- | ----------------------------------------------------------------------- |
| NODE_ENV              | The environment (e.g., development or production).                      |
| PORT                  | Port on which the server will run (default: 3001).                      |
| DATABASE_URL          | postgres connection string. Replace with your actual connection details. |                      |
| BCRYPT_SALT_ROUNDS    | Number of salt rounds for bcrypt hashing (e.g., 10).                    |

---

# API Endpoints

## Customer

| HTTP Method | Endpoint                         | Description                                                                         |
| ----------- | -------------------------------- | ----------------------------------------------------------------------------------- |
| `POST`      | `/api/customers`                 | Create a new Customer  |
| `GET`       | `/api/customers`                 | To see All Customer,                                                                |
| `GET`       | `/api/customers/(id)`            | To see Single Customer,                                                             |
| `PUT`       | `/api/customers/(id)`            | To update Single Customer,                                                          |
| `DELETE`    | `/api/customers/(id)`            | To Dlete Single Customer,



                                                           |
## Bike

| HTTP Method | Endpoint                         | Description                                                                         |
| ----------- | -------------------------------- | ----------------------------------------------------------------------------------- |
| `POST`      | `/api/bikes`                     | Create a new BiKe                                                                   |
| `GET`       | `/api/bikes`                     | To see All Bikes,                                                                   |
| `GET`       | `/api/bikes/(id)`                | To see Single Bike,                                                                 |

## Services

| HTTP Method | Endpoint                         | Description                                                                         |
| ----------- | -------------------------------- | ----------------------------------------------------------------------------------- |
| `POST`      | `/api/services`                  | Create a new Service                                                                |
| `GET`       | `/api/services`                  | To see All services,                                                                |
| `GET`       | `/api/services/(id)`             | To see Single services,                                                             |
| `PUT`       | `/api/services/(id)`             | To update Single services completionDate date ,                                     |
| `GET`       | `/api/services/status`           | To see Pending or Overdue Services (older than 7 days) ,                            |



---


### 🧱 **Database Schema**

Use Prisma with UUIDs for all primary keys.

#### 1\. **Customer Table**

| Field | Type | Description |
| ---| ---| --- |
| `customerId` | UUID | Unique identifier for the customer |
| `name` | String | Full name of the customer |
| `email` | String | Unique email |
| `phone` | String | Contact number |
| `createdAt` | DateTime | Auto timestamp when created |

* * *

#### 2\. **Bike Table**

| Field | Type | Description |
| ---| ---| --- |
| `bikeId` | UUID | Unique identifier for each bike |
| `brand` | String | Brand of the bike (e.g., Honda, Yamaha) |
| `model` | String | Model name |
| `year` | Int | Manufacturing year |
| `customerId` | UUID | Foreign key referencing Customer |

* * *

#### 3\. **ServiceRecord Table**

| Field | Type | Description |
| ---| ---| --- |
| `serviceId` | UUID | Unique identifier for the service record |
| `bikeId` | UUID | FK to Bike |
| `serviceDate` | DateTime | Date the service started |
| `completionDate` | DateTime | Nullable. Date the service completed |
| `description` | String | Details of service (e.g., oil change) |
| `status` | String | Status: “pending”, “in-progress”, “done” |


### 📦 **API Features & Endpoints**

* * *

#### 1\. **Customer Management**

* * *

### ✅ **1\.** **`POST /api/customers`** **- Create a new customer**

#### 📥 Request Body

```perl
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "123-456-7890"
}
```

#### 📤 Response Example (201 Created)

```json
{
  "success": true,
  "message": "Customer created successfully",
  "data": {
    "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "createdAt": "2025-04-11T12:34:56.789Z"
  }
}
```

* * *

### ✅ **2\.** **`GET /api/customers`** **- Get all customers**

#### 📤 Response Example (200 Ok)

```perl
{
  "success": true,
  "message": "Customers fetched successfully",
  "data": [
    {
      "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890",
      "createdAt": "2025-04-11T12:34:56.789Z"
    },
    {...}
  ]
}
```

* * *

### ✅ **3\.** **`GET /api/customers/87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194`** **- Get a specific customer by ID**

#### 📤 Response Example (200 Ok)

```json
{
  "success": true,
  "message": "Customer fetched successfully",
  "data": {
    "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "createdAt": "2025-04-11T12:34:56.789Z"
  }
}
```

* * *

### ✅ **4\.** **`PUT /api/customers/87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194`** **- Update customer details**

#### 📥 Request Body (any of the fields can be updated)

```json
{
  "name": "Johnathan Doe",
  "phone": "555-123-9999"
}
```

#### 📤 Response Example (200 Ok)

```json
{
  "success": true,
  "message": "Customer updated successfully",
  "data": {
    "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194",
    "name": "Johnathan Doe",
    "email": "john.doe@example.com",
    "phone": "555-123-9999",
    "createdAt": "2025-04-11T12:34:56.789Z"
  }
}
```

####   

* * *

### ✅ **5\.** **`DELETE /api/customers/87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194`** **- Delete a customer**

#### 📤 Response Example (200 Ok)

```json
{
  "success": true,
  "message": "Customer deleted successfully"
}
```


#### 2\. **Bike Management**

* * *

### ✅ **1\.** **`POST /api/bikes`** **- Add a new bike**

#### 📥 Request Body (201 Created)

```json
{
  "brand": "Yamaha",
  "model": "R15",
  "year": 2022,
  "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194"
}
```

#### 📤 Response Example (200 Ok)

```json
{
  "success": true,
  "message": "Bike added successfully",
  "data": {
    "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
    "brand": "Yamaha",
    "model": "R15",
    "year": 2022,
    "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194"
  }
}
```

* * *

### ✅ **2\.** **`GET /api/bikes`** **- Get all bikes**

#### 📤 Response Example (200 Ok)

```json
{
  "success": true,
  "message": "Bikes fetched successfully",
  "data": [
    {
      "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
      "brand": "Yamaha",
      "model": "R15",
      "year": 2022,
      "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194"
    }
  ]
}
```

* * *

### ✅ **3\.** **`GET /api/bikes/f3f1b192-3e62-402e-9bd3-d351a5a10e92`** **- Get a specific bike by ID**

#### 📤 Response Example (200 Ok)

```json
{
  "success": true,
  "message": "Bike fetched successfully",
  "data": {
    "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
    "brand": "Yamaha",
    "model": "R15",
    "year": 2022,
    "customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194"
  }
}
```


#### 3\. **Service Management**

* * *

### ✅ **1\.** **`POST /api/services`** **– Create a service record**

#### 📥 Request Body

```json
{
  "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
  "serviceDate": "2025-04-11T10:00:00.000Z",
  "description": "Oil change",
  "status": "pending"
}
```

#### 📤 Response Example (201 Created)

```json
{
  "success": true,
  "message": "Service record created successfully",
  "data": {
    "serviceId": "a1e4a182-c80d-4ff7-9a3d-873929f9d0e6",
    "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
    "serviceDate": "2025-04-11T10:00:00.000Z",
    "completionDate": null,
    "description": "Oil change",
    "status": "pending"
  }
}
```

* * *

### ✅ **2\.** **`GET /api/services`** **– Get all service records**

#### 📤 Response Example (200 Ok)

```json
{
  "success": true,
  "message": "Service records fetched successfully",
  "data": [
    {
      "serviceId": "a1e4a182-c80d-4ff7-9a3d-873929f9d0e6",
      "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
      "serviceDate": "2025-04-11T10:00:00.000Z",
      "completionDate": null,
      "description": "Oil change",
      "status": "pending"
    },
    {...}
  ]
}
```

* * *

### ✅ **3\.** **`GET /api/services/a1e4a182-c80d-4ff7-9a3d-873929f9d0e6`** **– Get a specific service record**

#### 📤 Response Example (200 Ok)

```json
{
  "success": true,
  "message": "Service record fetched successfully",
  "data": {
    "serviceId": "a1e4a182-c80d-4ff7-9a3d-873929f9d0e6",
    "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
    "serviceDate": "2025-04-11T10:00:00.000Z",
    "completionDate": null,
    "description": "Oil change",
    "status": "pending"
  }
}
```

* * *

### ✅ **4\.** **`PUT /api/services/a1e4a182-c80d-4ff7-9a3d-873929f9d0e6/complete`** **– Mark a service as completed**

#### 📥 Request Body (optional: custom `completionDate`, else default to `now`)

```json
{
  "completionDate": "2025-04-11T15:30:00.000Z"
}
```

#### 📤 Response Example (200 Ok)

```json
{
  "success": true,
  "message": "Service marked as completed",
  "data": {
    "serviceId": "a1e4a182-c80d-4ff7-9a3d-873929f9d0e6",
    "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
    "serviceDate": "2025-04-11T10:00:00.000Z",
    "completionDate": "2025-04-11T15:30:00.000Z",
    "description": "Oil change",
    "status": "done"
  }
}
```

* * *

### 🎁 **Bonus (10 Marks)**

#### 🧯 **Error Handling**

### **Standardized Error Response Structure**

```plain
{
  "success": false,
  "status": 404,
  "message": "Customer not found",
  "stack": "Optional stack trace shown only in development"
}


```

#### ⏳ **Pending or Overdue Services**

### ✅ **GET** **`/api/services/status`** **– Pending or Overdue Services (older than 7 days)**

This route returns all services that:

*   Have `status` = `"pending"` or `"in-progress"`, **and**
*   `serviceDate` is **older than 7 days**

* * *

### 📤 Response Example (200 Ok)

```json
{
  "success": true,
  "message": "Overdue or pending services fetched successfully",
  "data": [
    {
      "serviceId": "a1e4a182-c80d-4ff7-9a3d-873929f9d0e6",
      "bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
      "serviceDate": "2025-04-01T10:00:00.000Z",
      "completionDate": null,
      "description": "Oil change",
      "status": "pending"
    },
    {
      "serviceId": "c9bce2ff-44a2-4b3f-bef7-04f5e35d21d2",
      "bikeId": "a3d2d3cb-f72f-4b63-a7d6-20e57bc30ef1",
      "serviceDate": "2025-04-02T12:00:00.000Z",
      "completionDate": null,
      "description": "Engine tuning",
      "status": "in-progress"
    }
  ]
}
```






