import React, { useState, useEffect } from 'react';
import './seatBooking.css';

interface SeatProps {
  col: number;
  isBooked: boolean;
  isBlocked: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const Seat: React.FC<SeatProps> = ({ col, isBooked, isBlocked, isSelected, onClick }) => {
  if (isBlocked) {
    return <div className="blocked-seat" />;; // Render nothing if the seat is blocked
  }
  let className = 'seat';
  if (isBooked) className += ' booked';
  if (isBlocked) className += ' blocked';
  if (isSelected) className += ' selected';
  return (
    <div className={className} onClick={onClick}>
      {col}
    </div>
  );
};

interface ConfirmationPageProps {
  movie: string;
  selectedSeats: string[];
  totalCost: number;
  handleFinalSubmit: () => void;
  handleBack: () => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ movie, selectedSeats, totalCost, handleFinalSubmit, handleBack }) => {
  const [timer, setTimer] = useState<number>(10);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const bookingCharge = 80;
  const finalTotal = totalCost + bookingCharge;

  return (
    <div className="confirmation-alert">
      <div className="confirmation-content">
        <button className="back-button" onClick={handleBack}>⬅</button>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <h3>BOOKING SUMMARY</h3>
          <p style={{color:"#4d4b4b",fontWeight:"bold"}}>{movie}</p>
        </div>
        <br/>
        <div className="details-row">
          <span>{selectedSeats.join(', ')} ({selectedSeats.length} Tickets)</span>
          <span>Rs.{totalCost}</span>
        </div>
        <br/>
        <div className="details-row">
          <span>Booking Charge</span>
          <span>Rs.{bookingCharge}</span>
        </div>
        <br/>
        <hr/>
        <br/>
        <div className="total-row">
          <span>Total</span>
          <span>Rs.{finalTotal}</span>
        </div>  <br />
        <button
          className="submit-button"
          onClick={handleFinalSubmit}
          disabled={timer === 0}
          style={{
            backgroundColor: timer === 0 ?  '#f57a90' : '#f84464',
            color: timer === 0 ? 'white' : 'white',
            borderRadius:"4px",
          }}
        >
          Confirm Booking ({timer})
        </button>
      </div>
    </div>
  );
};

interface SeatBookingProps {
  movie: string;
}

const SeatBooking: React.FC<SeatBookingProps> = ({ movie }) => {
  const [rows, setRows] = useState<number>(6);
  const [cols, setCols] = useState<number>(20);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>(() => {
    const savedSeats = localStorage.getItem('bookedSeats');
    return savedSeats ? JSON.parse(savedSeats) : [];
  });
  const [blockedSeats, setBlockedSeats] = useState<string[]>(() => {
    const savedSeats = localStorage.getItem('blockedSeats');
    return savedSeats ? JSON.parse(savedSeats) : [];
  });
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const seatPrice = 120;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const handlePay = () => {
    setShowConfirmation(true);
  };

  const toggleSeatSelection = (row: number, col: number) => {
    const seat = `${alphabet[row -1]}-${col}`;
    if (!blockedSeats.includes(seat)) {
      setSelectedSeats(prev =>
        prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
      );
    }
  };

  const handleFinalSubmit = () => {
    setBookedSeats(prev => [...prev, ...selectedSeats]);
    localStorage.setItem('bookedSeats', JSON.stringify([...bookedSeats, ...selectedSeats]));
    setSelectedSeats([]);
    setShowConfirmation(false);
  };

  const handleBack = () => {
    setShowConfirmation(false);
  };

  const handleBeforeUnload = () => {
    localStorage.removeItem('bookedSeats');
    setBookedSeats([]);
  };

  useEffect(() => {
    const savedBlockedSeats = localStorage.getItem('blockedSeats');
    if (savedBlockedSeats) {
      setBlockedSeats(JSON.parse(savedBlockedSeats));
    }
  }, []);

  return (
    <div className="container">
      <h1 style={{color:"#333333"}}>{movie}</h1>
      <div className="seating-layout">
        {[...Array(rows)].map((_, i) => (
          <div key={`row-${i + 1}`} className="row">
             <div className="row-label" style={{color:"#333333"}}>{alphabet[i]}</div>
            {Array.from({ length: cols }, (_, j) => {
              const col = j + 1;
              const seat = `${alphabet[i]}-${col}`;
              return (
                <Seat
                  key={seat}
                  col={col}
                  isBooked={bookedSeats.includes(seat)}
                  isBlocked={blockedSeats.includes(seat)}
                  isSelected={selectedSeats.includes(seat)}
                  onClick={() => toggleSeatSelection(i + 1, col)}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="payment">
        <button className="pay-button" onClick={handlePay}>Pay Rs.{selectedSeats.length * seatPrice}</button>
      </div>
      {showConfirmation && (
        <ConfirmationPage
          movie={movie}
          selectedSeats={selectedSeats}
          totalCost={selectedSeats.length * seatPrice}
          handleFinalSubmit={handleFinalSubmit}
          handleBack={handleBack}
        />
      )}
    </div>
  );
};

export default SeatBooking;
