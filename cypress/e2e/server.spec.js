// cypress/e2e/server.spec.js
describe('Acceptance Tests', () => {
    const port = 4001;
    const baseUrl = `http://localhost:${port}`;
  
    before(() => {
      cy.visit(baseUrl);
    });
  
    it('should handle HTTP requests', () => {
      // Test an API endpoint
      cy.request(`${baseUrl}/api/auth`)
        .its('status')
        .should('eq', 403);
    });
  
    it('should handle WebSocket connections', (done) => {
      const socket = io(baseUrl);
  
      socket.on('connect', () => {
        socket.emit('sendLocation', { lat: 0, lng: 0 });
  
        socket.on('changeLocation', (data) => {
          expect(data).to.deep.equal({ lat: 0, lng: 0 });
          socket.disconnect();
          done();
        });
      });
    });
  });
  