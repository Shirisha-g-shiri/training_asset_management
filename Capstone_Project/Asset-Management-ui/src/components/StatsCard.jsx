import React from 'react';

const StatsCard = ({ title, value, icon, color = 'primary', subtitle, clickable = false, onClick }) => {
  const cardContent = (
    <div className={`card h-100 border-top border-3`} style={{ borderColor: `var(--bs-${color})` }}>
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className={`bg-${color} bg-opacity-10 p-3 rounded-circle me-3`}>
            <i className={`bi ${icon} text-${color} fs-4`}></i>
          </div>
          <div className="flex-grow-1">
            <h6 className="card-subtitle mb-1 text-muted">{title}</h6>
            <h2 className="card-title mb-0 fw-bold">{value}</h2>
            {subtitle && <small className="text-muted">{subtitle}</small>}
          </div>
        </div>
      </div>
    </div>
  );

  return clickable ? (
    <div className="cursor-pointer" onClick={onClick}>
      {cardContent}
    </div>
  ) : cardContent;
};

export default StatsCard;