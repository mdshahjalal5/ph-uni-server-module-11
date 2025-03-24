GET  http://localhost:3000/api/v1/students
GET  http://localhost:3000/api/v1/studentss
GET  http://localhost:3000/api/v1/students/333333333
GET  http://localhost:3000/api/v1/students/33333333
DELETE  http://localhost:3000/api/v1/students/33333333
POST http://localhost:3000/api/v1/students/create-student
Content-Type: application/json

{
  "student": {
    "id":"333333333",
    "password":"shahjalal",
    "name": {
      "firstName": "Rohna",
      "middleName": "Michael",
      "lastName": "Doe"
    },
    "gender": "male",
    "dateOfBirth": "2005-08-15",
    "email": "johnatmimidoe@examplee.com",
    "contactNo": "+8801712345678",
    "emergencyContactNo": "+8801812345678",
    "bloodGroup": "O+",
    "presentAddress": "123 Street Name, Dhaka, Bangladesh",
    "permanentAddress": "456 Another Street, Gazipur, Bangladesh",
    "guardian": {
      "fatherName": "Robert Doe",
      "fatherOccupation": "Engineer",
      "fatherContactNo": "+8801912345678",
      "motherName": "Sarah Doe",
      "motherOccupation": "Teacher",
      "motherContact": "+8801923456789"
    },
    "localGuardian": {
      "name": "Uncle Tom",
      "occupation": "Businessman",
      "address": "789 Guardian Street, Dhaka, Bangladesh",
      "contactNo": "+8801934567890"
    },
    "profileImage": "https://example.com/profile/johndoe.jpg",
    "isActive": "active"
  }
}

