import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { auth } from "@/firebase";
import { getAuth } from "firebase/auth";

function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="))
    ?.split("=")[1];
}
 
const LoginMutationFunc =async (data:any)=>{
  const res = await axios.post('http://localhost:5000/api/v1/auth/login',data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  document.cookie = `accessToken=${res.data.accessToken}`;

  window.location.href = "/"

}

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: LoginMutationFunc,
  });
};


export default useLoginMutation;