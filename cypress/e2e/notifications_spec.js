describe('Notifications', () => {
  it('should display notifications for admin', () => {
    cy.visit('http://localhost/login.html');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('adminpassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'admin_dashboard.html');
    cy.get('#notifBell').click();
    cy.get('#notifDropdown').should('be.visible');
    cy.get('#notifDropdown li').should('have.length.greaterThan', 0);
  });
}); 