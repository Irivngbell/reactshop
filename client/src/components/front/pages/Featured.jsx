import img from '../assets/img/macbook-pro.png';
import chirac from '../assets/img/chirac.jpg';
import merkel from '../assets/img/merkel.jpg';
import merguez2 from '../assets/img/merguez2.jpg';
import merguez3 from '../assets/img/merguez3.jpg';
import cousins from '../assets/img/cousins.jpg';
import vaccin from '../assets/img/vaccin.jpg';
import vaccin2 from '../assets/img/vaacin2.jpg';
import macron from '../assets/img/macron.jpg';
import { Link } from 'react-router-dom';

const Featured = () => {
  return (
    <div className="featured-section">
      <div className="container">
        <h1 className="text-center">MERN Ecommerce</h1>

        <p className="section-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore vitae
          nisi, consequuntur illum dolores cumque pariatur quis provident
          deleniti nesciunt officia est reprehenderit sunt aliquid possimus
          temporibus enim eum hic.
        </p>

        <div className="text-center button-container">
          <a href="!#" className="button">
            Featured
          </a>
          <a href="!#" className="button">
            On Sale
          </a>
        </div>

        <div className="products text-center">
          <div className="product">
            <a href="!#">
              <img src={macron} alt="product" />
            </a>
            <a href="!#">
              <div className="product-name">MacBook Pro</div>
            </a>
            <div className="product-price">$2499.99</div>
          </div>
          <div className="product">
            <a href="!#">
              <img src={merkel} alt="product" />
            </a>
            <a href="!#">
              <div className="product-name">MacBook Pro</div>
            </a>
            <div className="product-price">$2499.99</div>
          </div>
          <div className="product">
            <a href="!#">
              <img src={merguez2} alt="product" />
            </a>
            <a href="!#">
              <div className="product-name">MacBook Pro</div>
            </a>
            <div className="product-price">$2499.99</div>
          </div>
          <div className="product">
            <a href="!#">
              <img src={merguez3} alt="product" />
            </a>
            <a href="!#">
              <div className="product-name">MacBook Pro</div>
            </a>
            <div className="product-price">$2499.99</div>
          </div>
          <div className="product">
            <a href="!#">
              <img src={chirac} alt="product" />
            </a>
            <a href="!#">
              <div className="product-name">MacBook Pro</div>
            </a>
            <div className="product-price">$2499.99</div>
          </div>
          <div className="product">
            <a href="!#">
              <img src={vaccin2} alt="product" />
            </a>
            <a href="!#">
              <div className="product-name">MacBook Pro</div>
            </a>
            <div className="product-price">$2499.99</div>
          </div>
          <div className="product">
            <a href="!#">
              <img src={vaccin} alt="product" />
            </a>
            <a href="!#">
              <div className="product-name">MacBook Pro</div>
            </a>
            <div className="product-price">$2499.99</div>
          </div>
          <div className="product">
            <a href="!#">
              <img src={cousins} alt="product" />
            </a>
            <a href="!#">
              <div className="product-name">MacBook Pro</div>
            </a>
            <div className="product-price">$2499.99</div>
          </div>
        </div>

        <div className="text-center button-container">
          <Link to="/shop" className="button">
            View more products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
