 import axios from "axios";

 export interface Transaction {
    id: string;         
    createdAt: Date;   
    amount: number;
    type: string;      
    dealer: string;
  }

// const dispatch = useDispatch();
 export const getallDealers = async (token :string) => {
    
        try {
            const Keyurl = process.env.NEXT_PUBLIC_Endpoint;

            const response = await fetch(`${Keyurl}api/getdealer`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }

            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }


            const data = await response.json();
            console.log(data);
            return data?.dealers?.[0]?.Dealer;
            

        } catch (error) {
            console.log(error)

        }
    };

  export async function getTransaction(projectId :string , token :string) {
    const Keyurl = process.env.NEXT_PUBLIC_Endpoint;
        return await axios.get(`${Keyurl}api/mytransactions/${projectId}` ,{
            headers : {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
      }

// Assuming this interface matches your returned user shape
export interface User {
    id: string;
    name: string;
    lastname: string;
    email: string;
    contact: string; // or number | BigInt if needed
    googlemail: string;
    extra: string;
  }
  
  export const fetchUserData = async (token: string, Keyurl: string): Promise<User | null> => {
    const query = `
      query GetUser($token: String!) {
        getUser(token: $token) {
          id
          name
          lastname
          email
          contact
          googlemail
          extra
        }
      }
    `;
  
    try {
      const response = await axios.post(`${Keyurl}graphql`, {
        query,
        variables: {
          token: `Bearer ${token}`
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const userData: User = response.data.data.getUser;
      console.log(userData);
  
      return userData;
      
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };
export async function getLocationName(lat :number, lng : number) {
    const apiKey = "AIzaSyDtIIulH8gJAUT3eoAB0qsqYF0Bv1pKxtk";
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
      const data = response.data;
      if (data.status === "OK") {
        const location = data.results[0].formatted_address;
        console.log("Location:", location);
        return location;
      } else {
        throw new Error("Geocoding failed: " + data.status);
      }
    } catch (error) {
      console.error("Error getting location:", error);
      return null;
    }
  }
  

  