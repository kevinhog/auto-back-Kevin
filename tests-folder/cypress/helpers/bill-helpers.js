const faker = require('faker')

const GET_BILLS_ENDPOINT = 'http://localhost:3000/api/bills'
const CREATE_BILL_ENDPOINT = 'http://localhost:3000/api/bill/new'
const GET_BILL_ENDPOINT = 'http://localhost:3000/api/bill/'

//functions

function createdBillInfo() {
    let billData = {
       //"id":id, // if needed
       "value": faker.datatype.number({min: 1000, max: 5000}),
       "paid": true
    }
        return billData   
    }

function editedBillInfo(id) {
    let billData = {
        "id":id,
        "value": faker.datatype.number({min: 1000, max: 5000}),
        "paid": true
    }
        return billData   
    }
    


function getAllBills () {
    cy.authenticate().then((response =>{
        cy.request({
            method: 'GET', 
            url: GET_BILLS_ENDPOINT, 
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

function createNewBill () {
    // Authentication; Getting a valid token
    cy.authenticate().then((response => {
    // Get request to get all clients in order to extract the lastID
                cy.request({
                    method: 'POST',
                    url: CREATE_BILL_ENDPOINT, 
                    headers: {
                        'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                        'Content-Type': 'application/json'
                    }, 
                    body: createdBillInfo()          
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))
            }))

}

function editLastBill () {
    // Authentication; Getting a valid token
    cy.authenticate().then((response => {
        // Get request to get all clients in order to extract the lastID
        cy.request({
            method: 'GET', 
            url: GET_BILLS_ENDPOINT, 
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
                url: GET_BILL_ENDPOINT + lastID,  
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                    'Content-Type': 'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                cy.request({
                    method: 'PUT',
                    url: GET_BILL_ENDPOINT + lastID, 
                    headers: {
                        'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                        'Content-Type': 'application/json'
                    }, 
                    body: editedBillInfo(lastID)         
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))
            }))

        }))
    }))
   
}


function deleteLastBill () {
    // Authentication; Getting a valid token
    cy.authenticate().then((response => {
        // Get request to get all clients in order to extract the lastID
        cy.request({
            method: 'GET', 
            url: GET_BILLS_ENDPOINT, 
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
                url: GET_BILL_ENDPOINT + lastID,  
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                    'Content-Type': 'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                cy.request({
                    method: 'DELETE',
                    url: GET_BILL_ENDPOINT + lastID, 
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


module.exports = {
    getAllBills,
    createNewBill,
    editLastBill,
    deleteLastBill

}