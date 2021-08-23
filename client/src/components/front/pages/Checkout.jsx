import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Card from './CardSection';
import img from '../assets/img/macbook-pro.png';

const stripePromise = loadStripe('pk_test_B9SEClbQcg35eUmOyH4adj7M');

const Checkout = () => {
  return (
    <section className="container">
      <h1 className="checkout-heading stylish-heading">Checkout</h1>
      <div className="checkout-section">
        <div>
          <form action="#">
            <h2>Billing Details</h2>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value=""
              />
            </div>
            <div className="half-form">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value=""
                />
              </div>
            </div>

            <div className="half-form">
              <div className="form-group">
                <label htmlFor="postalcode">Postal Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="postalcode"
                  name="postalcode"
                  value=""
                />
              </div>
            </div>
            {/*STRIPE*/}
            <Card />
            {/*STRIPE*/}
          </form>
        </div>

        <div className="checkout-table-container">
          <h2>Your Order</h2>

          <div className="checkout-table">
            <div className="checkout-table-row">
              <div className="checkout-table-row-left">
                <img src={img} alt="item" className="checkout-table-img" />
                <div className="checkout-item-details">
                  <div className="checkout-table-item">MacBook Pro</div>
                  <div className="checkout-table-description">
                    15 inch, 1TB SSD, 32GB RAM
                  </div>
                  <div className="checkout-table-price">$2499.99</div>
                </div>
              </div>

              <div className="checkout-table-row-right">
                <div className="checkout-table-quantity">1</div>
              </div>
            </div>

            <div className="checkout-table-row">
              <div className="checkout-table-row-left">
                <img src={img} alt="item" className="checkout-table-img" />
                <div className="checkout-item-details">
                  <div className="checkout-table-item">MacBook Pro</div>
                  <div className="checkout-table-description">
                    15 inch, 1TB SSD, 32GB RAM
                  </div>
                  <div className="checkout-table-price">$2499.99</div>
                </div>
              </div>

              <div className="checkout-table-row-right">
                <div className="checkout-table-quantity">1</div>
              </div>
            </div>

            <div className="checkout-table-row">
              <div className="checkout-table-row-left">
                <img src={img} alt="item" className="checkout-table-img" />
                <div className="checkout-item-details">
                  <div className="checkout-table-item">MacBook Pro</div>
                  <div className="checkout-table-description">
                    15 inch, 1TB SSD, 32GB RAM
                  </div>
                  <div className="checkout-table-price">$2499.99</div>
                </div>
              </div>

              <div className="checkout-table-row-right">
                <div className="checkout-table-quantity">1</div>
              </div>
            </div>
          </div>

          <div className="checkout-totals">
            <div className="checkout-totals-left">
              Subtotal <br />
              Discount (10OFF - 10%) <br />
              Tax <br />
              <span className="checkout-totals-total">Total</span>
            </div>

            <div className="checkout-totals-right">
              $7499.97 <br />
              -$750.00 <br />
              $975.00 <br />
              <span className="checkout-totals-total">$8474.97</span>
            </div>
          </div>
        </div>
      </div>

      {/*<Elements stripe={stripePromise}>*/}

      {/*</Elements>*/}
    </section>
  );
};

export default Checkout;
