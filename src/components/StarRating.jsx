
import Style from "./StarRating.module.css"
import { useEffect, useState } from "react";
import {AiOutlineStar} from "react-icons/ai"

const StarRating = ({setRate,startRate,id}) => {
  
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(startRate);
    return (
      <div className={Style.starRating}>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <AiOutlineStar style={{ width: "35"}} key={index}
            className={index <= (hover || rating) ? Style.on: Style.off}
            onClick={() => {setRating(index) ,setRate(id,index)}}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
          </AiOutlineStar>
              
            
          );
        })}
      </div>
    );
  };
  


export default StarRating;
