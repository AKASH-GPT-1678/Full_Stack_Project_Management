import axios from "axios";

const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
export const sendGoogleLoginData = async (email: string, name: string) => {



    try {

       const response =    await axios.post(`http://localhost:3400/api/google`, {
            email,
            name
        })
        console.log(response.data);


        // const token = response.data.token;
        // console.log("Server response:", response.data);
        // console.log("Token:", token);

        // dispatch(setToken(token));

        // if (response.data.success === true) {

        //     // router.push("/");
        // } else {
        //     console.error("Login succeeded but backend did not confirm success flag.");
        // }
        return  response;
    } catch (error) {
        console.error("Error sending data to backend:", error);

    }
};
