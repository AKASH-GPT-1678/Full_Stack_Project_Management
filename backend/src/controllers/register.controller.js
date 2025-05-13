const { PrismaClient } = require("../../output/client");
const client = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { verifyToken } = require("./project.controller");



async function registerUser(req, res) {
    const { name, lastname, email, password, cpassword } = req.body;



    if (!name || !lastname || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }


    const checkuser = await client.user.findFirst({
        where: {
            email: email
        }

    });



    if (checkuser) {

        return res.status(404).json(
            {
                error: "Same id canot be repetated "
            }

        )
    }

    try {
        console.log("Requets arrived")
        const hashpassword = await bcrypt.hash(password, 10);


        const user = await client.user.create({
            data: {
                name : name,lastname : lastname, email : email, password: hashpassword
            }
        });

        const seller = await client.sellerAccount.create({
            data: {
                id: user.id
            }
        });
        const user2 = {
            ...user,
            contact : user.contact.toString()

        }
        res.status(201).json({ message: "User registered", user :user2, Seller: `Seller Account Created with id " + ${seller.id}` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" , error : error.message});



    }

}


const generatetoken = (user) => {
    const payload = {
        email: user.email,
        id: user.id
    }


    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '3h' };

    return jwt.sign(payload, secret, options)






}

async function googleLogin(req, res) {

    const { email, name, password } = req.body;
    if (!email) {
        throw new Error("Email Cannot BeEmpty");
    }
    try {
        const user = await client.user.findUnique({
            where: {
                email: email
            }
        });

        const hashpassword = await bcrypt.hash(password, 10);
        if (!user) {
            const create = await client.user.create({
                data: {
                    name: name, email: email, googlemail: email, password: hashpassword,
                  
                }

            });
            
            const seller = await client.sellerAccount.create({
                data: {
                    id: create.id,
                  
                    
                }
            })

            const payload = {
                email: create.email,
                id: create.id,
            };

            const token = await generatetoken(payload);
            return res.status(201).json({ message: "Created", token: token ,seller : seller });
        }

        const verify = await bcrypt.compare(password, user.password);
        if (!verify) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const payload = {
            email: user.email,
            id: user.id,
        }

        const token = await generatetoken(payload);
        return res.status(200).json({ success: true, message: "Found User", token: token });


    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message })

    }

}


async function loginUser(req, res) {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("The Required fields cannot be Empty")
    }

    try {
        const finduser = await client.user.findUnique({
            where: {
                email: email
            }



        });

        const payload = {
            email: finduser.email,
            id: finduser.id
        }



        const compare = await bcrypt.compare(password, finduser.password);
        if (compare) {
            const token = generatetoken(payload);
            res.status(200).json({ message: "Found the User", token: token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }


    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "User not found" });
    }

}

async function getMyid(req, res) {
    if (!req.user) {
        return { verified: false, status: 401, message: "Unauthorized request" };

    }
    const id = req.user.id;

    try {
        return res.status(200).json({ id: id });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }

}

module.exports = { registerUser, loginUser, verifyToken, getMyid, googleLogin };