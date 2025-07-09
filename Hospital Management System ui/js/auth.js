// Base URL for the API
const API_URL = 'http://localhost:8080/api';

// Function to handle user login
function login(username, password) {
    // Show loading spinner
    showSpinner();
    
    // Create request payload
    const loginData = {
        username: username,
        password: password
    };
    
    // Send login request
    fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid credentials');
        }
        return response.json();
    })
    .then(data => {
        // Store JWT token and user info in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
            id: data.id,
            username: data.username,
            email: data.email,
            role: data.role
        }));
        
        // Redirect user based on role
        redirectBasedOnRole(data.role);
    })
    .catch(error => {
        // Display error message
        $('#alertMessage').html(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${error.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
    })
    .finally(() => {
        // Hide loading spinner
        hideSpinner();
    });
}

// Function to handle user registration
function register(userData) {
    // Show loading spinner
    showSpinner();
    
    // Send registration request
    fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(text || 'Registration failed');
            });
        }
        return response.text();
    })
    .then(data => {
        // Display success message
        $('#alertMessage').html(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                Registration successful! You can now <a href="login.html">login</a>.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
        
        // Clear form
        $('#registerForm')[0].reset();
    })
    .catch(error => {
        // Display error message
        $('#alertMessage').html(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${error.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
    })
    .finally(() => {
        // Hide loading spinner
        hideSpinner();
    });
}

// Function to redirect user based on role
function redirectBasedOnRole(role) {
    switch(role) {
        case 'ADMIN':
            window.location.href = 'admin/dashboard.html';
            break;
        case 'DOCTOR':
            window.location.href = 'doctor_dashboard.html';
            break;
        case 'PATIENT':
            window.location.href = 'patient_dashboard.html';
            break;
        default:
            window.location.href = 'index.html';
    }
}

// Function to check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('token') !== null;
}

// Function to get the current logged in user
function getCurrentUser() {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
}

// Function to logout user
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../index.html';
}

// Function to set up auth header
function getAuthHeader() {
    const token = localStorage.getItem('token');
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

// Function to show loading spinner
function showSpinner() {
    // Create spinner overlay if it doesn't exist
    if (!$('.spinner-overlay').length) {
        $('body').append(`
            <div class="spinner-overlay">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `);
    }
    
    $('.spinner-overlay').show();
}

// Function to hide loading spinner
function hideSpinner() {
    $('.spinner-overlay').hide();
}

// Check if user is already logged in on login/register pages
$(document).ready(function() {
    // Check if we're on login or register page
    const isAuthPage = window.location.pathname.includes('login.html') || 
                     window.location.pathname.includes('register.html');
                     
    if (isAuthPage && isLoggedIn()) {
        const user = getCurrentUser();
        if (user) {
            redirectBasedOnRole(user.role);
        }
    }
}); 