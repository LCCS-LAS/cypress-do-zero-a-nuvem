// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('fillMandatoryFieldsAndSubmit',() =>{
    cy.get('input[type ="text"][name = "firstName"]').type("Luccas");
    cy.get('input[type ="text"][name = "lastName"]').type("Leandro");
    cy.get("#email").type("teste@teste.com");
    cy.get("#open-text-area").type("Aprendendo Cypress");
    cy.contains("button", "Enviar").click();
    cy.get("span.success").should("be.visible");
})

Cypress.Commands.add('envioComSucesso', (nome, sobrenome, email, texto) =>{
    cy.get('input[type ="text"][name = "firstName"]').type(nome);
    cy.get('input[type ="text"][name = "lastName"]').type(sobrenome);
    cy.get("#email").type(email);
    cy.get("#open-text-area").type(texto);
    cy.contains("button", "Enviar").click();
    cy.get("span.success").should("be.visible");
})

Cypress.Commands.add('envioFormularioObjeto',(data) =>{
    cy.get('input[type ="text"][name = "firstName"]').type(data.firstName);
    cy.get('input[type ="text"][name = "lastName"]').type(data.lastName);
    cy.get("#email").type(data.email);
    cy.get("#open-text-area").type(data.text);
    cy.contains("button", "Enviar").click();
    cy.get("span.success").should("be.visible");
})


Cypress.Commands.add('dadosPadrao',(dados = {
      firstName: 'Joao',
      lastName: 'Silva',
      email: 'teste@teste.com',
      text: 'Teste'
}) =>{
    cy.get('input[type ="text"][name = "firstName"]').type(dados.firstName);
    cy.get('input[type ="text"][name = "lastName"]').type(dados.lastName);
    cy.get("#email").type(dados.email);
    cy.get("#open-text-area").type(dados.text);
    cy.contains("button", "Enviar").click();
    cy.get("span.success").should("be.visible");
})