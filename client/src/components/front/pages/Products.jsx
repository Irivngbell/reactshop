import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCategories } from '../../../actions/categories';
import { getProducts } from '../../../actions/products';
import { formatPrice, ucfirst } from '../../../utils/helpers';
// De quoi on a besoin dans ce composant ?
// - produits et catégories

const Products = ({
  getCategories,
  getProducts,
  products: { products },
  categories: { categories },
}) => {
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <Fragment>
      <div className="breadcrumbs">
        <div className="container">
          <a href="!#">Home</a>
          <i className="fa fa-chevron-right breadcrumb-separator" />
          <span>Shop</span>
        </div>
      </div>

      <div className="products-section container">
        <div className="sidebar">
          <h3>By Category</h3>
          <ul>
            {categories &&
              categories.map(category => (
                <li key={category.id}>{ucfirst(category.name)}</li>
              ))}
          </ul>

          <h3>By Price</h3>
          <ul>
            <li>
              <a href="!#">$0 - $700</a>
            </li>
            <li>
              <a href="!#">$700 - $2500</a>
            </li>
            <li>
              <a href="!#">$2500+</a>
            </li>
          </ul>
        </div>

        <div>
          <h1 className="stylish-heading">Laptops</h1>
          <div className="products text-center">
            {products &&
              products.map(product => (
                <div className="product" key={product.id}>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.title} />
                  </Link>
                  <Link to={`/product/${product.id}`}>
                    <div className="product-name">{ucfirst(product.title)}</div>
                  </Link>
                  <div className="product-price">
                    €{formatPrice(product.priceHT)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Products.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  products: state.products,
  categories: state.categories,
});

export default connect(mapStateToProps, { getProducts, getCategories })(
  Products
);
