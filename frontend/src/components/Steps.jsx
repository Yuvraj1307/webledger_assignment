import axios from "axios";
import { useEffect, useState } from "react";

import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react'
 

function Steps(){
    var urlParams = new URLSearchParams(window.location.search);
    let id=urlParams.get("id")
    let [step,setSteps]=useState(null)
    console.log(id)
useEffect(()=>{
        axios
        .get(`http://localhost:4500/recipie/steps/${id}`,{
          headers:{
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          }
      })
        .then((res) =>{
          console.log(res.data[0].steps)
          setSteps(res.data[0].steps)
        })
        .catch((err) =>{
           console.log(err)});

},[id])

return (
   
         <ol>

     {step? step.map((el,i)=>{
    
       return (
         <>
        <li><b>{el.number} {el.step}</b>
            <ul>
            <b>Ingredients:</b>
              {
                el.ingredients.map((el,i)=>{
                    return (
                       <>
                      <li>name :{el.name}</li>
                      <li>localizedname: {el.localizedName}</li>
                      <li><img src={el.image} alt="" /></li>
                       </>
                      )
                })
            }
            </ul>
            <ul>
              <b>Equiptments:</b>
              {el.equipment.length>0 ?
                 el.equipment.map((el,i)=>{
                    return (
                       <>
                      <li>name :{el.name}</li>
                      <li>localizedname: {el.localizedName}</li>
                      <li><img src={el.image} alt="" /></li>
                       </>
                      )
                })
                :"NA"
            }
            </ul>
        </li>
         
          
         </>
         )
        })
        :
        <h1><b>Recipie not available</b></h1>
      }
      </ol>
   
)

}


export default Steps