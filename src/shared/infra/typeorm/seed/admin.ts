import { v4 as uuid } from "uuid"
import { hash } from "bcryptjs"

import createConnection from "../index"

async function create() {

    const connection = await createConnection("localhost");
    const id = uuid();

    const password = await hash("admin", 10);

    await connection.query(
        `INSERT INTO  USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@email.com', '${password}', 'true', 'now()', 'XXXXXXX')`
    )

    connection.close;


}

create().then(() => console.log("User Admin created!"))