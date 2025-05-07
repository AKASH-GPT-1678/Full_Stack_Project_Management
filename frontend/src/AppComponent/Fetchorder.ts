import axios from "axios";
const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    

export const fetchBuyerOrders = async (token: string) => {
    try {
        const response = await axios.post(`${Key_Url}graphql`, {
            query: `
        query GetBuyerOrders($token: String!) {
          getBuyerOrder(token: $token) {
            id
            product {
              name
              contact
              category
              price
              sellerid
              sellerName
            }
          }
        }
      `,
            variables: {
                token: `Bearer ${token}`
            }
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(response.data);
        return response.data.data.getBuyerOrder;
    } catch (error) {
        console.error("Failed to fetch buyer orders:", error);
    }
};

export const fetchSellerOrders = async (token: string) => {
    try {
        const response = await axios.post(`${Key_Url}graphql`, {
            query: `
        query GetSellerOrders($token: String!) {
          getSellerOrder(token: $token) {
            id
            buyerId
            buyerName
            buyerEmail
            buyerContact
            product {
              id
              name
              imageurl
              specialmsg
            }
          }
        }
      `,
            variables: {
                token: `Bearer ${token}`
            }
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(response.data);
        return response.data.data.getSellerOrder
    } catch (error) {
        console.error("Failed to fetch seller orders:", error);
    }
};
