describe('File Upload', () => {
  it('should upload a profile picture', () => {
    cy.visit('http://localhost/login.html');
    cy.get('input[name="username"]').type('patientuser');
    cy.get('input[name="password"]').type('patientpassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'patient_dashboard.html');
    cy.visit('http://localhost/profile.html');
    cy.get('input[type="file"]').attachFile('testpic.jpg');
    cy.get('button[type="submit"]').contains('Upload').click();
    cy.contains('Upload successful');
  });
}); 