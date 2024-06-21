# AuthApp

AuthApp is a full-stack authentication application designed for web developers looking to implement secure, role-based access control in their applications. This project demonstrates a robust setup for user registration, email verification, login, and role management for customers and admins.

## Fetures

User registration with role-based assignment (customer or admin)

Email verification for newly registered users

Secure login with JWT authentication

Role-based access control

User dashboard displaying user information

Logout functionality

## Installation

Backend Setup:
```bash
cd backend
npm install
```


.env variabels:
```bash
SECRET_KEY=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_db_password
DB_NAME=my_app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-email-password
```

sql:
```bash
CREATE DATABASE my_app;
npx sequelize-cli db:migrate
npm run dev
```




FrontEnd setUp:
```bash
cd ../frontend
npm install
npm run dev
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
