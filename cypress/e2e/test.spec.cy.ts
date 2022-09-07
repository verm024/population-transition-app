it("Test Intercept", () => {
  cy.visit("/");
  cy.intercept(
    "GET",
    "https://opendata.resas-portal.go.jp/api/v1/prefectures"
  ).as("gege");
  cy.wait("@gege").then(({ response }) => {
    console.log(response);
  });
});
