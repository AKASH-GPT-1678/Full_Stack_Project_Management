
const { PrismaClient } = require("../../output/client");
const prisma = new PrismaClient();
const { verifyToken } = require("../controllers/register.controller.js")
const graphql = require("graphql");
const {  GraphQLEnumType,GraphQLObjectType, GraphQLString } = graphql;

const Projschema = new GraphQLObjectType({
    name: "Projects",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        coverimgUrl: {type : GraphQLString}
    })

});

const UserSchema = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLString },
        lastname: { type: GraphQLString },
        name: { type: GraphQLString },
        contact : { type: GraphQLString },
        email: { type: GraphQLString },
        googlemail: { type: GraphQLString },
        extra: { type: GraphQLString },

    })

});
const OrderStatusEnum = new GraphQLEnumType({
    name: 'OrderStatus',
    values: {
        Pending: { value: 'Pending' },
        Delivered: { value: 'Delivered' }
    }
});



const ProductSchema = new GraphQLObjectType({
    name : "Product",
    fields : () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        price: {type: GraphQLString},
        description: {type: GraphQLString},
        rating: {type: GraphQLString},
        imageurl: {type: GraphQLString},
        quantity: {type: GraphQLString},
        sellerName: {type: GraphQLString},
        expirydate: {type: GraphQLString},
        category: {type: GraphQLString},
        specialmsg: {type: GraphQLString},
        stock: {type: GraphQLString},
        contact: {type: GraphQLString},
        mode: {type: GraphQLString},
        type: {type: GraphQLString},
        offers: {type: GraphQLString},
        questions : {type: new graphql.GraphQLList(GraphQLString)},
        Review: {type: new graphql.GraphQLList(GraphQLString)},
        sellerid: {type: GraphQLString},
    })
    
});

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        id: { type: GraphQLString },
        orderStatus: { type: OrderStatusEnum },
        sellerid : { type: GraphQLString },
        seller: { type: UserSchema },
        buyerName: { type: GraphQLString },
        buyerEmail: { type: GraphQLString },
        buyerContact: { type: GraphQLString },
        buyerId: { type: GraphQLString },
        orders: { type: GraphQLString },
        product: { 
            type: new graphql.GraphQLList(ProductSchema),
            
        },
         
    })
});


const RootQuery = new GraphQLObjectType({
    name: "Rootquery",
    fields: {
        getBasics: {
            type: new graphql.GraphQLList(Projschema),
            args: {
                token: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const token2 = args.token.split(" ")[1];
                const decoded = await verifyToken(token2)
                const id = decoded.id;
                const users = await prisma.user.findMany({
                    where: {
                        id: id
                    },
                    select: {
                        projects: {
                            select: {
                                id: true,
                                name: true,
                                coverimgUrl : true
                            }
                        }
                    }
                });

                return users[0]?.projects || [];
            }
        },
        getUser: {
            type : UserSchema,
            args : {
                token : {type : GraphQLString},
            },
            async resolve(parent , args){
                const token2 = args.token.split(" ")[1];
                if (!args.token || !args.token.includes(" ")) {
                    throw new Error("Invalid or missing token");
                  }
                const decoded = await verifyToken(token2);
          
                const id = decoded.id;
                

                const user = await prisma.user.findUnique({
                    where: {
                        id: id
                    },
                    select : {
                        id: true,
                        lastname: true,
                        name: true,
                        email: true,
                        contact : true,
                        googlemail: true,
                        extra: true
                    }
                   
                });
                const user2 = {
                    ...user,
                    contact : user.contact.toString()
                }

                return user2;
            }

        
        },


        getProducts: {
            type: new graphql.GraphQLList(ProductSchema),
            args: {
                token: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const token2 = args.token.split(" ")[1];
                const decoded = await verifyToken(token2)
                const id = decoded.id;
                const seller = await prisma.products.findMany({
                    where: {
                        sellerid: id
                    },
                    select : {
                        id: true,
                        name: true,
                        price: true,
                        description: true,
                        rating: true,
                        imageurl: true,
                        quantity: true,
                        sellerName: true,
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
                })
                return seller;
            }
        },
        getBuyerOrder: {  
            type: new graphql.GraphQLList(OrderType),
            args: {
                token: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const token2 = args.token.split(" ")[1];
                const decoded = await verifyToken(token2)
                const id = decoded.id;
                const orders = await prisma.order.findMany({
                    where: {
                        buyerId: id,
                    },
                    select: {
                        id: true,
                        orderStatus: true,
                        sellerid: true,
                        buyerId: true,
                        buyerName: true,
                        buyerEmail: true,
                        buyerContact: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                imageurl: true,
                                sellerName: true,
                            }
                        }
                    },
                  
                });
                return orders;
            }
        },
        getSellerOrder: {  
            type: new graphql.GraphQLList(OrderType),
            args: {
                token: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const token2 = args.token.split(" ")[1];
                const decoded = await verifyToken(token2);
                const id = decoded.id;
                const orders = await prisma.order.findMany({
                    where: {
                        sellerid: id,
                    },
                    select : {
                        id: true,
                        orderStatus: true,
                        sellerid: true,
                        buyerId: true,
                        buyerName: true,
                        buyerEmail: true,
                        buyerContact: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                imageurl: true,
                                sellerName: true,
                            }
                        }
                    }
                    
                  
                });
                return orders;
            }
        },
                  

        getProduct: {
            type: new graphql.GraphQLList(ProductSchema),
            args: {
                token: { type: GraphQLString },
                productid : {type : GraphQLString}

            },
            async resolve(parent, args) {
                const token2 = args.token.split(" ")[1];
                const productid = args.productid;
                const decoded = await verifyToken(token2);
                if (!decoded) {
                    throw new Error("Unauthorized");
                  }
                  
                
                const product = await prisma.products.findMany({
                    where: {
                        id : productid
                    },
                    select : {
                        id: true,
                        name: true,
                        price: true,
                        description: true,
                        rating: true,
                        imageurl: true,
                        quantity: true,
                        sellerName: true,
                        expirydate: true,
                        category: true,
                        questions : true,
                        specialmsg: true,
                        stock: true,
                        contact: true,
                        mode: true,
                        type: true,
                        offers: true,
                        Review: true
                    }
                })
                return product;
            }
        },

        // updateProduct : {
        //     args : {token : GraphQLString},

        // },
        // async resolve(parent ,args){
        //     const token2 = args.token.split(" ")[1];
        //     const decoded = await verifyToken(token2)
        //     const id = decoded.id;
        //     const update = await prisma.products.updateMany({
        //         where : {
        //             sellerid : id
        //         },
        //         data : {

        //         }
        //     })

        // }

     
        
    
    }
});



module.exports = new graphql.GraphQLSchema({
    query: RootQuery
});
