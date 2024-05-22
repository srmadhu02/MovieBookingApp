import React, { useState, useEffect } from 'react';
import './customizeRow.css';
import OptionPage from './optionPage';

interface CustomizeRowProps {
  movie: string;
}

interface SeatProps {
  col: number;
  isBlocked: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const Seat1: React.FC<SeatProps> = ({ col, isBlocked, isSelected, onClick }) => {
  let className = 'seat1';
  if (isBlocked) className += ' blocked1';
  if (isSelected) className += ' selected';
  return (
    <div className={className} onClick={onClick}>
      {col}
    </div>
  );
};

const CustomizeRow: React.FC<CustomizeRowProps> = ({ movie }) => {
  const [rows, setRows] = useState<number>(6);
  const [cols, setCols] = useState<number>(20);
  const [onSetupPage, setOnSetupPage] = useState<boolean>(true);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const toggleSeatSelection = (row: number, col: number) => {
    const seat1 = `${alphabet[row - 1]}-${col}`;
    setSelectedSeats(prev =>
      prev.includes(seat1) ? prev.filter(s => s !== seat1) : [...prev, seat1]
    );
  };

  const handleSaveSetup = () => {
    localStorage.setItem('blockedSeats', JSON.stringify(selectedSeats));
    setSelectedSeats([]);
    setOnSetupPage(false);
  };

  useEffect(() => {
    // Clear blockedSeats from localStorage on page refresh
    const handleBeforeUnload = () => {
      localStorage.removeItem('blockedSeats');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const renderSeats = () => {
    const seats: JSX.Element[] = [];
    for (let i = 1; i <= rows; i++) {
      const rowLabel = alphabet[i - 1];
      seats.push(
        <div key={`row-${i}`} className="row">
          <div className="row-label">{rowLabel}</div>
          {Array.from({ length: cols }, (_, j) => {
            const col = j + 1;
            const seat1 = `${rowLabel}-${col}`;
            const isBlocked = selectedSeats.includes(seat1); 
            return (
              <Seat1
                key={seat1}
                col={col}
                isBlocked={isBlocked} // Always set blocked to false for fresh seats
                isSelected={selectedSeats.includes(seat1)}
                onClick={() => toggleSeatSelection(i, col)}
              />
            );
          })}
        </div>
      );
    }
    return seats;
  };

  return (
    <>
      <div className="container">
        {onSetupPage ? (
          <>
            <h1 style={{color:"#333333"}}>{movie}</h1>
            <div className="settings">
              <div className="input-group">
                <label htmlFor="rows">Rows:</label>
                <input id="rows" type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))} />
              </div>
              <div className="input-group">
                <label htmlFor="cols">Columns:</label>
                <input id="cols" type="number" value={cols} onChange={(e) => setCols(Number(e.target.value))} />
              </div>
              <button className="save-setup" onClick={handleSaveSetup}>Save Setup</button>
            </div>
            <h2><span style={{color:"#333333"}}>Select Seats to be </span><span className="blocked1">Blocked</span></h2>
            <div className="seating-layout">
              {renderSeats()}
            </div>
          </>
        ) : (
          <OptionPage movie={movie} />
        )}
      </div>
    </>
  );
};

export default CustomizeRow;
