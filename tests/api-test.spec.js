const { test, expect } = require("@playwright/test");
const { Ajv } = require("ajv");

const ajv = new Ajv()

test.describe('API Testing', () => {
    test('TC-01 GET Single User',  async ({ request }) => {
        //bikin API call GET
        const response = await request.get('https://reqres.in/api/users/2')

        //assertions
        expect(response.status()).toBe(200)

        //assertions body
        const responsData = await response.json()

        expect(responsData.data.id).toBe(2)
        expect(responsData.data.email).toBe("janet.weaver@reqres.in")
        expect(responsData.data.first_name).toBe("Janet")
        expect(responsData.data.last_name).toBe("Weaver")

        //assertions jsonschema
        const valid = ajv.validate(require('./jsonschema/get-user-schema.json'), responsData)

        if (!valid) {
            console.error("AJV Validation Errors:", ajv.errorsText()); 
        }

        expect(valid).toBe(true);
    });
        
    test('TC-02 POST Create User', async ({ request }) => {
        //bikin API call POST
        const headerData = {
            Accept: 'application/json'
        }
        const bodyData = {
            "name": "Purwanto nugroho",
            "job": "nelayan"
        }

        const response = await request.post('https://reqres.in/api/users', {
            headers:headerData,
            data:bodyData
        })

        //assertions respon status code
        expect(response.status()).toBe(201)

        //assertions body
        const responsData = await response.json()
        
        expect(responsData.name).toBe("Purwanto nugroho")
        expect(responsData.job).toBe("nelayan")

        //assertions jsonschema
        const valid = ajv.validate(require('./jsonschema/post-user-schema.json'), responsData)

        if (!valid) {
            console.error("AJV Validation Errors:", ajv.errorsText()); 
        }

        expect(valid).toBe(true);
    });
    
    test('TC-03 PUT Create User', async ({ request }) => {
        //bikin API call PUT
        const headerData = {
            Accept: 'application/json'
        }
        const bodyData = {
            "name": "Chiko Hernandez",
            "job": "atlet"
        }

        const response = await request.put('https://reqres.in/api/users/2', {
            headers:headerData,
            data:bodyData
        })

        //assertions respon status code
        expect(response.status()).toBe(200)

        //assertions body
        const responsData = await response.json()

        expect(responsData.name).toBe("Chiko Hernandez")
        expect(responsData.job).toBe("atlet")

        //assertions jsonschema
        const valid = ajv.validate(require('./jsonschema/put-user-schema.json'), responsData)

        if (!valid) {
            console.log("AJV Validation Errors:", ajv.errorsText()); 
        }

        expect(valid).toBe(true);
    });

    test('TC-04 Delete User',  async ({ request }) => {
        //bikin API call Delete
        const response = await request.delete('https://reqres.in/api/users/2')

        // Validasi status code
        expect(response.status()).toBe(204);     
        
        // Periksa bahwa body respons kosong
        const responseText = await response.text();
        expect(responseText).toBe("");
    });
});


