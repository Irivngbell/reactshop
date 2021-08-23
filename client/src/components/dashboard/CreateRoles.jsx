import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { createRole, getRoles, updateRole, destroyRole } from '../../actions/roles';
import UsersList from './UsersList';

const CreateRoles = ({
  setAlert,
  createRole,
  getRoles,
  updateRole,
  destroyRole,
  roles: { roles },
}) => {
  const [formData, setFormData] = useState({ name: '', id: '' }); // State pour le formulaire
  const [editMode, setEditMode] = useState(false);

  function onChangeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Récupérer les catégories au chargement du composant
  useEffect(() => {
    getRoles();
  }, []);

  /**
   * @desc fonction qui va permettre de créé ou de mettre à jour les rôles
   * @param e event
   */
  function onSubmitHandler(e) {
    e.preventDefault();

    if (!formData.name || formData.name === '') {
      setEditMode(false);
      setFormData({ name: '' });
      return setAlert('Le nom du rôle est obligatoire', 'error');
    }

    if (!editMode) {
      createRole(formData);
    } else {
      updateRole(formData);
    }

    setFormData({ name: '', id: '' });
  }

  function edit(id) {
    const role = roles.find(role => role.id === id);

    setFormData({ name: role.name, id: role.id });

    setEditMode(true);
  }

  function destroy(id) {
    if (window.confirm('Etes vous sur ?')) {
      destroyRole({ id });
    }

    return false;
  }

  const { name } = formData;

  return (
    <Fragment>
      <section className="row">
        <div className="col-md-6">
          <h2>Ajouter un rôle</h2>
          <form className="row g-3 mb-5" onSubmit={onSubmitHandler}>
            <div className="col-md-8">
              <label htmlFor="name" className="form-label">
                Rôle Name
              </label>
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-3">
          <h2 className="text-center">Rôle</h2>
          <hr />
          {/* MAP ici pour afficher toutes les catégories */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rôle</th>
                <th>Mettre à jour</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {roles &&
                roles.map(role => (
                  <tr key={role.id}>
                    <td>{role.name}</td>
                    <td>
                      <button
                        onClick={() => edit(role.id)}
                        type="button"
                        className="btn btn-primary btn-sm mx-3"
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => destroy(role.id)}
                        type="button"
                        className="btn btn-danger btn-sm mx-3"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
      <hr />
      <UsersList />
    </Fragment>
  );
};

CreateRoles.propTypes = {
  setAlert: PropTypes.func.isRequired,
  createRole: PropTypes.func.isRequired,
  getRoles: PropTypes.func.isRequired,
  updateRole: PropTypes.func.isRequired,
  destroyRole: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // isAuthenticated: state.auth.isAuthenticated,
  roles: state.roles,
});

export default connect(mapStateToProps, {
  setAlert,
  createRole,
  getRoles,
  updateRole,
  destroyRole,
})(withRouter(CreateRoles));
