describe("Population Transition App main test cases", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://opendata.resas-portal.go.jp/api/v1/prefectures"
    ).as("getPrefectures");
    cy.visit("/");
  });

  it("Can see prefecture list", () => {
    cy.wait("@getPrefectures").then(({ response }) => {
      expect(response?.statusCode).to.equal(200);
      const results = response?.body.result;
      cy.get("[data-cy=checkboxes-container-prefecture]").should("exist");
      results.forEach((result) => {
        cy.get(`[data-cy=checkbox-wrapper-prefecture-${result.prefCode}]`).as(
          "checkboxReference"
        );
        cy.get("@checkboxReference").should("exist");
        cy.get("@checkboxReference")
          .find("label")
          .should("have.text", result.prefName);
        cy.get("@checkboxReference")
          .find("input[type=checkbox]")
          .should("have.value", result.prefCode);
      });
    });
  });

  it("Can't view chart when no prefecture is checked", () => {
    cy.wait("@getPrefectures").then(({ response }) => {
      const results = response?.body.result;
      results.forEach((result) => {
        cy.get(`[data-cy=checkbox-wrapper-prefecture-${result.prefCode}]`).as(
          "checkboxReference"
        );
        cy.get("@checkboxReference")
          .find("input[type=checkbox]")
          .should("not.be.checked");
        cy.get(`lchart-line-population-${result.prefCode}`).should("not.exist");
      });
    });
    cy.get("[data-cy=section-chart]").should("not.exist");
  });

  it("Can select and unselect one of the prefecture checkboxes at a time", () => {
    cy.wait("@getPrefectures").then(({ response }) => {
      const results = response?.body.result;
      results.forEach((result) => {
        cy.wait(2000);
        cy.get(`[data-cy=checkbox-wrapper-prefecture-${result.prefCode}]`).as(
          "checkboxReference"
        );
        cy.get("@checkboxReference").find("input[type=checkbox]").check();
        cy.get(
          `[data-cy=lchart-population] path[name=${result.prefName}]`
        ).should("exist");
        cy.get("@checkboxReference").find("input[type=checkbox]").uncheck();
        cy.get(
          `[data-cy=lchart-population] path[name=${result.prefName}]`
        ).should("not.exist");
        cy.get("[data-cy=section-chart]").should("not.exist");
      });
    });
  });

  it("Can select and unselect multiple prefectures at a time", () => {
    cy.wait("@getPrefectures").then(({ response }) => {
      const results = response?.body.result;
      results.forEach((result) => {
        cy.wait(2000);
        cy.get(`[data-cy=checkbox-wrapper-prefecture-${result.prefCode}]`).as(
          "checkboxReference"
        );
        cy.get("@checkboxReference").find("input[type=checkbox]").check();
        cy.get(
          `[data-cy=lchart-population] path[name=${result.prefName}]`
        ).should("exist");
      });
      results.forEach((result, i) => {
        cy.wait(2000);
        cy.get(`[data-cy=checkbox-wrapper-prefecture-${result.prefCode}]`).as(
          "checkboxReference"
        );
        cy.get("@checkboxReference").find("input[type=checkbox]").uncheck();
        cy.get(
          `[data-cy=lchart-population] path[name=${result.prefName}]`
        ).should("not.exist");

        // The for loop below is a complex assertion process
        // that is used to check all the line of the rest checked prefectures should remain exist
        // Please remove the for loop below if you experience a memory leak problem
        for (let j = i + 1; j < results.length; j++) {
          cy.get(
            `[data-cy=lchart-population] path[name=${results[j]?.prefName}]`
          ).should("exist");
        }
      });
    });
  });
});
