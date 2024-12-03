import React from 'react'
import { Col } from 'react-bootstrap'
import { FcSearch } from "react-icons/fc";

const Search = () => {
  return (
    <Col className="searchbox">
    <FcSearch className="searchicon" />
    <input type="search" name="searchall"  placeholder="search" className="searchinput" />
    </Col>
  )
}

export default Search