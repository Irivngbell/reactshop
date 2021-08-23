import React, { Fragment, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import { getProducts, getProduct } from '../../../actions/products';
import { formatPrice, ucfirst } from '../../../utils/helpers';
import {
  addToCart,
  getCartCount,
  getProductsInCart,
} from '../../../actions/cart';

const Product = ({
  getProducts,
  getProduct,
  addToCart,
  getProductsInCart,
  products: { products, product },
  getCartCount,
}) => {
  //
  const { id } = useParams();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProduct(id);
  }, [products]);

  function handleClick(e) {
    e.preventDefault();
    //
    addToCart(product);

    getProductsInCart([id]);

    // getCartCount();
  }

  return (
    <Fragment>
      {product && (
        <Fragment>
          <div className="breadcrumbs">
            <div className="container">
              <Link to="/shop">Home</Link>
              <i className="fa fa-chevron-right breadcrumb-separator" />
              <span>Shop</span>
              <i className="fa fa-chevron-right breadcrumb-separator" />
              <span>{ucfirst(product.title)}</span>
            </div>
          </div>

          <div className="product-section container">
            <div className="product-section-image">
              <img src={product.image} alt="product" />
            </div>
            <div className="product-section-information">
              <h1 className="product-section-title">
                {ucfirst(product.title)}
              </h1>
              <div className="product-section-subtitle">
                15 inch, 1TB SSD, 32GB RAM
              </div>
              <div className="product-section-price">
                {formatPrice(product.priceHT)} €
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description),
                }}
              />

              <p>&nbsp;</p>

              <Link
                to={`/product/${product.id}`}
                className="button"
                onClick={handleClick}
              >
                Ajouter au panier
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Product.propTypes = {
  products: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  getProductsInCart: PropTypes.func.isRequired,
  getCartCount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  products: state.products,
});

export default connect(mapStateToProps, {
  getProducts,
  getProduct,
  addToCart,
  getProductsInCart,
  getCartCount,
})(Product);
