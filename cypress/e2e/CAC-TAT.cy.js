describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => cy.visit("./src/index.html"));

  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  //Exercicio Extra 1
  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.get('input[type ="text"][name = "firstName"]').type("Luccas");
    cy.get('input[type ="text"][name = "lastName"]').type("Leandro");
    cy.get("#email").type("teste@teste.com");
    cy.get("#open-text-area").type("Aprendendo Cypress", { delay: 0 });
    cy.get("button[type = submit]").click();
    cy.get(".success").should("be.visible");
  });

  //Exercicio 2
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#email").type("emailinvalido.comm");
    cy.get(".button").click();
    cy.get(".error").should("be.visible");
  });

  //Exercicio 3
  it("não deve aceitar caracteres não numéricos no campo telefone", () => {
    cy.get("#phone").type("abcDEF@#!");
    cy.get("#phone").should("have.value", "");
  });

  //Exercicio 4
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get('input[type ="text"][name = "firstName"]').type("Luccas");
    cy.get('input[type ="text"][name = "lastName"]').type("Leandro");
    cy.get("#email").type("teste@teste.com");
    cy.get("#open-text-area").type("Aprendendo Cypress");
    cy.get("#phone-checkbox").check();
    cy.get(".button").click();
    cy.get(".error").should("be.visible");
  });

  //Exercicio 5
  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Luccas")
      .should("have.value", "Luccas")
      .clear()
      .should("have.value", "");
  });

  //Exercicio 6
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.clock();
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
    cy.tick(3000);
    cy.get(".error").should("not.be.visible");
  });

  //Exercicio 7
  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
  });

  //Exercicio 7
  it("Comandos customizados Envio de Formulario", () => {
    cy.envioComSucesso(
      "Luccas",
      "Silva",
      "teste@teste.com",
      "Exercicio Cypress",
    );
  });

  //Exercicio 7 Objeto
  it("Comandos customizados Envio de Formulario", () => {
    const data = {
      firstName: "Joao",
      lastName: "Silva",
      email: "teste@teste.com",
      text: "Teste",
    };
    cy.envioFormularioObjeto(data);
  });

  //Exercicio 7 Valores padrao
  it("Comandos customizados Envio de Formulario", () => {
    cy.dadosPadrao();
  });

  //Exercicio 8
  it("Usando Contains no Botao", () => {
    cy.get('input[type ="text"][name = "firstName"]').type("Luccas");
    cy.get('input[type ="text"][name = "lastName"]').type("Leandro");
    cy.get("#email").type("teste@teste.com");
    cy.get("#open-text-area").type("Aprendendo Cypress", { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get("span.success").should("be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu texto", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("be.checked");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each((typeofService) => {
      cy.wrap(typeofService).check().should("be.checked");
    });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get("input[type=checkbox]")
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get("#file-upload")
      .selectFile("@sampleFile", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade")
      .should("have.attr", "href", "privacy.html")
      .and("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade", () => {
    cy.contains("a", "Política de Privacidade")
      .invoke("removeAttr", "target")
      .click();

    cy.contains("h1", "CAC TAT - Política de Privacidade").should("be.visible");
  });

  it("exibe e oculta as mensagens de sucesso e erro usando .invoke()", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso.")
      .invoke("hide")
      .should("not.be.visible");
    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible");
  });

  it("preenche o campo da área de texto usando o comando invoke", () => {
    cy.get("#open-text-area")
      .invoke("val", "um texto qualquer")
      .should("have.value", "um texto qualquer");
  });

  it("faz uma requisição HTTP", () => {
    cy.request({
      method: "GET",
      url: "https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.statusText).to.eq("OK");
    });
  });

  it("faz um requisição HTTP API V2", () => {
    cy.request("https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html")
      .as("getRequest")
      .its("status")
      .should("be.eq", 200);
    cy.get("@getRequest").its("statusText").should("be.eq", "OK");
    cy.get("@getRequest").its("body").should("include", "CAC TAT");
  });

  it.only('Desafio Descobrir Aonde Esta o Gato', () =>{
    cy.get("#cat").invoke('show').should('be.visible')
  })
});
