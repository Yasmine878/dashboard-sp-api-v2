import React from 'react';

function DashboardFilters({ fournisseurs, onFilterChange, selectedFournisseur, onDateChange }) {
  const handleDateChange = (e, type) => {
    const value = e.target.value;
    onDateChange(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className="filters">
      <label htmlFor="fournisseur">Fournisseur :</label>
      <select
        id="fournisseur"
        value={selectedFournisseur}
        onChange={(e) => onFilterChange(e.target.value)}
        className="select-input"
      >
        <option value="">Tous les fournisseurs</option>
        {fournisseurs.map((f, idx) => (
          <option key={idx} value={f}>{f}</option>
        ))}
      </select>

      <label htmlFor="date-debut">Date de début :</label>
      <input
        id="date-debut"
        type="month"
        onChange={(e) => handleDateChange(e, 'start')}
        className="date-input"
      />

      <label htmlFor="date-fin">Date de fin :</label>
      <input
        id="date-fin"
        type="month"
        onChange={(e) => handleDateChange(e, 'end')}
        className="date-input"
      />
    </div>
  );
}

export default DashboardFilters;
