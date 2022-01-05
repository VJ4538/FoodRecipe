describe("Calculator Page", () => {
  it("Display Calculator Page", () => {
    cy.visit("/calculator");
    //Contain Switcher
    cy.containExist("button", "BMI Calculator");
    cy.containExist("button", "Calorie Calculator");
    //Contain Table
    cy.containExist("h4", "What is BMI");
    cy.containExist("table", "Category");
    //Contain Form
    cy.containExist("h4", "Calculate your BMI today");
    cy.getExist("input[name=heightFeet]");
    cy.getExist("input[name=heightInch]");
    cy.getExist("input[name=weight]");
    cy.containExist("button", "Calculate");
  });

  it("BMI Calculator Form", () => {
    //Test input height Feet
    cy.getExist("input[name=heightFeet]").type(6);
    cy.containExist("button", "Calculate").click();
    cy.containExist("p", "valid height");
    //Test input height inch
    cy.getExist("input[name=heightInch]").type(1);
    cy.containExist("button", "Calculate").click();
    cy.containExist("p", "valid weight");
    // Test input weight
    cy.getExist("input[name=weight]").type(150);
    cy.containExist("button", "Calculate").click();
    cy.containExist("h4", "Result");
  });

  it("Calorie Calculator Form", () => {
    cy.visit("/calculator");
    cy.containExist("button", "Calorie Calculator").click();
    //Titles
    cy.containExist("h4", "Why");
    cy.containExist("h4", "Calculate");
    //Contain Inputs
    cy.getExist("select[name=gender]")
      .select("female")
      .should("have.value", "female");
    cy.getExist("select[name=goal]")
      .select("gain")
      .should("have.value", "gain");
    cy.getExist("input[name=goalAmount]");
    cy.getExist("input[name=durationTime]");
    cy.getExist("select[name=duration]");

    //Error handling
    cy.containExist("button", "Calculate").click();
    cy.containExist("p", "valid weight");
    cy.containExist("p", "valid height");
    cy.containExist("p", "valid age");
    cy.containExist("p", "Please select one");

    //Re-enter data
    cy.getExist("select[name=activity]")
      .select("1.55")
      .should("have.value", "1.55");
    cy.getExist("input[name=age]").type("18");
    cy.getExist("input[name=heightFeet]").type("6");
    cy.getExist("input[name=heightInch]").type("0");
    cy.getExist("input[name=weight]").type("150");
    //Final submit result should be visible
    cy.containExist("button", "Calculate").click();
    cy.containExist("h4", "Result");
  });
});
