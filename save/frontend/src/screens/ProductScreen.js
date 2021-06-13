import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";//link: faire la laison entre les pages 
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct, saveProductReview } from "../actions/productActions";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants";//kol product najem na3malou modification walla supression

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);//initialiser rating a zero

  const [comment, setComment] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Retour</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="details row p-0 m-0">
            <div className="details-image col-3">
              <img src={product.image} alt="product"></img>
            </div>
     
            <div className="details-action col-5 ">
              <ul>
                <li>
                  <h4>Nom de produit :{product.name}</h4>
                </li>
                <li>Prix: {product.price}</li>
                <li>
                  Description:
                  <div>{product.description}</div>
                </li>
                <li>
                  Status:{" "}
                  {product.countInStock > 0 ? "In Stock" : "Unavailable."}
                </li>
                <li>
                  Quantité:{" "}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  {product.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button primary"
                    >
                      Ajouter au carte
                    </button>
                  )}
                </li>
              </ul>
            </div>
            <div className=" col-4 ">
              <ul className="review" id="reviews">
                {product.reviews.map((review) => (
                  <li key={review._id}>
                    <div>{review.name}</div>
                    <div>
                      <Rating value={review.rating}></Rating>
                    </div>
                    <div>{review.createdAt.substring(0, 10)}</div>
                    <div>{review.comment}</div>
                  </li>
                ))}
                <li>
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <ul className="form-container">
                        <li>
                          <label htmlFor="rating">
                            {" "}
                            <h3>Rédiger un avis client</h3>
                          </label>
                          <select
                            name="rating"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="1">1- Médiocre</option>
                            <option value="2">2- Équitable</option>
                            <option value="3">3- Bien</option>
                            <option value="4">4- Trés bien</option>
                            <option value="5">5- Excellent</option>
                          </select>
                        </li>
                        <li>
                          <label htmlFor="comment">Commentaire</label>
                          <textarea
                            name="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </li>
                        <li>
                          <button type="submit" className="button primary">
                            Envoyez
                          </button>
                        </li>
                      </ul>
                      <h2>Avis</h2>
                      {!product.reviews.length && (
                        <div>Il n'y a pas d'avis</div>
                      )}
                    </form>
                  ) : (
                    <div>
                      Please <Link to="/signin">Sign-in</Link> to write a
                      review.
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default ProductScreen;
