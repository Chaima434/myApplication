import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Rating from "../components/Rating";

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      {category && <h2>{category}</h2>}
      <div className="container  ">
        <div className="filter row m-5">
          <div>
            <form onSubmit={submitHandler}>
              <input
                name="searchKeyword"
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button type="submit">Chercher</button>
            </form>
          </div>
          <div>
            Trier par{" "}
            <select name="sortOrder" onChange={sortHandler}>
              <option value="">Le plus récent</option>
              <option value="lowest">Le plus bas</option>
              <option value="highest">Plus haut</option>
            </select>
          </div>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="container p-1">
          <div className="products row ">
            {products.map((product) => (
              <div className=" col-3" key={product._id}>
                <Link to={"/product/" + product._id}>
                  <img
                    className="card-img-top"
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className="">
                  <div className="product-name pb-3">
                    <Link to={"/product/" + product._id}>{product.name}</Link>
                  </div>
                  <div className="product-brand pb-3">{product.brand}</div>
                  <div className="product-price pb-3">{product.price} dt</div>
                  <div className="product-rating">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + " reviews"}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default HomeScreen;
