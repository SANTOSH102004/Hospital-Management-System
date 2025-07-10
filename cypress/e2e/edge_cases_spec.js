describe('Advanced Edge Cases', () => {
  it('should show error for missing required fields', () => {
    cy.visit('http://localhost/login.html');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('adminpassword');
    cy.get('button[type="submit"]').click();
    cy.visit('http://localhost/admin_patients.html');
    cy.get('#addPatientBtn').click();
    cy.get('button[type="submit"]').contains('Add').click();
    cy.contains('This field is required'); // Adjust message as per your UI
  });

  it('should show error for duplicate email', () => {
    cy.visit('http://localhost/login.html');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('adminpassword');
    cy.get('button[type="submit"]').click();
    cy.visit('http://localhost/admin_patients.html');
    cy.get('#addPatientBtn').click();
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('existing@example.com');
    cy.get('input[name="phoneNumber"]').type('1234567890');
    cy.get('button[type="submit"]').contains('Add').click();
    cy.contains('Email already exists'); // Adjust message as per your UI
  });

  it('should redirect to login on expired session', () => {
    cy.visit('http://localhost/login.html');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('adminpassword');
    cy.get('button[type="submit"]').click();
    cy.visit('http://localhost/admin_dashboard.html');
    cy.clearLocalStorage('token');
    cy.reload();
    cy.url().should('include', 'login.html');
  });

  it('should show error message on server error', () => {
    cy.intercept('POST', '/api/patients', { statusCode: 500, body: {} });
    cy.visit('http://localhost/login.html');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('adminpassword');
    cy.get('button[type="submit"]').click();
    cy.visit('http://localhost/admin_patients.html');
    cy.get('#addPatientBtn').click();
    cy.get('input[name="firstName"]').type('Error');
    cy.get('input[name="lastName"]').type('Test');
    cy.get('input[name="email"]').type('error@example.com');
    cy.get('input[name="phoneNumber"]').type('1234567890');
    cy.get('button[type="submit"]').contains('Add').click();
    cy.contains('Something went wrong'); // Adjust message as per your UI
  });
}); 