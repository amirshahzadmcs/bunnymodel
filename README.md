# BunnyModels API

A robust Laravel-based REST API designed for managing members and model profiles. It provides a comprehensive and secure backend solution for a modeling agency or a similar platform, offering a full range of features from user authentication to public content display.

---

### 🚀 Features

* **Member Management:** Registration, login, and profile management.
* **Authentication:** Sanctum-based token authentication for secure access.
* **Password Reset:** A secure OTP-based password reset system.
* **Model Profiles:** Public model listing with pagination.
* **API Security:** All routes are protected with Laravel middleware.
* **Error Handling:** Comprehensive JSON error responses for failed requests.


### 🛠️ Installation

1.  **Clone the Repository**

    ```bash
    git clone <repository-url>
    cd project-name
    ```

2.  **Install Dependencies**

    ```bash
    composer install
    ```

3.  **Environment Setup**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4.  **Database Configuration**

    Edit your `.env` file with your database credentials.

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=bunnymodels
    DB_USERNAME=root
    DB_PASSWORD=
    ```

5.  **Run Migrations**

    ```bash
    php artisan migrate
    ```

6.  **Install Sanctum**

    ```bash
    php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
    php artisan migrate
    ```

7.  **Start Development Server**

    ```bash
    php artisan serve
    ```