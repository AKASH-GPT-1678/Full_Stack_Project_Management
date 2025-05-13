const { PrismaClient } = require("../../output/client")
const prisma = new PrismaClient();



async function createProductQuery(req, res) {
    if (!req.user) {
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized" });
    };
    const { questions, answers, query, name, contact } = req.body;
    const productId = req.params.productid;
    const userid = req.user.id;
    if (!productId) {
        return res.status(401).json({ verified: false, status: 401, message: "Product Not Found" });
    };
    if (!contact) {
        return res.status(401).json({ verified: false, status: 401, message: "Contact Not Found" });
    };

    try {

        const createquery = await prisma.productQuery.create({
            data: {
                username: name,
                question: questions,
                answers: answers,
                name: name,
                contact: contact,
                additionalQueies: query,
                Product: {
                    connect: {
                        id: productId
                    }
                },
                User: {
                    connect: {
                        id: userid
                    }
                }
            }
        });

        return res.status(201).json({ message: "Query Created", query: createquery, success: true });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })

    }








}

async function getAllReviews(req, res) {
    const productId = req.params.productid;


    const reviews = await prisma.review.findMany({
        where: {
            Product: {
                id: productId
            },


        },
        select: {
            review: true,
            rating: true,

            User: {
                select: {
                    name: true

                }
            }
        }
    });
    return res.status(200).json({ message: "Found", reviews: reviews });

}


async function addReview(req, res) {
    if (!req.user) {
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized" });

    };
    const { review, rating } = req.body;
    const productId = req.params.productid;
    const userid = req.user.id;
    if (!productId) {
        return res.status(401).json({ verified: false, status: 401, message: "Product Not Found" });
    };
    try {

        const addReview = await prisma.review.create({
            data: {
                review: review,
                rating: parseFloat(rating),
                Product: {
                    connect: {
                        id: productId
                    }
                },
                User: {
                    connect: {
                        id: userid
                    }
                }
            }
        });
        return res.status(200).json({
            message: "Review Added Successfully",
            review: addReview
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })

    }


};

async function createOrder(req, res) {
    if (!req.user) {
        return res.status(401).json({ verified: false, status: 401, message: "Unauthorized" });

    };

    const productid = req.params.productid;

    if (!productid) {
        return res.status(401).json({ verified: false, status: 401, message: "Product Not Found" });
    };
    const { status } = req.body;
    const userid = req.user.id;

    try {
        const seller = await prisma.products.findUnique({
            where: {
                id: productid
            },
            include : {
                Seller : true
            }
        });
        const user = await prisma.user.findUnique({
            where: {
                id: userid
            },select : {
                name : true,
                email : true,
                contact : true,
               
            }
        })
 
        const sellerId = seller.Seller.id;
        console.log(sellerId);

        if (!seller) {
            return res.status(401).json({ verified: false, status: 401, message: "Product Not Found" });
        };
        const order = await prisma.order.create({
            data: {
             
                orderStatus: status,
                buyerEmail: user.email,
                buyerId : userid,
                buyerName : user.name,
                buyerContact : user.contact.toString(),
                product: {
                    connect: {
                        id: productid
                    },
                },
                seller :{
                    connect : {
                        id : sellerId
                    }
                },
  
            
            }

        });

        return res.status(200).json({ message: "Order Created", order: order, success: true });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }

}



module.exports = {
    createProductQuery,
    addReview,
    getAllReviews,
    createOrder
}



