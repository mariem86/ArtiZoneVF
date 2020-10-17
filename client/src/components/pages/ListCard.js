import React,{useEffect} from 'react'
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';
import {getrate,addrate} from "../../js/action/rateAction"
import Swal from "sweetalert2"

function ListCard({profile: { category,codePostal,_id,profileName }}) {
  const isAuth=useSelector(state=>state.authReducer.isAuth)
  const history=useHistory()
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getrate())
},[])

  const rates=useSelector(state=>state.rateReducer.rates)
  const rate=rates.filter(e=>e.profile== _id)

  let count =0 ;
    let sum =0;
    let moy=0;

      for (let i = 0; i < rate.length; i++) {
        count=count+1
        sum=sum+rate[i].rating
      }
    
     moy=sum/count

     const  handlesubmit=()=>{
      if (!isAuth) {   Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'To view profile you must log in!',
      })
      history.push("/login")}
    }
    return (
     
      <div >
      <div className="card p-3">
          <div className="d-flex align-items-center">
              <div > <img src="https://previews.123rf.com/images/jemastock/jemastock1709/jemastock170909982/85612118-travailleur-de-r%C3%A9paration-ou-avatar-bricoleur-avec-bras-crois%C3%A9s-ic%C3%B4ne-image-vector-illustration-design.jpg" className="rounded image2" /> </div>
              <div className="ml-3 w-100">
    <h4 className="mb-0 mt-0">{profileName}</h4> <p>{category}</p>  <span><i className="fas fa-map-marker-alt">{" "}{codePostal}</i></span>
                  <div className="p-2 mt-2    rounded  " style={{backgroundColor:"#e7e9ec"}}>
                      <div className="d-flex flex-column"> <span className="rating">Rating</span> <span className="number3"> <StarRatingComponent name ="t" value={moy}/></span> </div>
                  </div>
                  <div className="button mt-2 d-flex flex-row align-items-center"> <button className="btn btn-sm btn-primary w-100 ml-2"onClick={handlesubmit}><Link className="text-white" to={`/profilefiche/${_id}`}>view profil</Link></button>  </div>
              </div>
          </div>
      </div>
  </div>
                
      
    )
}
export default ListCard


