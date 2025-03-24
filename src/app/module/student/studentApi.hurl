GET  http://localhost:3000/api/v1/students
GET  http://localhost:3000/api/v1/studentss
GET  http://localhost:3000/api/v1/students/333333333
GET  http://localhost:3000/api/v1/students/33333333
DELETE  http://localhost:3000/api/v1/students/33333333
POST http://localhost:3000/api/v1/users/create-student
Content-Type: application/json

{

  "student": {
  "password": "securepassword123",
  "name": {
    "firstName": "John",
    "middleName": "Michael",
    "lastName": "Doe"
  },
  "gender": "male3",
  "dateOfBirth": "2002-05-15",
  "email": "johndroe@example.com",
  "contactNo": "+8801712345678",
  "emergencyContactNo": "+8801711122233",
  "bloodGroup": "O+",
  "presentAddress": "123 Street, Dhaka, Bangladesh",
  "permanentAddress": "456 Avenue, Gazipur, Bangladesh",
  "guardian": {
    "fatherName": "Robert Doe",
    "fatherOccupation": "Engineer",
    "fatherContactNo": "+8801719988776",
    "motherName": "Sarah Doe",
    "motherOccupation": "Teacher",
    "motherContactNo": "+8801716655443"
  },
  "localGuardian": {
    "name": "Uncle Sam",
    "occupation": "Businessman",
    "contactNo": "+8801912345678",
    "address": "789 Road, Dhaka, Bangladesh"
  },
  "profileImage": "https://example.com/profile.jpg"
}

}

