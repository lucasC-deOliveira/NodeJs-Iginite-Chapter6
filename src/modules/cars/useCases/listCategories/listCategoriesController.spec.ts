import { app } from "@shared/infra/http/app"
import request from "supertest"
import createConnection from "@shared/infra/typeorm"
import { Connection } from "typeorm"
import { hash } from "bcryptjs"
import { v4 as uuid } from "uuid"

let connection: Connection
describe("list categories controller", () => {

    beforeAll(async () => {
        connection = await createConnection()

        await connection.runMigrations();

        const password = await hash("admin", 10);
        const id = uuid()

        await connection.query(
            `INSERT INTO  USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@email.com', '${password}', 'true', 'now()', 'XXXXXXX')`
        )
    })

    afterAll(async () => {
        await connection.dropDatabase()
        await connection.close()
    })

    it("should be able to list all categories", async () => {
        const responseToken = await request(app).post('/sessions')
            .send({
                email: "admin@email.com",
                password: "admin"
            })

        const { token } = responseToken.body;

        await request(app).post("/categories")
            .send({
                name: "categorytest",
                description: "Category test"
            }).set({
                Authorization: `Bearer ${token}`
            })

        const response = await request(app).get("/categories")

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("categorytest");

    })




})

