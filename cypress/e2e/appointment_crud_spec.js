describe('Appointment CRUD', () => {
  before(() => {
    cy.visit('http://localhost/login.html');
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('adminpassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'admin_dashboard.html');
  });

  it('should create a new appointment', () => {
    cy.visit('http://localhost/admin_appointments.html');
    cy.get('#addAppointmentBtn').click();
    cy.get('select[name="patient"]').select('Test Patient');
    cy.get('select[name="doctor"]').select('Doc Tor');
    cy.get('input[name="date"]').type('2024-12-31');
    cy.get('input[name="time"]').type('10:00');
    cy.get('button[type="submit"]').contains('Add').click();
    cy.contains('Test Patient');
    cy.contains('Doc Tor');
  });

  it('should edit the appointment', () => {
    cy.visit('http://localhost/admin_appointments.html');
    cy.contains('Test Patient').parent('tr').find('.editAppointmentBtn').click();
    cy.get('input[name="time"]').clear().type('11:00');
    cy.get('button[type="submit"]').contains('Save').click();
    cy.contains('11:00');
  });

  it('should delete the appointment', () => {
    cy.visit('http://localhost/admin_appointments.html');
    cy.contains('Test Patient').parent('tr').find('.deleteAppointmentBtn').click();
    cy.get('.modal-footer .btn-danger').contains('Delete').click();
    cy.contains('Test Patient').should('not.exist');
  });
}); 