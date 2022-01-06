import { makeServer } from "../../src/server"

describe("user list", () => {
  let server

  beforeEach(() => {
    server = makeServer({ environment: "test" })
  })

  afterEach(() => {
    server.shutdown()
  })

  it("shows the users from our server", () => {
    server.create("user", { id: 1, name: "Luke" })
    server.create("user", { id: 2, name: "Leia" })

    cy.visit("http://localhost:3000/")

    cy.get('[data-testid="user-1"]').contains("Luke")
    cy.get('[data-testid="user-2"]').contains("Leia")
  })

  it("shows a message if there are no users", () => {
    // Don't create any users

    cy.visit("http://localhost:3000/")

    cy.get('[data-testid="no-users"]').should("be.visible")
  })
})
