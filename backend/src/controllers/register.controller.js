const { PrismaClient}  = require("@prisma/client");
const client = new PrismaClient();


async function registerUser(req, res) {
    const { name, lastname, email, password, } = req.body; 



    if (!name || !lastname || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {


        const user = await client.details.create({
            data: {
                name, lastname, email, password
            }
        });
        res.status(201).json({ message: "User registered", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });



    }

}


module.exports = { registerUser }