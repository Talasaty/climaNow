describe('Test de Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Debe pintar el título de web y los inputs', () => {
        cy.get('span').contains('Now')

        cy.get('form').within(() => {
            cy.get('input[type="text"]').should(
                'have.attr',
                'placeholder',
                'Usuario'
            )
            cy.get('input[type="password"]').should(
                'have.attr',
                'placeholder',
                'Contraseña'
            )
        })
    })

    it('Debería fallar con un usuario y contraseña incorrectos', () => {
        cy.get('input[type="text"]').type('usuario_erroneo')
        cy.get('input[type="password"]').type('contraseña_erronea')
        cy.get('button').contains('login').click()
        cy.on('window:alert', str => {
            expect(str).to.equal(`Ha ocurrido un error, inténtelo de nuevo`)
        })
    })

    it('Debería navegar a otra ruta con un usuario y contraseña correctos', () => {
        cy.get('input[type="text"]').type('admin')
        cy.get('input[type="password"]').type('password')
        cy.get('button').contains('login').click()
        cy.url().should('include', '/home')
    })
})

describe('Verifica happy path por la web', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Debería navegar a otra ruta con un usuario y contraseña correctos', () => {
        cy.get('input[type="text"]').type('admin')
        cy.get('input[type="password"]').type('password')
        cy.get('button').contains('login').click()
        cy.url().should('include', '/home')
        cy.get('button').contains('Cerrar sesión')

        cy.get('h2').contains('Inicio')
        cy.get('p').contains(
            'En esta página puedes ver el tiempo que hará hoy en todos los municipios de España'
        )

        cy.get('a').contains('Inicio')
        cy.get('h2').contains('Abanilla')
        cy.get('img').should('be.visible')
        cy.get('a').contains('Buscador por localidad').click()
        cy.url().should('include', '/weather')

        cy.get('h2').contains('Buscador')
        cy.get('p').contains(
            'Aquí podrás buscar el tiempo de cualquier municipio del mundo 😲'
        )

        cy.get('input[type="text"]').type('Jaen')
        cy.get('button').contains('Buscar').click()
        cy.get('h2').contains('Jaen')
        cy.get('img').should('be.visible')
        cy.get('input[type="text"]').type('dasfsdf')
        cy.get('button').contains('Buscar').click()
        cy.get('h2').contains('ERROR')
        cy.get('p').contains(
            'Se ha producido un error, disculpe las molestia, puede intentarlo de nuevo más tarde'
        )
        cy.get('a').contains('Inicio').click()
        cy.url().should('include', '/home')
        cy.get('button').contains('Cerrar sesión')

        cy.get('h2').contains('Inicio')
        cy.get('p').contains(
            'En esta página puedes ver el tiempo que hará hoy en todos los municipios de España'
        )

        cy.get('a').contains('Inicio')
        cy.get('h2').contains('Abanilla')
        cy.get('img').should('be.visible')
        cy.get('button').contains('Cerrar sesión').click()
        cy.get('span').contains('Now')
        cy.get('form').within(() => {
            cy.get('input[type="text"]').should(
                'have.attr',
                'placeholder',
                'Usuario'
            )
            cy.get('input[type="password"]').should(
                'have.attr',
                'placeholder',
                'Contraseña'
            )
        })
    })
})
