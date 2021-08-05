const faker = require('faker')

const GET_CLIENTS_ENDPOINT = 'http://localhost:3000/api/clients'
const CREATE_CLIENT_ENDPOINT = 'http://localhost:3000/api/client/new'
const GET_CLIENT_ENDPOINT = 'http://localhost:3000/api/client/'


//functions

function createdClientInfo() {
let clientData = {
    "name": faker.name.findName(),
    "email": faker.internet.email(),
    "telephone": faker.phone.phoneNumber()
}
    return clientData   
}

function editedClientInfo(id) {
    let clientData = {
        "id": id,
        "name": faker.name.findName(),
        "email": faker.internet.email(),
        "telephone": faker.phone.phoneNumber()
    }
        return clientData   
    }


function getAllClients () {
    cy.authenticate().then((response =>{
        cy.request({
            method: 'GET', 
            url: GET_CLIENTS_ENDPOINT, 
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                'Content-Type': 'application/json'
            }
        })
    })).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
        cy.log(JSON.stringify(response.body[1]))
    }))
    cy.wait(300)
}


function createNewClient () {
    // Authentication; Getting a valid token
    cy.authenticate().then((response => {
                cy.request({
                    method: 'POST',
                    url: CREATE_CLIENT_ENDPOINT, 
                    headers: {
                        'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                        'Content-Type': 'application/json'
                    }, 
                    body: createdClientInfo()             
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))
            }))

}


function editLastClient () {
    
    // Authentication; Getting a valid token
    cy.authenticate().then((response => {
        // Get request to get all clients in order to extract the lastID
        cy.request({
            method: 'GET', 
            url: GET_CLIENTS_ENDPOINT, 
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                'Content-Type': 'application/json'
            }
        }).then((response =>{
            expect(response.status).to.eq(200)
            //Save the id of the last client into a variable
            let lastID = response.body[response.body.length -1].id
            cy.log(lastID)

            cy.request({
                method: 'GET', 
                url: GET_CLIENT_ENDPOINT + lastID,  
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                    'Content-Type': 'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                cy.request({
                    method: 'PUT',
                    url: GET_CLIENT_ENDPOINT + lastID, 
                    headers: {
                        'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                        'Content-Type': 'application/json'
                    }, 
                    body: editedClientInfo(lastID)
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))
           }))

       }))
   }))
   
}


function deleteLastClient () {
    // Authentication; Getting a valid token
    cy.authenticate().then((response => {
        // Get request to get all clients in order to extract the lastID
        cy.request({
            method: 'GET', 
            url: GET_CLIENTS_ENDPOINT, 
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                'Content-Type': 'application/json'
            }
        }).then((response =>{
            expect(response.status).to.eq(200)
            //Save the id of the last client into a variable
            let lastID = response.body[response.body.length - 1].id
            cy.log(lastID)

            cy.request({
                method: 'GET', 
                url: GET_CLIENT_ENDPOINT + lastID,  
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                    'Content-Type': 'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                cy.request({
                    method: 'DELETE',
                    url: GET_CLIENT_ENDPOINT + lastID, 
                    headers: {
                        'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                        'Content-Type': 'application/json'
                    }          
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))
            }))

        }))
    }))
   
}

//exports

module.exports = {

    getAllClients,
    createNewClient,
    editLastClient,
    deleteLastClient

}