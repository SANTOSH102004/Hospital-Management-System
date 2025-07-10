describe('Login', () => {
  it('should log in as admin and see admin dashboard', () => {
    cy.visit('http://localhost/login.html');
    cy.get('input[name="username"]').type('admin'); // Adjust selector if needed
    cy.get('input[name="password"]').type('adminpassword'); // Adjust password
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'admin_dashboard.html');
  });
}); 