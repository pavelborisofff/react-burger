describe('template spec', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'})
    cy.intercept('POST', 'api/orders', {fixture: 'order.back.json'})
    cy.setCookie('accessToken', 'testAccessToken');
    cy.visit('/');
  })

  it('logined user should be redirect to home page', () => {
    cy.visit('/login');
    cy.url().should('eq', 'http://localhost:3000/');
  })

  it('should be abble to drag-n-drop and order button should be disabled in case of no bun', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa0943"]').trigger('dragstart');
    cy.get('[data-testid="burger-constructor"').trigger('drop');
    cy.get('[data-testid="order-button"]').should('be.disabled');
    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]').trigger('dragstart');
    cy.get('[data-testid="burger-constructor"').trigger('drop');
    cy.get('[data-testid="order-button"]').should('not.be.disabled');
  })

  it('should open and close modal', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa0943"]').click();
    cy.get('[data-testid="modal"]').should('exist');
    cy.url().should('eq', 'http://localhost:3000/ingredients/643d69a5c3f7b9001cfa0943');
    cy.get('[data-testid="modal-close"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]').click();
    cy.get('body').trigger('keydown',{key: 'Escape'});
    cy.get('[data-testid="modal"]').should('not.exist');
  })

  it('should not be modal', () => {
    cy.visit('ingredients/643d69a5c3f7b9001cfa0943');
    cy.get('[data-testid="modal"]').should('not.exist');
  })

  it('should be able to post order then open and close modal', () => {
    cy.get('[data-testid="643d69a5c3f7b9001cfa0943"]').trigger('dragstart');
    cy.get('[data-testid="burger-constructor"').trigger('drop');
    cy.get('[data-testid="643d69a5c3f7b9001cfa093c"]').trigger('dragstart');
    cy.get('[data-testid="burger-constructor"').trigger('drop');
    cy.get('[data-testid="order-button"]').click();
    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="order-number"]').should('have.text', '1234');
    cy.get('body').trigger('keydown',{key: 'Escape'});
    cy.get('[data-testid="modal"]').should('not.exist');
  })

})