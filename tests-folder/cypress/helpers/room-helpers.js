const faker = require('faker')

const GET_ROOMS_ENDPOINT = 'http://localhost:3000/api/rooms'
const CREATE_ROOM_ENDPOINT = 'http://localhost:3000/api/room/new'
const GET_ROOM_ENDPOINT = 'http://localhost:3000/api/room/'

//functions


function createdRoomInfo() {
let roomData = {
        'category': faker.random.arrayElement(["double","single","twin"]),
        'floor': faker.datatype.number({min: 1, max: 50}),  
        'number': faker.datatype.number({min: 1, max: 200}),
        'available':true,
        'price': faker.datatype.number({min: 1000, max: 10000}),
        'features': faker.random.arrayElement(["balcony","ensuite","sea_view","penthouse"])

    }
        return roomData   
    }

    function editedRoomInfo(id) {
        let roomData = {
            'id': id,
            'category': faker.random.arrayElement(["double","single","twin"]),
            'floor': faker.datatype.number({min: 1, max: 50}),  
            'number': faker.datatype.number({min: 1, max: 200}),
            'available':true,
            'price': faker.datatype.number({min: 1000, max: 10000}),
            'features': faker.random.arrayElement(["balcony","ensuite","sea_view","penthouse"])
        
            }
                return roomData   
            }
    

function getAllRooms () {
    cy.authenticate().then((response =>{
        cy.request({
            method: 'GET', 
            url: GET_ROOMS_ENDPOINT, 
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


function createNewRoom () {
    // Authentication; Getting a valid token
    cy.authenticate().then((response => {
        // Get request to get all clients in order to extract the lastID
                cy.request({
                    method: 'POST',
                    url: CREATE_ROOM_ENDPOINT, 
                    headers: {
                        'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                        'Content-Type': 'application/json'
                    }, 
                    body: createdRoomInfo()             
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))
            }))
}

function editLastRoom () {
    // Authentication; Getting a valid token
    cy.authenticate().then((response => {
        // Get request to get all clients in order to extract the lastID
        cy.request({
            method: 'GET', 
            url: GET_ROOMS_ENDPOINT, 
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
                url: GET_ROOM_ENDPOINT + lastID,  
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                    'Content-Type': 'application/json'
                }
            }).then((response => {
               
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                cy.request({
                    method: 'PUT',
                    url: GET_ROOM_ENDPOINT + lastID, 
                    headers: {
                        'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                        'Content-Type': 'application/json'
                    }, 
                    body: editedRoomInfo(lastID)                  
                }).then((response => {
                    
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))
            }))

        }))
    }))
   
}


function deleteLastRoom () {
    // Authentication; Getting a valid token
    cy.authenticate().then((response => {
        // Get request to get all clients in order to extract the lastID
        cy.request({
            method: 'GET', 
            url: GET_ROOMS_ENDPOINT, 
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
                url: GET_ROOM_ENDPOINT + lastID,  
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                    'Content-Type': 'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                cy.request({
                    method: 'DELETE',
                    url: GET_ROOM_ENDPOINT + lastID, 
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
    getAllRooms,
    createNewRoom,
    editLastRoom,
    deleteLastRoom

}