/// <reference types="cypress" />

import * as client from "../helpers/client-helpers"
import * as room from "../helpers/room-helpers"
import * as bill from "../helpers/bill-helpers"



describe('Test suite', () => {

    /// Login

    it('POST request towards /api/login', () => {
        cy.authenticate()
    })

    /// Clients

    it('getAllClients', () => {
        client.getAllClients() && cy.logout()
    })

    it('createNewClient', () => {
        client.createNewClient() && cy.logout()
    })

    it('editLastClient', () => {
        client.editLastClient() && cy.logout()
    })
    
    it('deleteLastClient', () => {
        client.deleteLastClient() && cy.logout()
    })
    
    
    /// Rooms
    
    it('getAllRooms', () => {
        room.getAllRooms() && cy.logout()
    })

    it('createNewRoom', () => {
        room.createNewRoom() && cy.logout()
    })

    it('editLastRoom', () => {
        room.editLastRoom() && cy.logout()
    })
    
    it('deleteLastRoom', () => {
        room.deleteLastRoom() && cy.logout()
    })
    
    

    /// Bills
    
    it('getAllBills', () => {
        bill.getAllBills() && cy.logout()
    })

    it('createNewBill', () => {
        bill.createNewBill() && cy.logout()
    })

    it('editLastBill', () => {
        bill.editLastBill() && cy.logout()
    })
    
    it('deleteLastBill', () => {
       bill.deleteLastBill() && cy.logout()
    })
    
    /// Logout
    
    it('POST request towards /api/logout', () => {
        cy.logout()
    }) 

})

