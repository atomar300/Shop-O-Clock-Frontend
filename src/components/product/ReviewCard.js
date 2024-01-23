import React from 'react';
import profilePng from "../../images/user-profile-icon-free-vector.jpg";
import { Rating } from '@mui/material';


const ReviewCard = ({ review }) => {

  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className='testimonial-box'>
      <div className='box-top'>
        <div className='profile'>
          <div className='profile-img'>
            <img src={profilePng} alt="User" />
          </div>
          <div className='name-user'>
            <strong>{review.name}</strong>
          </div>
        </div>
        <div className='reviews'>
          <Rating {...options} />
        </div>
      </div>

      <div className='client-comment'>
        <p>{review.comment}</p>
      </div>
    </div>

  )
}

export default ReviewCard