import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getCartCount,
  getProductsInCart,
  updateQty,
  removeFromCart,
} from '../../../actions/cart';
import { formatPrice, ucfirst, convertToEuro } from '../../../utils/helpers';

const Cart = ({
  cart: { cart, products, count },
  getProductsInCart,
  getCartCount,
  updateQty,
  removeFromCart,
}) => {
  const [totalHT, setTotalHT] = useState();
  const [totalTTC, setTotalTTC] = useState();
  const [numberOfItems, setNumberOfItems] = useState();

  useEffect(() => {
    if (cart.length > 0) {
      const ids = cart.map(item => item.id);

      getProductsInCart(ids);
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      let HT = 0;

      products.forEach(item => {
        HT += item.priceHT * item.qty;
      });

      const items = products.reduce((acc, curr) => acc + curr.qty, 0);

      setNumberOfItems(items);
      setTotalHT(convertToEuro(HT));
      const TTC = formatPrice(HT);
      setTotalTTC(TTC);
    } else {
      setNumberOfItems(0);
      setTotalHT(convertToEuro(0));
      const TTC = formatPrice(0);
      setTotalTTC(0);
    }
  }, [products]);

  function handleUpdateQty(title, id, e) {
    updateQty({ id: id, [e.target.name]: e.target.value });
  }

  function handleRemove(title, id, e) {
    e.preventDefault();
    removeFromCart({ id: id });
  }

  return (
    <Fragment>
      <div className="breadcrumbs">
        <div className="container">
          <Link to="/shop">Home</Link>
          <i className="fa fa-chevron-right breadcrumb-separator" />
          <span>Shopping Cart</span>
        </div>
      </div>

      <div className="cart-section container">
        <div>
          <h2>{numberOfItems} items in Shopping Cart</h2>

          <div className="cart-table">
            {products &&
              products.map(product => {
                return (
                  <div key={product.id} className="cart-table-row">
                    <div className="cart-table-row-left">
                      <Link to="/">
                        <img
                          src={product.image}
                          alt="item"
                          className="cart-table-img"
                        />
                      </Link>
                      <div className="cart-item-details">
                        <div className="cart-table-item">
                          <Link to={`/product/${product.id}`}>
                            {ucfirst(product.title)}
                          </Link>
                        </div>
                        <div className="cart-table-description">
                          15 inch, 1TB SSD, 32GB RAM
                        </div>
                      </div>
                    </div>
                    <div className="cart-table-row-right">
                      <div className="cart-table-actions">
                        <Link
                          onClick={e =>
                            handleRemove(product.title, product.id, e)
                          }
                          to="/"
                        >
                          Remove
                        </Link>{' '}
                        <br />
                        <Link to="/">Save for Later</Link>
                      </div>
                      <div>
                        <select
                          className="quantity"
                          name="qty"
                          onChange={e =>
                            handleUpdateQty(product.title, product.id, e)
                          }
                        >
                          <option defaultValue="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div>
                        {formatPrice(product.priceHT * product.qty)} &euro; TTC
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <Link to="/" className="have-code">
            Have a Code?
          </Link>

          <div className="have-code-container">
            <form action="/">
              <input type="text" />
              <button type="submit" className="button button-plain">
                Apply
              </button>
            </form>
          </div>

          <div className="cart-totals">
            <div className="cart-totals-left">
              TODO: calculer prix livraison ?
            </div>

            <div className="cart-totals-right">
              <div>
                Subtotal <br />
                Tax <br />
                <span className="cart-totals-total">Total</span>
              </div>
              <div className="cart-totals-subtotal">
                {totalHT} &euro;
                <br />
                {totalTTC - totalHT} &euro;
                <br />
                <span className="cart-totals-total">{totalTTC} &euro;</span>
              </div>
            </div>
          </div>

          <div className="cart-buttons">
            <Link to="/shop" className="button">
              Continue Shopping
            </Link>
            <Link to="/checkout" className="button-primary">
              Proceed to Checkout
            </Link>
          </div>

          {/*<h2>2 items Saved For Later</h2>*/}

          {/*<div className="saved-for-later cart-table">*/}
          {/*    <div className="cart-table-row">*/}
          {/*        <div className="cart-table-row-left">*/}
          {/*            <a href="#">*/}
          {/*                <img*/}
          {/*                    src={img}*/}
          {/*                    alt="item"*/}
          {/*                    className="cart-table-img"*/}
          {/*                />*/}
          {/*            </a>*/}
          {/*            <div className="cart-item-details">*/}
          {/*                <div className="cart-table-item">*/}
          {/*                    <a href="#">MacBook Pro</a>*/}
          {/*                </div>*/}
          {/*                <div className="cart-table-description">*/}
          {/*                    15 inch, 1TB SSD, 32GB RAM*/}
          {/*                </div>*/}
          {/*            </div>*/}
          {/*        </div>*/}
          {/*        <div className="cart-table-row-right">*/}
          {/*            <div className="cart-table-actions">*/}
          {/*                <a href="#">Remove</a> <br />*/}
          {/*                <a href="#">Save for Later</a>*/}
          {/*            </div>*/}
          {/*            <div>*/}
          {/*                <select className="quantity">*/}
          {/*                    <option selected="">1</option>*/}
          {/*                    <option>2</option>*/}
          {/*                    <option>3</option>*/}
          {/*                    <option>4</option>*/}
          {/*                    <option>5</option>*/}
          {/*                </select>*/}
          {/*            </div>*/}
          {/*            <div>$2499.99</div>*/}
          {/*        </div>*/}
          {/*    </div>*/}

          {/*    <div className="cart-table-row">*/}
          {/*        <div className="cart-table-row-left">*/}
          {/*            <a href="#">*/}
          {/*                <img*/}
          {/*                    src={img}*/}
          {/*                    alt="item"*/}
          {/*                    className="cart-table-img"*/}
          {/*                />*/}
          {/*            </a>*/}
          {/*            <div className="cart-item-details">*/}
          {/*                <div className="cart-table-item">*/}
          {/*                    <a href="#">MacBook Pro</a>*/}
          {/*                </div>*/}
          {/*                <div className="cart-table-description">*/}
          {/*                    15 inch, 1TB SSD, 32GB RAM*/}
          {/*                </div>*/}
          {/*            </div>*/}
          {/*        </div>*/}
          {/*        <div className="cart-table-row-right">*/}
          {/*            <div className="cart-table-actions">*/}
          {/*                <a href="#">Remove</a> <br />*/}
          {/*                <a href="#">Save for Later</a>*/}
          {/*            </div>*/}
          {/*            <div>*/}
          {/*                <select className="quantity">*/}
          {/*                    <option selected="">1</option>*/}
          {/*                    <option>2</option>*/}
          {/*                    <option>3</option>*/}
          {/*                    <option>4</option>*/}
          {/*                    <option>5</option>*/}
          {/*                </select>*/}
          {/*            </div>*/}
          {/*            <div>$2499.99</div>*/}
          {/*        </div>*/}
          {/*    </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </Fragment>
  );
};

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  getProductsInCart: PropTypes.func.isRequired,
  getCartCount: PropTypes.func.isRequired,
  updateQty: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cart: state.cart,
});

export default connect(mapStateToProps, {
  getProductsInCart,
  getCartCount,
  updateQty,
  removeFromCart,
})(Cart);
