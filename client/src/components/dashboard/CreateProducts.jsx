import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import modules from '../../utils/quillModule';
import { getCategories } from '../../actions/categories';
import { setAlert } from '../../actions/alert';
import {
  createProduct,
  getProducts,
  updateProduct,
  destroyProduct,
} from '../../actions/products';

const CreateProducts = ({
  getCategories,
  createProduct,
  getProducts,
  updateProduct,
  destroyProduct,
  products: { products },
  categories: { categories },
}) => {
  const initialState = {
    title: '',
    metaDescription: '',
    description: '',
    priceHT: '',
    image: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [product, setProduct] = useState({});
  const [editMode, setEditMode] = useState(false);

  const selectRef = useRef();

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleChangeQuill(value) {
    setFormData({ ...formData, description: value });
  }

  // Finir cette fonction
  function editProduct(id, e) {
    setProduct(() => products.find(article => article.id === id));
    setFormData(products.find(article => article.id === id));

    setEditMode(true);
  }

  function loadImage(e) {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = e => {
      setFormData({ ...formData, image: e.target.result });
    };
  }

  function deleteProduct(id) {
    if (window.confirm('Etes vous sur ?? 💩')) {
      destroyProduct({ id });
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    if (editMode) {
      formData.id = product.id;
      updateProduct(formData);
    } else {
      createProduct(formData);
    }

    setEditMode(false);
    selectRef.current.value = 'Open this select menu';
    setProduct({});
    setFormData(initialState);
  }

  const { title, metaDescription, description, priceHT } = formData;

  return (
    <section className="mt-5 mb-5">
      <div className="row">
        <h1 className="text-primary">
          <i className="fas fa-user" /> Créez un produit
        </h1>

        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="col-md-4 mb-2">
            <label htmlFor="metaDescription" className="form-label">
              Catégories du produit
            </label>
            <select
              ref={selectRef}
              className="form-select"
              aria-label="Default select example"
              name="category_id"
              onChange={onChange}
            >
              <option defaultValue>Open this select menu</option>
              {categories &&
                categories.map(category => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className=" col-md-4 mb-2">
            <label htmlFor="image" className="form-label">
              Image principal du produit
            </label>
            <input
              type="file"
              name="image"
              className="form-control"
              id="image"
              onChange={loadImage}
            />
          </div>
          <div className="col-md-4">
            <div className="input-group input-group-sm mb-2">
              <input
                type="text"
                placeholder="Product Name"
                name="title"
                value={title}
                onChange={e => onChange(e)}
                className="form-control"
              />
            </div>
            <div className="input-group input-group-sm mb-2">
              <input
                type="text"
                placeholder="metaDescription"
                name="metaDescription"
                value={metaDescription}
                onChange={e => onChange(e)}
                className="form-control"
              />
            </div>
            <div className="input-group input-group-sm mb-2">
              <input
                type="text"
                placeholder="priceHT"
                name="priceHT"
                value={priceHT}
                onChange={e => onChange(e)}
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-5">
            <label htmlFor="body" className="form-label">
              Contenu
            </label>
            <ReactQuill
              name="body"
              value={description || ''}
              id="body"
              modules={modules}
              onChange={handleChangeQuill}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Create Product"
          />
        </form>
      </div>
    </section>
  );
};

CreateProducts.propTypes = {
  setAlert: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  getCategories: PropTypes.func.isRequired,
  createProduct: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  destroyProduct: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  categories: state.categories,
  products: state.products,
});

export default connect(mapStateToProps, {
  setAlert,
  getCategories,
  createProduct,
  updateProduct,
  getProducts,
  destroyProduct,
})(CreateProducts);
