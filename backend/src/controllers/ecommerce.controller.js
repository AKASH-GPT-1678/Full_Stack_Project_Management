const { PrismaClient } = require("../../output/client");
const prisma = new PrismaClient();
const { pathname } = require("../configs/multer.config.js");
const path = require("path")
const { bucketName, storage } = require("../configs/cloud.config.js");
const files = require("fs");




const saveProduct = async (req, res) => {
    try {

        const { name, price, category, description, quantity, sellerName, questions, specialmsg, offers, type, contact } = req.body;


        if (!name || !price || !description || !quantity) {
            return res.status(400).send({ message: "Name, price, description and quantity are required." });

        }

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        if (!req.user) {
            return { verified: false, status: 401, message: "Unauthorized request" };
        }

        const id = req.user.id;
        const question = JSON.parse(questions);
        const contactt = parseInt(contact);
        const localFilePath = path.join(pathname, req.file.filename);
        const bucket = storage.bucket(bucketName);
        if (req.file) {

            await bucket.upload(localFilePath, {
                destination: req.file.originalname,
                resumable: false,


            });




        }

        const fileUrl = `https://storage.googleapis.com/${bucketName}/${encodeURIComponent(req.file.originalname)}`;;




        const product = await prisma.products.create({
            data: {
                name: name,
                price: price,
                description: description,
                quantity: quantity,
                sellerName: sellerName,
                questions : question,
                category: category,
                imageurl: fileUrl,
                specialmsg: specialmsg,
                type: type,

                contact: contact,
                offers: offers,
                Seller: {
                    connect: {
                        id: id
                    }
                }
            }

        });

        files.unlinkSync(localFilePath);





        res.status(201).json({
            message: "Product added successfully", product

        });









    } catch (error) {
        res.status(500).json({ message: "Ae madarchod sahi se bhejna Data ", error: error.message })
    }

};


const getAllProducts = async () => {
    try {



        if (!req.user) {
            return { verified: false, status: 401, message: "Unauthorized request" };
        }

        const idd = req.user.id;

        const products = await prisma.sellerAccount.findMany({
            where: {
                id: idd
            },
            include: {
                Product: true
            }

        });
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}

async function getdisplyproducts(req, res) {
    try {

        const Pharma = await prisma.products.findMany({
            where: {
                category: "Pharma_Essentials"
            }
        });

        const Party = await prisma.products.findMany({
            where: {
                category: "Party_Essentials"
            }
        });

        const BasicElectricals = await prisma.products.findMany({
            where: {
                category: "Basic_Electricals"
            }
        });

        const Construction = await prisma.products.findMany({
            where: {
                category: "Construction_Essentials"
            }
        });

        const FoodEssentials = await prisma.products.findMany({
            where: {
                category: "Food_Essentials"
            }
        });

        const Apparels = await prisma.products.findMany({
            where: {
                category: "Apparels_Clothing_and_Garments"
            }
        });

        const ElectricalGoods = await prisma.products.findMany({
            where: {
                category: "Electrical_Goods_and_Supplies"
            }
        });

        const HospitalMedical = await prisma.products.findMany({
            where: {
                category: "Hospital_and_Medical_Equipment"
            }
        });

        const IndustrialMachinery = await prisma.products.findMany({
            where: {
                category: "Industrial_Plants_Machinery_and_Equipment"
            }
        });

        return res.status(200).json({
            found: true,
            Pharma: Pharma,
            Party: Party,
            BasicElectricals: BasicElectricals,
            Construction: Construction,
            FoodEssentials: FoodEssentials,
            Apparels: Apparels,
            ElectricalGoods: ElectricalGoods,
            HospitalMedical: HospitalMedical,
            IndustrialMachinery: IndustrialMachinery
        });


    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }

}


async function setInventory(req, res) {
    if (!req.user) {
        return res.status(401).json({ verfied: false, status: 401, message: "Unauthorized" });
    }
    console.log("Request arrived")



    try {
        const { quantity } = req.body;
        const productid = req.params.productid;
        const id = req.user.id


        const seller = await prisma.products.update({
            where: {
                id: productid,
                sellerid: id
            },
            data: {
                stock: quantity,


            }
        });
        return res.status(200).json({ message: "Inventory Updated Sucessfully", seller })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })

    }

}
async function placeOrder(req, res) {

}


async function addtoWishlist(req, res) {
    if (!req.user) {
        return res.status(401).json({ verfied: false, status: 401, message: "Unauthorized" });

    };

    try {
        const productId = req.params.productid;
        const id = req.user.id;

        const wishlist = await prisma.wishList.create({
            data: {
                userid: id,
                productid: productId

            }
        });


        return res.status(200).json({
            message: "Product added to wishlist",
            wishlist,
          
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })

    }

};


async function getProduct(req, res) {
    if (!req.user) {
        return res.status(401).json({ verfied: false, status: 401, message: "Unauthorized" });


    };

    const id = req.params.productid;
    try {

        const product = await prisma.products.findUnique({
            where: {
                id: id
            },

            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                rating: true,
                imageurl: true,
                quantity: true,
                sellerName: true,
                expirydate: true,
                questions : true,
                category: true,
                specialmsg: true,
                stock: true,
                contact: true,
                mode: true,
                type: true,
                offers: true,
                Review: true

            }
        });
        // const updated = {
        //     ...product,

        // }
        return res.status(200).json({
            message: "Products Found",
            data: product
        })



    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })

    }

}


async function getWishList(req, res) {
    if (!req.user) {
        return res.status(401).json({ verfied: false, status: 401, message: "Unauthorized" });

    };
    const id = req.user.id;
    try {
        const getmany = await prisma.wishList.findMany({
            where: {
                userid: id,


            },

            select: {
                Product: {
                    select: {
                        id: true,
                        name: true,
                        imageurl: true,
                        price: true,
                        description: true,
                        rating: true
                    }
                }
            }
        })
        return res.status(200).json({
            message: "Found",

            data: getmany.map((iitem) =>iitem.Product)
        })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })

    }


}

async function getServices(req,res) {

    const service = await prisma.products.findMany({
        where : {
            type : "Service",
        }
    })
    return res.status(200).json({
        message: "Found",
        data: service
    })
    
};

module.exports = {
    getAllProducts,
    saveProduct,
    getdisplyproducts,
    setInventory,
    addtoWishlist,
    getWishList,
    getProduct,
    getServices
}