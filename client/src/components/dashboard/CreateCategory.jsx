import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import {
    getCategories,
    createCategory,
    updateCategory,
    destroyCategory,
} from '../../actions/categories';

const CreateCategory = ({
    setAlert,
    getCategories,
    createCategory,
    updateCategory,
    destroyCategory,
    categories: { categories },
}) => {
    const [formData, setFormData] = useState({ name: '', id: '' });
    const [editMode, setEditMode] = useState(false);

    function onChangeHandler(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Récupérer les catégories au chargement du composant
    useEffect(() => {
        getCategories();
    }, []);

    /**
     * @desc fonction qui va permettre de créé ou de mettre à jour les catégories
     * @param e event
     */
    function onSubmitHandler(e) {
        e.preventDefault();

        if (!formData.name || formData.name === '') {
            setEditMode(false);
            setFormData({ name: '', id: '' });
            return setAlert('Le nom de la catégorie est obligatoire', 'error');
        }

        if (editMode) {
            updateCategory(formData);
        } else {
            createCategory(formData);
        }

        setFormData({ name: '', id: '' });
        setEditMode(false);
    }

    function edit(id) {
        const cat = categories.find(category => category.id === id);

        setFormData({ name: cat.name, id: cat.id });

        setEditMode(true);
    }

    function destroy(id) {
        if (window.confirm('Etes vous sur ?')) {
            return destroyCategory(id);
        }

        return false;
    }

    const { name } = formData;

    return (
        <div className="row">
            <div className="col-md-6">
                <h2>Ajouter une catégorie</h2>
                <form className="row g-3 mb-5" onSubmit={onSubmitHandler}>
                    <div className="col-md-8">
                        <label htmlFor="name" className="form-label">
                            Category Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </div>
                </form>
            </div>

            <div className="col-md-3">
                <h2 className="text-center">Catégories</h2>
                <hr />
                {/* MAP ici pour afficher toutes les catégories */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Catégorie</th>
                            <th>Mettre à jour</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.name}</td>
                                <td>
                                    <button
                                        onClick={() => destroy(category.id)}
                                        type="button"
                                        className="btn btn-danger btn-sm mx-3"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => edit(category.id)}
                                        type="button"
                                        className="btn btn-primary btn-sm mx-3"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

CreateCategory.propTypes = {
    setAlert: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
    getCategories: PropTypes.func.isRequired,
    createCategory: PropTypes.func.isRequired,
    updateCategory: PropTypes.func.isRequired,
    destroyCategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    // isAuthenticated: state.auth.isAuthenticated,
    categories: state.categories,
});

export default connect(mapStateToProps, {
    setAlert,
    getCategories,
    createCategory,
    updateCategory,
    destroyCategory,
})(withRouter(CreateCategory));
