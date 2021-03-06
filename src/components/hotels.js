// import web3 from "./web3";
import axios from "axios";
import React , {useEffect , useState } from "react";
import "../style.css"
import { Router  , useHistory} from "react-router-dom";
import { FaStar } from 'react-icons/fa';




function Hotels({token ,userId}) {

  const history = useHistory()

  const [data, setData] = useState([])
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [img, setImg] = useState("")

  const [nameUp, setNameUp] = useState("")
  const [descriptionUp, setDescriptionUp] = useState("")
  const [imgUp, setImgUp] = useState("")

 const [RateArr, setRateArr] = useState([0,0,0,0,0])



  const [switchInput , setSwitchInput] = useState(false)

  useEffect(() => {
    const getData = async () => {
        console.log(token);
        const respone = await axios.get("https://tuwaiq-project-hotel.herokuapp.com/hotel" , {headers: { authorization: `Bearer ${token}` }})
        setData(respone.data); 
        // console.log(respone.data);
    }
    getData();
  }, [token])

 

  const updateData = async (id) => {
    // console.log(id);
    const respone = await axios.put("https://tuwaiq-project-hotel.herokuapp.com/hotel/" , {
      idold : id , 
      name : nameUp , 
      description : descriptionUp , 
      img: imgUp,
    })
    setData(respone.data)
  }

  const inputUpdate = (id) => {
      return <div>
        <input onChange={(e)=>{setNameUp(e.target.value)}} type="text" placeholder="name"/>
        <input onChange={(e)=>{setDescriptionUp(e.target.value)}} type="text" placeholder="description"/>
        <input onChange={(e)=>{setImgUp(e.target.value)}} type="text" placeholder="img"/>
        <button onClick={()=>{updateData(id)}} >update now</button>
        </div>
  }

  
  const getRate = (rate)=> { 
    return <div>{
      RateArr.map((element , i) => {
        if (i+1 < rate) {
          // console.log(i+1 , rate);
          return <FaStar style={{color : "orange"}}></FaStar>
        }
     })}
    </div>  
  }

  const bookadd =(id)=>{
    history.push("/book/" + id)
  }
  
  return (
    <div id="container">
     
      
      
      {data && data.map((element , i) => {
        return <div key = {i} id="courses-all">
        <div id="courses">
        <div id="element">
        {/* <p>{element.user.name}</p> */}
        <h5>{element.name}</h5> 
        <p>{element.description}</p>
        </div>
        <img id="imghotel" src={element.img} alt="Javascript"></img>
        
      
        </div>
        <h4>{element.price} S.R</h4> 
    
        {
          getRate(element.rate)
        }
        
        <button className="btn-primary my-2" onClick={()=>{bookadd(element._id)}} >???????????? ????????????</button>
        
        </div>
      })}
      
    </div>
  );
}

export default Hotels;
