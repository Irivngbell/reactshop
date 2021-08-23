import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import modules from '../../utils/quillModule';
import 'react-quill/dist/quill.snow.css';
import { setAlert } from '../../actions/alert';
import {
  getArticles,
  createArticle,
  updateArticle,
  destroyArticle,
} from '../../actions/articles';
import { getCategories } from '../../actions/categories';

function CreateArticle({
  getArticles,
  createArticle,
  destroyArticle,
  updateArticle,
  getCategories,
  articles: { articles },
  categories: { categories },
}) {
  const initialState = {
    title: '',
    body: '',
    metaDescription: '',
    category_id: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [article, setArticle] = useState({});
  const [editMode, setEditMode] = useState(false);

  const selectRef = useRef(); // Sert à garder en mémoire une référence d'un objet JSX

  // Avoir un boolean pour décider si le formulaire crée un article ou s'il le met à jour.

  useEffect(() => {
    getArticles();
    getCategories();
  }, []);

  useEffect(() => {
    setFormData(() => {
      return {
        title: article.title,
        metaDescription: article.metaDescription,
        category_id: article.category_id,
        body: article.body,
      };
    });
    //
    selectRef.current.value = article.category_id;
  }, [article]);

  function onChangeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleChangeQuill(value) {
    setFormData({ ...formData, body: value });
  }

  // Finir cette fonction :
  // Faire la validation aussi ici
  function onSubmitHandler(e) {
    e.preventDefault();

    if (editMode) {
      formData.id = article.id;
      updateArticle(formData);
    } else {
      createArticle(formData);
    }

    setEditMode(false);
    selectRef.current.value = 'Open this select menu';
    setArticle({});
  }

  // Finir cette fonction
  function editArticle(id, e) {
    setArticle(() => articles.find(article => article.id === id));
    setFormData(articles.find(article => article.id === id));

    setEditMode(true);
  }

  function deleteArticle(id) {
    if (window.confirm('Etes vous sur ?? 💩')) {
      destroyArticle({ id });
    }
  }

  const { title, body, metaDescription } = formData;

  return (
    <div className="row">
      <div className="col-md-6">
        <h2>Ajouter un article</h2>
        <form className="row g-3 mb-5" onSubmit={onSubmitHandler}>
          <div className="col-md-8">
            <label htmlFor="title" className="form-label">
              Titre
            </label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="title"
              value={title || ''}
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-md-8">
            <label htmlFor="metaDescription" className="form-label">
              Meta Description
            </label>
            <input
              type="text"
              name="metaDescription"
              className="form-control"
              id="metaDescription"
              value={metaDescription || ''}
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-md-8">
            <label htmlFor="metaDescription" className="form-label">
              Catégories de l'article
            </label>
            <select
              ref={selectRef}
              className="form-select"
              aria-label="Default select example"
              name="category_id"
              onChange={onChangeHandler}
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
          <div className="col-md-12">
            <label htmlFor="body" className="form-label">
              Contenu
            </label>
            <ReactQuill
              name="body"
              value={body || ''}
              id="body"
              modules={modules}
              onChange={handleChangeQuill}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
      <div className="col-md-5 offset-1">
        <h2>Liste des articles : </h2>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Mettre a jour</th>
              <th>Effacer</th>
              <th>Date de creation</th>
              <th>Date de mise a jour</th>
            </tr>
          </thead>
          <tbody>
            {articles &&
              articles.map(art => {
                return (
                  <tr key={art.id}>
                    <td className="">{art.title}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info"
                        onClick={e => editArticle(art.id, e)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={e => deleteArticle(art.id, e)}
                      >
                        Effacer
                      </button>
                    </td>
                    <td>{new Date(art.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(art.updatedAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

CreateArticle.propTypes = {
  setAlert: PropTypes.func.isRequired,
  articles: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  getArticles: PropTypes.func.isRequired,
  createArticle: PropTypes.func.isRequired,
  updateArticle: PropTypes.func.isRequired,
  destroyArticle: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // isAuthenticated: state.auth.isAuthenticated,
  articles: state.articles,
  categories: state.categories,
});

export default connect(mapStateToProps, {
  setAlert,
  getArticles,
  createArticle,
  updateArticle,
  destroyArticle,
  getCategories,
})(withRouter(CreateArticle));
