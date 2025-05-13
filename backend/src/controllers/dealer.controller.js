const { PrismaClient } = require("../../output/client");
const prisma = new PrismaClient();

const createDealer = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized" });
    }

    
    const { name, email } = req.body;
    const id = req.user.id;
    try {




        if (!name) {
            throw new Error("Name atleast Canot be Empty");
        }
        const isVerified = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
  

        if (!isVerified) {

            const dealer = await prisma.dealers.create({
                data: {
                    name: name,
                    email: email,
                    verified: false,
                    idd: id
                }
            });

            return res.status(201).json({ message: "Dealer Created", dealer: dealer })

        } else {
            const dealer = await prisma.dealers.create({
                data: {
                    name: name,
                    idd: id,
                    dealerid: isVerified.id,
                    verified: true,
                    Users : {
                        connect : {
                            id : isVerified.id
                        }
                    }
                    
                   

                }
            });
            return res.status(201).json({ message: "Dealer Created", dealer: dealer })

        }


    } catch (error) {
       return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
const getDealers = async (req, res) => {
    try {

        if (!req.user) {
            return { verified: false, status: 401, message: "Unauthorized request" };
        }

        let id = req.user.id;


        const dealers = await prisma.dealers.findMany({
            where: {
                idd: id
                
            },
            select: {
                 Users : {
                    select : {
                        name : true,
                        email : true
                    }
                 }
            }
        });

        return res.status(200).json({ message: "Collected Dealers Sucessfully", dealers : dealers })


    } catch (error) {
        res.status(500).json({ message: "Something went Wrong", error: error.message })

    }

}



module.exports = {
    createDealer,
    getDealers
}