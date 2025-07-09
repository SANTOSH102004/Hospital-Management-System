// Update navigation based on authentication status
$(document).ready(function() {
    updateNavigation();
});

// Function to update navigation links based on authentication status
function updateNavigation() {
    const navbarItems = $('#navbar-items');
    
    // Clear existing items
    navbarItems.empty();
    
    // Add Home link
    navbarItems.append(`
        <li class="nav-item">
            <a class="nav-link ${isActivePage('index.html') ? 'active' : ''}" href="index.html">Home</a>
        </li>
    `);
    
    if (isLoggedIn()) {
        const user = getCurrentUser();
        
        // Add Dashboard link based on user role
        if (user) {
            switch (user.role) {
                case 'ADMIN':
                    navbarItems.append(`
                        <li class="nav-item">
                            <a class="nav-link" href="admin/dashboard.html">Dashboard</a>
                        </li>
                    `);
                    break;
                case 'DOCTOR':
                    navbarItems.append(`
                        <li class="nav-item">
                            <a class="nav-link" href="doctor/dashboard.html">Dashboard</a>
                        </li>
                    `);
                    break;
                case 'PATIENT':
                    navbarItems.append(`
                        <li class="nav-item">
                            <a class="nav-link" href="patient/dashboard.html">Dashboard</a>
                        </li>
                    `);
                    break;
            }
        }
        
        // Add Logout link
        navbarItems.append(`
            <li class="nav-item">
                <a class="nav-link" href="#" id="logoutLink">Logout</a>
            </li>
        `);
        
        // Add event listener for logout
        $('#logoutLink').on('click', function(e) {
            e.preventDefault();
            logout();
        });
    } else {
        // Add Login and Register links for non-authenticated users
        navbarItems.append(`
            <li class="nav-item">
                <a class="nav-link ${isActivePage('login.html') ? 'active' : ''}" href="login.html">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link ${isActivePage('register.html') ? 'active' : ''}" href="register.html">Register</a>
            </li>
        `);
    }
}

// Helper function to check if the current page matches the given page name
function isActivePage(pageName) {
    const currentPath = window.location.pathname;
    return currentPath.endsWith(pageName);
}

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to format date and time
function formatDateTime(dateTimeString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
}

// Generic function to create pagination
function createPagination(totalPages, currentPage, onPageChange) {
    const pagination = $('<ul class="pagination justify-content-center"></ul>');
    
    // Previous button
    const prevLi = $(`
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
    `);
    
    prevLi.on('click', function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    });
    
    pagination.append(prevLi);
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const pageLi = $(`
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#">${i}</a>
            </li>
        `);
        
        pageLi.on('click', function(e) {
            e.preventDefault();
            onPageChange(i);
        });
        
        pagination.append(pageLi);
    }
    
    // Next button
    const nextLi = $(`
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    `);
    
    nextLi.on('click', function(e) {
        e.preventDefault();
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    });
    
    pagination.append(nextLi);
    
    return pagination;
}

// Function to show notification
function showNotification(message, type = 'success') {
    const alertDiv = $(`
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `);
    
    $('#alertContainer').append(alertDiv);
    
    // Auto dismiss after 5 seconds
    setTimeout(function() {
        alertDiv.alert('close');
    }, 5000);
}

// Function to generate a unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Function to validate form input
function validateInput(input, validationFunction, errorMessage) {
    const isValid = validationFunction(input.value);
    if (!isValid) {
        input.classList.add('is-invalid');
        const feedback = document.createElement('div');
        feedback.classList.add('invalid-feedback');
        feedback.textContent = errorMessage;
        input.parentNode.appendChild(feedback);
    } else {
        input.classList.remove('is-invalid');
        const existingFeedback = input.parentNode.querySelector('.invalid-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
    }
    return isValid;
}

// Protect routes that require authentication
function protectRoute() {
    if (!isLoggedIn()) {
        window.location.href = '../login.html';
        return false;
    }
    return true;
} 