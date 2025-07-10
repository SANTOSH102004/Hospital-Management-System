describe('Payment CRUD', () => {
  before(() => {
    cy.visit('http://localhost/login.html');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('adminpassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'admin_dashboard.html');
  });

  it('should create a new payment', () => {
    cy.visit('http://localhost/admin_payments.html');
    cy.get('#addPaymentBtn').click();
    cy.get('select[name="patient"]').select('Test Patient');
    cy.get('input[name="amount"]').type('100.00');
    cy.get('select[name="status"]').select('PENDING');
    cy.get('button[type="submit"]').contains('Add').click();
    cy.contains('Test Patient');
    cy.contains('100.00');
  });

  it('should edit the payment', () => {
    cy.visit('http://localhost/admin_payments.html');
    cy.contains('Test Patient').parent('tr').find('.editPaymentBtn').click();
    cy.get('input[name="amount"]').clear().type('150.00');
    cy.get('button[type="submit"]').contains('Save').click();
    cy.contains('150.00');
  });

  it('should delete the payment', () => {
    cy.visit('http://localhost/admin_payments.html');
    cy.contains('Test Patient').parent('tr').find('.deletePaymentBtn').click();
    cy.get('.modal-footer .btn-danger').contains('Delete').click();
    cy.contains('Test Patient').should('not.exist');
  });
}); 