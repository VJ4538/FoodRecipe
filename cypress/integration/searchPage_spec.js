describe("Search Page", () => {
  it("Display Search Page", () => {
    cy.visit("/search");
    //Title
    cy.containExist("h4", "Instruction");
    cy.getExist("li", 4);
    //Contain Form
    cy.getExist("input[name=searchStr]");
    cy.getExist("select[name=cuisineType]");
    cy.getExist("select[name=dietType]");
    cy.getExist("input[name=includeIngredient]");
    cy.containExist("button", "Search");
    cy.containExist("button", "Add");
    cy.containExist("h4", "Complex Search");
    cy.containExist("table", "Name");
    cy.getExist(".MuiTablePagination-toolbar");
  });

  it("Complex Search Form", () => {
    //Open Complex Search
    cy.containExist("h4", "Complex Search:").click();
    cy.typeInputCheckValue("input[name=minCalories]", "1");
    cy.typeInputCheckValue("input[name=maxCalories]", "2");
    cy.typeInputCheckValue("input[name=minProtein]", "3");
    cy.typeInputCheckValue("input[name=maxProtein]", "4");
    cy.typeInputCheckValue("input[name=minFat]", "5");
    cy.typeInputCheckValue("input[name=maxFat]", "6");
    cy.typeInputCheckValue("input[name=minCarbs]", "7");
    cy.typeInputCheckValue("input[name=maxCarbs]", "8");

    //Close Complex Search
    cy.containExist("h4", "Complex Search:").click();
    cy.getExist("input[name=minCalories]", 0);
    cy.getExist("input[name=maxCalories]", 0);
    cy.getExist("input[name=minProtein]", 0);
    cy.getExist("input[name=maxProtein]", 0);
    cy.getExist("input[name=minFat]", 0);
    cy.getExist("input[name=maxFat]", 0);
    cy.getExist("input[name=minCarbs]", 0);
    cy.getExist("input[name=maxCarbs]", 0);
  });

  it("Search Form add include ingredient", () => {
    cy.typeInputCheckValue("input[name=includeIngredient]", "chicken");
    cy.contains("button", "Add").click();
    cy.typeInputCheckValue("input[name=includeIngredient]", "beef");

    cy.contains("button", "Add").click();
    //After add
    cy.getExist(".MuiChip-label", 2);
    cy.containExist("h4", "Include");
    //After delete
    cy.get(".MuiChip-deleteIcon").eq(1).click();
    cy.get(".MuiChip-label").contains("chicken");
    cy.containExist("h4", "Include");
  });

  it("Search Form Inputs", () => {
    //Check form inputs
    cy.getExist("input[name=searchStr]")
      .type("chicken")
      .should("have.value", "chicken");
    cy.getExist("select[name=cuisineType]")
      .select("Chinese")
      .should("have.value", "Chinese");
    cy.getExist("select[name=dietType]")
      .select("GlutenFree")
      .should("have.value", "GlutenFree");
  });

  it("Search Form submit", () => {
    //Submit and check
    cy.containExist("button", "Search").click();
    cy.getExist(".MuiTableRow-root", 10);
    cy.getExist(".MuiToolbar-root");
  });
});
