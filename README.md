# FinTech-Platform
Simbrella is a secure and scalable FinTech platform designed to facilitate seamless financial transactions. Built using Laravel for the backend and Next.js with React for the frontend, this application provides users with a robust interface for managing their financial activities, including user registration, bank account linking, deposits, and withdrawals.

Key Features
User Authentication: Secure registration and login functionality using JWT for user authentication.
Bank Account Linking: Integration with Paystack for easy linking of bank accounts.
Transaction Management: Users can deposit and withdraw funds, with a complete history of their transactions.
Real-Time Notifications: Instant notifications for deposits and withdrawals using Laravel Echo and Pusher.
Responsive Design: A user-friendly interface built with TailwindCSS for a smooth experience across devices.
Testing: Comprehensive testing with PHPUnit for the backend and Jest/Cypress for the frontend to ensure functionality and reliability.

Technologies Used
Backend: PHP, Laravel
Frontend: JavaScript, React, Next.js, TailwindCSS
Database: MySQL
Payment Integration: Paystack
Real-Time Features: Laravel Echo, Pusher
Testing: PHPUnit, Jest, Cypress

API Documentation with Postman: https://api.postman.com/collections/39268261-fb8bad20-eb97-42fa-90f2-26d5160fa3cd?access_key=PMAT-01JB7CYYF9MWKDEN3KK4PCZHZ0
Also note the Api exported file is also on the repository

DEPLOYMENT INSTRUCTUCTION

Clone the Repository: git clone [repository_url]
Update environment variables, such as database credentials on the .env, API keys e.g. Stripe, pusher, and base URLs, as needed.

Docker Setup:
To start the application with Docker, simply run
docker-compose up --build
This will spin up the backend, frontend, and database containers.

Backend Setup (Laravel):

Navigate to the backend folder
cd fintech-platform
composer install
php artisan migrate - create the tables on your database
php artisan serve

Frontend Setup (Next.js):

Navigate to the frontend folder:
cd fintech-frontend
npm install
npm run dev

Testing
Backend: Run PHPUnit tests with
php artisan test
npm run test

