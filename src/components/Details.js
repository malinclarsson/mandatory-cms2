import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
// import Reviews from './Reviews';
import { FaCartArrowDown } from "react-icons/fa";

const Details = props => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://192.168.99.102:8080/api/collections/get/Products?filter[_id]=${props.match.params.id}`
      )
      .then(res => setResult(res.data.entries[0]));
  }, [props.match.params.id]);

  //console.log('props.match.params.id = ' + props.match.params.id)
  console.log("result = ", result);

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    let newCart;
    if (cart.hasOwnProperty(result._id)) {
      cart[result._id].quantity += 1;
      newCart = cart;
    } else {
      newCart = { ...cart, [result._id]: { ...result, quantity: 1 } };
    }
    props.setCart(newCart);

    localStorage.setItem("cart", JSON.stringify(newCart));
    console.log("item added to cart", newCart);
  }

  return (
    <div>
      <Navbar />

      {!result ? (
        <h3>Loading...</h3>
      ) : (
        <div className="bigCard" key={result._id}>
          <h2>{result.name}</h2>
          <h2>{result.description}</h2>
          <p>Price: {result.price}sek</p>
          <p>In stock: {result.stock}</p>
          <p>
            <img
              src={"http://192.168.99.102:8080/" + result.img.path}
              alt="product"
            ></img>
          </p>
          <div className="gallery">
            {result.gallery.map(item => (
              <p>
                <img
                  className="galleryItem"
                  src={"http://192.168.99.102:8080/" + item.path}
                  alt="gallery"
                ></img>
              </p>
            ))}
          </div>

          <div className="reviews"> {/* <Reviews /> */} </div>

          <button className="buyBTS" onClick={addToCart}>
            {" "}
            <FaCartArrowDown />{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default Details;
