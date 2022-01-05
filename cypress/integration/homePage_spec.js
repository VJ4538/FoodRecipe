describe("Home Page", () => {
  it("Display Home Page", () => {
    cy.visit("/");
    cy.get(".MuiButton-outlined").contains("Generate");
  });

  it("Display recipes", () => {
    cy.get(".MuiButton-outlined").contains("Generate").click();
    cy.wait(1000);
    cy.getExist(".MuiCardContent-root", 4);
  });

  //Articles
  it("Articles slider working", () => {
    cy.getExist(".Carousel-next-26").click();
    cy.wait(1000);
    cy.get(".MuiTypography-root").contains("physical activity");
    cy.getExist(".Carousel-prev-27").click();
    cy.wait(1000);
    cy.get(".MuiTypography-root").contains("healthy foods!");
  });

  it("Learn more Articles btn working", () => {
    cy.get(".MuiButton-outlined").contains("Learn More").click();
    cy.url().should("match", /articles/);
  });

  //Nav switcher working
  it("Nav calculator btn working", () => {
    cy.visit("/");
    cy.get(".MuiBottomNavigationAction-root:nth-child(2)").click();
    cy.url().should("eq", "http://localhost:3000/calculator");
  });

  it("Nav Search btn working", () => {
    cy.get(".MuiBottomNavigationAction-root:nth-child(3)").click();
    cy.url().should("eq", "http://localhost:3000/search");
  });

  it("Nav MealPlan btn working", () => {
    cy.get(".MuiBottomNavigationAction-root:nth-child(4)").click();
    cy.url().should("eq", "http://localhost:3000/mealplan");
  });

  it("Nav home btn working", () => {
    cy.get(".MuiBottomNavigationAction-root:nth-child(1)").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
