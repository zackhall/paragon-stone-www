import React from 'react'
import { Link } from 'gatsby'

const Dropdown = ({ text, to, children }) => (
  <div className="paragon-dropdown">
    {console.log(text)}
    {console.log(to)}
    {console.log(children)}
    <Link to={to}>{text}</Link>
    <ul>
      {
        React.Children.map(children, (child) => (
          <li>{child}</li>
        ))
      }
    </ul>
  </div>
)

export default Dropdown