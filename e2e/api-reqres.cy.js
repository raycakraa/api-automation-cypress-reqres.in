describe('Reqres API Automation Test (No baseUrl)', () => {
  const baseUrl = 'https://reqres.in/api';

  it('GET List Users', () => {
    cy.request(`${baseUrl}/users?page=2`)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  it('GET Single User', () => {
    cy.request(`${baseUrl}/users/2`)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  it('GET Single User Not Found', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/23`,
      headers: {'x-api-key':'reqres-free-v1'},
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('GET List <Resource>', () => {
    cy.request(`${baseUrl}/unknown`)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  it('GET Single <Resource>', () => {
    cy.request(`${baseUrl}/unknown/2`)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  it('GET Single <Resource> Not Found', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/unknown/23`,
      headers: {'x-api-key':'reqres-free-v1'},
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('POST Create User', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers: {'x-api-key':'reqres-free-v1'},
      failOnStatusCode: false,
      body: {
        name: 'Ray',
        job: 'Tester',
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', 'Ray');
    });
  });

  it('PUT Update User', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/2`,
      headers: {'x-api-key':'reqres-free-v1'},
      body: {
        name: 'Ray',
        job: 'QA Engineer',
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('PATCH Update User', () => {
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/users/2`,
      headers: {'x-api-key':'reqres-free-v1'},
      body: {
        job: 'QA Engineer',
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('DELETE User', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/2`,
      headers: {'x-api-key':'reqres-free-v1'}
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('POST Register Successful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers: {'x-api-key':'reqres-free-v1'},
      body: {
        email: 'eve.holt@reqres.in',
        password: 'pistol',
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('POST Register Unsuccessful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/register`,
      headers: {'x-api-key':'reqres-free-v1'},
      body: {
        email: 'sydney@fife',
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });

  it('POST Login Successful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers: {'x-api-key':'reqres-free-v1'},
      body: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  it('POST Login Unsuccessful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers: {'x-api-key':'reqres-free-v1'},
      body: {
        email: 'peter@klaven',
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error');
    });
  });

  it('GET Delayed Response', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?delay=3`,
      headers: {'x-api-key':'reqres-free-v1'}
    }).then((response) => {
        expect(response.status).to.eq(200);
      });
  });
});
