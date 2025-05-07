import { useSelector } from "react-redux";
import { Initials } from "./redux";
import { useState ,useEffect } from "react";
import axios from "axios";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
export const ContactForm =() =>{
    const productid = useSelector((state : {User : Initials}) => state.User.productid);
    const [questions,setquestions] = useState<string[]>([]);
    const token = useSelector((state : {User : Initials}) => state.User.token);
    const contact = useSelector((state : {User : Initials}) => state.User.contact);
    const [answers,setanswers] = useState<string[]>([]);
    const [query,setquery] = useState("");
    const Key_Url = process.env.NEXT_PUBLIC_Endpoint;
    const query2 = `query Getproduct($token :String!, $productid :String!){
        getProduct(token : $token , productid : $productid){
       
          id
          questions
        
        
        }
        
        }`
        

const createProductQuery = async (e : React.FormEvent) => {
  e.preventDefault();
  console.log(answers);
  


  try {
    const response = await axios.post(
      `${Key_Url}/api/productquery/${productid}`,{
        questions : questions,
        answers : answers,
        contact : contact,
        query : query
      },
      
      {
        headers: {
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Query Created:", response.data);
    if(response.data.success){
      window.location.reload();
    }
  } catch (error :any) {
    console.error("Error creating query:", error.response?.data || error.message);
  }
};






       
          const fetchProduct2 = async () => {

            try {
              const response = await axios.post(`${Key_Url}graphql` , {
                query : query2,
                variables : {token : `Bearer ${token}` , productid : productid}
              });
              console.log(response.data.data.getProduct[0].questions)
              setquestions(response.data.data.getProduct[0].questions)
             
              return response.data;
              
            } catch (error) {
              console.log(error)
              
            }
          };


          useEffect(()=>{
            fetchProduct2()

          } ,[])
    return(
        <div className="min-h-fit flex items-center justify-center bg-gray-100">
  <div className="bg-amber-400 w-[350px] p-6 rounded-2xl shadow-md">
    <form action="" className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
      {questions.map((question, index) => (
  <div key={index} className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-800">{question}</label>
    <Input
      type="text"
      className="rounded-md shadow-sm"
      onChange={(e) => {
        const newAnswers = [...answers];
        newAnswers[index] = e.target.value;
        setanswers(newAnswers);
      }}
    />
  </div>
  
))}
   <Input type="text" placeholder="Add Your Query" onChange={(e) => setquery(e.target.value)} className="rounded-md shadow-sm"/>

     
      </div>

      <Button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        onClick={createProductQuery}
      >
        Submit
      </Button>
    </form>
  </div>
</div>

          
    )
}