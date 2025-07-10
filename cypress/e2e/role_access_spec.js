describe('Role-Based Access', () => {
  it('should deny patient access to admin page', () => {
    cy.visit('http://localhost/login.html');
    cy.get('input[name="username"]').type('patientuser');
    cy.get('input[name="password"]').type('patientpassword');
    cy.get('button[type="submit"]').click();
    cy.visit('http://localhost/admin_dashboard.html');
    cy.contains('Access denied');
  });
}); 