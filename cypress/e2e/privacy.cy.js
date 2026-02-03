describe("Pagina Privacy", () => {
  beforeEach(() => {
    cy.visit("src/privacy.html");
  });

  Cypress._.times(3, () => {
    it.only("Testando a Pagina Privacy", () => {
      cy.contains("h1", "CAC TAT - Política de Privacidade")
        .should("be.visible");
      cy.contains("p", "Talking About Testing")
        .should("be.visible");
    });
  });
});
