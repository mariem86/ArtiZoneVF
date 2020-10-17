import React,{useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
import {Link,Route} from "react-router-dom"

import {getcurrentprofile,clearCurrentProfile} from "../../js/action/profileactions"

import Swal from 'sweetalert2'



const Dashboard = ({profile,getprofilee}) => {
 
  const user =useSelector((state)=>state.authReducer.user)
  const isloading =useSelector((state)=>state.profileReducer.isloading)
  const dispatch = useDispatch();
  const history=useHistory()
  const getProfile = () => dispatch(getcurrentprofile());
    
  useEffect(() =>{
        
    (getProfile())
     
  },[]);
 
  const deleteprofilee=()=>{
    if (user.banned==false){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCurrentProfile(profile._id))
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }else{  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'you are not authorize to delete profile!!'
  })}

  }
     
    
     
if (isloading){
  return <h1>spinner...</h1>
}
 
  return (
    ( profile ===null )?(  
      <div>
           
           <div className="dashbord-container">
           <h1 className="large text-primary">Dashboard </h1>
           <p className="lead text-muted size">
        <i className="fas fa-user" />
        Welcome {user && user.firstName}
      </p>
      </div>
      <hr/><hr/>
      { (user.role=="artisan")?(
        <div className="link-container">
          <p>You have not yet setup a profile , please add some info</p>
      <Link to="/profileform"><button className="btn btn-primary my-1">create profile</button></Link>
      </div>):(<div></div>)}
               
                  </div>
      ):(
        
       
        
       
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
                <div class="counter button-container">
                    <div class="row ">
                     
                        <div class="">
                            <div class="count-data text-center">
                                     
        
        <Link to="/profileform"><button  className="btn btn-primary btn-block" onClick={()=> getprofilee(profile)}>Edit</button></Link>
        <br/>
        <Link to="/dashboard"><button type="submit" className="btn btn-primary btn-block" onClick={()=>deleteprofilee()}>Delete</button></Link >
    
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            )
 
            )
          };
export default Dashboard;