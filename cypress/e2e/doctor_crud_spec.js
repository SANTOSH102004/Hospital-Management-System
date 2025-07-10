describe('Doctor CRUD', () => {
  before(() => {
    cy.visit('http://localhost/login.html');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('adminpassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'admin_dashboard.html');
  });

  it('should create a new doctor', () => {
    cy.visit('http://localhost/admin_doctors.html');
    cy.get('#addDoctorBtn').click();
    cy.get('input[name="firstName"]').type('Doc');
    cy.get('input[name="lastName"]').type('Tor');
    cy.get('input[name="email"]').type('doctor@example.com');
    cy.get('input[name="phoneNumber"]').type('5551234567');
    cy.get('button[type="submit"]').contains('Add').click();
    cy.contains('Doc Tor');
  });

  it('should edit the doctor', () => {
    cy.visit('http://localhost/admin_doctors.html');
    cy.contains('Doc Tor').parent('tr').find('.editDoctorBtn').click();
    cy.get('input[name="phoneNumber"]').clear().type('5557654321');
    cy.get('button[type="submit"]').contains('Save').click();
    cy.contains('5557654321');
  });

  it('should delete the doctor', () => {
    cy.visit('http://localhost/admin_doctors.html');
    cy.contains('Doc Tor').parent('tr').find('.deleteDoctorBtn').click();
    cy.get('.modal-footer .btn-danger').contains('Delete').click();
    cy.contains('Doc Tor').should('not.exist');
  });
}); 