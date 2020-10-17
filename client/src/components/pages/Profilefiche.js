import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getprofilebyid} from "../../js/action/profileactions"
import {getrate,addrate} from "../../js/action/rateAction"
import StarRatingComponent from 'react-star-rating-component';
import Swal from "sweetalert2"


const Profilefiche = (props) => {

  const rates=useSelector(state=>state.rateReducer.rates)
  const user=useSelector(state=>state.authReducer.user)
  const rate=rates.filter(e=>e.profile==props.match.params.id)

  const dispatch=useDispatch()
  
  const [rating,setRating]=useState("")

  let counter=0;
  for (let i = 0; i < rate.length; i++) {
    if (user && user._id == rate[i].user){
    counter = counter+1
    } 
  }
  const addratee = (e) => {
    e.preventDefault();
    // dispatch actions
    if (counter == 0){
    dispatch(
      addrate(props.match.params.id, { 
        rating: rating
      })
    );
  }else {Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'you have already do a rating!',
  })}
  if (user.role=="artisan" || user.role=="admin"){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'you are not authorize to do a rating!',
    })
  }
    setRating("")
  };
  
  useEffect(()=>{
    dispatch(getrate())
},[])


    const getprofilefiche=()=>{
        dispatch(getprofilebyid (props.match.params.id))       
    }

  useEffect(() => {
    getprofilefiche()}, []);

    const profile= useSelector(state => state.profileReducer.profile)
    const isloading= useSelector(state => state.profileReducer.isloading)

    let count =0 ;
    let sum =0;
    let moy=0;
      for (let i = 0; i < rate.length; i++) {
        count=count+1
        sum=sum+rate[i].rating
      }
    
     moy=sum/count
    
  // if the component still loading
  if (isloading) {
    return (
     <h1>spinner....</h1>
    );
    //if there is no profile in the response
  } else if (!profile) {
    return <h1>Oups !!!! 404 Not Fount :( </h1>;
  }
  // if evrything is OK show the component
  else
    return (
<section class="section about-section gray-bg sec-container" id="about">
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-lg-6">
                        <div class="about-text go-to">
                            <h3 class="title-profile">Profile  information</h3>
                            <br/>
                            <br/>
                            <hr/>
                            <h6 class="color-description">Description</h6>
                            <p>{profile.description}</p>
                            <hr/>
                            <div class="row about-list">
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>Category</label>
                                        <p>{profile.category}</p>
                                    </div>
                                    <div class="media">
                                        <label>Adress</label>
                                        <p>{profile.adress}</p>
                                    </div>
                                    <div class="media">
                                        <label>Postal</label>
                                        <p>{profile.codePostal}</p>
                                    </div>
     
                                </div>
                                <div class="col-md-6">
                                <div class="media">
                                        <label>Phone</label>
                                          <p>{profile.phoneNumber}</p>
                                    </div>
                                    <div class="media">
                                        <label>Diploma</label>
                                          <p>{profile.Diploma}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div       class="col-lg-4">
                        <div       style={{
              width: "200px",
              height: "200px",
              fontSize: "1.5em",
            }}className="d-flex justify-content-center align-items-center mr-auto border rounded-circle text-light bg-info text-md">
                            <h1>{profile && profile.profileName && profile.profileName.split('')[0]}</h1>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="counter">
                    <div class="row">
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="500" data-speed="500">{count}</h6>
                                <p class="m-0px font-w-600">reviews number</p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                            <StarRatingComponent name ="t" value={moy}/>
                            <br/>
                            <p class="m-0px font-w-600">Total rating </p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                            <select
                            className="form-control"
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">   select rating  </option>
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                            <button onClick={addratee} className="btn btn-primary btn-block">add</button>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    );
};


export default Profilefiche;
