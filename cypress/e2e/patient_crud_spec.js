describe('Patient CRUD', () => {
  before(() => {
    // Log in as admin before all tests
    cy.visit('http://localhost/login.html');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('adminpassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'admin_dashboard.html');
  });

  it('should create a new patient', () => {
    cy.visit('http://localhost/admin_patients.html');
    cy.get('#addPatientBtn').click();
    cy.get('input[name="firstName"]').type('Test');
    cy.get('input[name="lastName"]').type('Patient');
    cy.get('input[name="email"]').type('testpatient@example.com');
    cy.get('input[name="phoneNumber"]').type('1234567890');
    cy.get('button[type="submit"]').contains('Add').click();
    cy.contains('Test Patient'); // Verify patient appears in table
  });

  it('should edit the patient', () => {
    cy.visit('http://localhost/admin_patients.html');
    cy.contains('Test Patient').parent('tr').find('.editPatientBtn').click();
    cy.get('input[name="phoneNumber"]').clear().type('0987654321');
    cy.get('button[type="submit"]').contains('Save').click();
    cy.contains('0987654321'); // Verify update
  });

  it('should delete the patient', () => {
    cy.visit('http://localhost/admin_patients.html');
    cy.contains('Test Patient').parent('tr').find('.deletePatientBtn').click();
    cy.get('.modal-footer .btn-danger').contains('Delete').click();
    cy.contains('Test Patient').should('not.exist'); // Verify deletion
  });
}); 