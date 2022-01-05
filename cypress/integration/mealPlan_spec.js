describe("Meal Plan Page", () => {
  it("Display Meal Plan Page", () => {
    cy.visit("/mealplan");
    //Title
    cy.containExist("h4", "Instruction");
    cy.getExist("li", 3);
    //Contain Form
    cy.containExist("h4", "meal plan");
    cy.getExist("input[name=targetCalories]");
    cy.getExist("select[name=dietType]");
    cy.getExist("input[name=excludeIngredient]");
    cy.contains("button", "Add").should("be.visible");
    cy.contains("button", "Generate");
  });

  it("Meal Plan Form add exclude Ingredients", () => {
    cy.typeInputCheckValue("input[name=excludeIngredient]", "chicken");
    cy.contains("button", "Add").click();
    cy.typeInputCheckValue("input[name=excludeIngredient]", "beef");
    cy.contains("button", "Add").click();
    //After add
    cy.getExist(".MuiChip-label", 2);
    cy.containExist("h4", "Exclude");
    //After delete
    cy.get(".MuiChip-deleteIcon").eq(1).click();
    cy.get(".MuiChip-label").contains("chicken");
    cy.containExist("h4", "Exclude");
  });

  it("Meal Plan Form ", () => {
    //Submit with no data
    cy.contains("button", "Generate").click();
    cy.getExist(".MuiLinearProgress-root") ||
      cy.containExist("h4", "Nutrition facts");

    //Submit with data
    cy.visit("/mealplan");
    cy.typeInputCheckValue("input[name=targetCalories]", "2000");
    cy.getExist("select[name=dietType]")
      .select("Vegan")
      .should("have.value", "Vegan");
    cy.getExist("select[name=dietType]")
      .select("none")
      .should("have.value", "none");
    cy.contains("button", "Generate").click();
    cy.getExist(".MuiLinearProgress-root") ||
      cy.containExist("h4", "Nutrition facts");
  });
});
