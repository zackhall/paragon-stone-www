import React from 'react'

export const Select = ({ label, children }) => (
  <div className="dropdown is-active">
    <div className="dropdown-trigger">
      <button
        className="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
      >
        <span>{label}</span>
        <span className="icon is-small">
          <i className="fas fa-angle-down" aria-hidden="true" />
        </span>
      </button>
    </div>
    <div className="dropdown-menu" id="dropdown-menu" role="menu">
      <div className="dropdown-content">{children}</div>
    </div>
  </div>
)

export const SelectItem = ({ children, onClick }) => (
  <div className="dropdown-item" onClick={onClick} role="button">
    {children}
  </div>
)
