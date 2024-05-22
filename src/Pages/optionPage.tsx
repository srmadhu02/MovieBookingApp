import React from 'react';
import { useNavigate } from 'react-router-dom';

interface OptionPageProps {
  movie: string;
}

const OptionPage: React.FC<OptionPageProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleBookSeatingClick = () => {
    navigate('/book-seating');
  };

  const handleCustomizeRowClick = () => {
    navigate('/customize-row');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <p style={{fontSize:"32px",fontFamily:"Arial",fontWeight:"bold",color:"#333333",margin:"21.44px 0px"}}>{movie}</p>
      <p style={{fontSize:"22px",fontFamily:"Arial",fontWeight:"bold",color:"#333333",margin:"-20px 0px 0px"}}>Ticket Cost: 120</p>
  <br/>
      <br />
      <button
        onClick={handleBookSeatingClick}
        style={{
          width: '150px',
          height: '40px',
          padding:"6px 16px",
          backgroundColor: '#f84464',
          color: 'white',
          marginRight: '10px',
          cursor: 'pointer',
          borderRadius:"10px",
          fontSize:"15px",
          font:"Nunito",
          border:"None",
          
        }}
      >
        Book Ticket
      </button>
      <button
        onClick={handleCustomizeRowClick}
        style={{
          border:"none",
          width: '150px',
          padding:"6px 16px",
          borderRadius:"10px",
          height: '40px',
          fontSize:"15px",
          font:"Nunito",
          backgroundColor: '#f84464',
          color: 'white',
          marginLeft: '10px',
          cursor: 'pointer',
        }}
      >
         
        Customize Seats
      </button>
    </div>
  );
};

export default OptionPage;
