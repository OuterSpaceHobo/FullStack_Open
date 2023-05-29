describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "kek",
      password: "123",
    };
    const user1 = {
      name: "Not a Matti Luukkainen",
      username: "test",
      password: "321",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.request("POST", "http://localhost:3003/api/users/", user1);
  });

  it("Login form is shown", function () {
    cy.visit("http://localhost:3000");
    cy.contains("login to use app");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.visit("http://localhost:3000");
      cy.get("#username").type("kek");
      cy.get("#password").type("123");
      cy.get("#login-button").click();
      cy.contains("kek logged in");
    });

    it("fails with wrong credentials", function () {
      cy.visit("http://localhost:3000");
      cy.get("#username").type("kek");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.contains("Wrong login or password");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "kek", password: "123" });
      cy.contains("kek logged in");
    });

    it("a new blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("a note created by cypress");
      cy.get("#author").type("a note created by cypress");
      cy.get("#url").type("a note created by cypress");
      cy.get("#publish-button").click();
      cy.contains("a note created by cypress");
    });

    it("users can like a blog", function () {
      cy.createBlog({
        title: "a note created by cypress",
        author: "test Boy",
        url: "test.com",
        likes: 0,
      });
      cy.contains("a note created by cypress")
        .parent()
        .find("#show-button")
        .as("theButton");
      cy.get("@theButton").should("contain", "show");
      cy.get("@theButton").click();
      cy.get("#like-button").click();
      cy.get("#likes").should("contain", "1");
    });

    it("the user who created a blog can delete it", function () {
      cy.createBlog({
        title: "a note created by cypress",
        author: "test Boy",
        url: "test.com",
        likes: 0,
      });
      cy.contains("a note created by cypress")
        .parent()
        .find("#show-button")
        .as("theButton");
      cy.get("@theButton").should("contain", "show");
      cy.get("@theButton").click();
      cy.get("#delete-button").click();
      cy.on("window:confirm", () => true);
      cy.contains("a note created by cypress").should("not.exist");
    });

    it("only the creator can see the delete button of a blog", function () {
      cy.createBlog({
        title: "a note created by cypress",
        author: "test Boy",
        url: "test.com",
        likes: 0,
      });
      cy.get("#logout-button").click();
      cy.login({ username: "test", password: "321" });
      cy.contains("a note created by cypress")
        .parent()
        .find("#show-button")
        .as("theButton");
      cy.get("@theButton").should("contain", "show");
      cy.get("@theButton").click();
      cy.contains("#delete-button").should("not.exist");
    });

    it("the blogs are ordered according to likes - top first", function () {
      cy.createBlog({
        title: "one like",
        author: "test Boy",
        url: "test.com",
        likes: 1,
      });
      cy.createBlog({
        title: "five likes",
        author: "test Boy",
        url: "test.com",
        likes: 5,
      });
      cy.createBlog({
        title: "ten likes",
        author: "test Boy",
        url: "test.com",
        likes: 10,
      });
      cy.visit("http://localhost:3000");

      cy.get(".blog").eq(0).should("contain", "ten likes");
      cy.get(".blog").eq(1).should("contain", "five likes");
      cy.get(".blog").eq(2).should("contain", "one like");
    });
  });
});
