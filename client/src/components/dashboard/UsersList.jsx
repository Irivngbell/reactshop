import React, { useEffect, Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRoles } from '../../actions/roles';
import { assignRoleToUser, getUsers } from '../../actions/users';

const UsersList = ({
  users: { users },
  roles: { roles },
  getUsers,
  getRoles,
  assignRoleToUser,
}) => {
  const initialState = { roleId: '', userId: '' };
  const [formData, setFormData] = useState(initialState);
  const userIdRef = useRef();

  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      userId: e.target.dataset.user,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    assignRoleToUser(formData);

    setFormData(initialState);
  }

  return (
    <section className="row">
      <div className="col-md-6">
        <h2>Employees</h2>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Attribution des roles</th>
              <th>Role actuel</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col">
                          <input
                            ref={userIdRef}
                            type="hidden"
                            name="userId"
                            value={user.id}
                          />
                          <select
                            className="form-select form-select-sm mb-2 d-inline-block"
                            aria-label=".form-select-sm example"
                            name="roleId"
                            data-user={user.id}
                            onChange={handleChange}
                          >
                            <option defaultValue>Open this select menu</option>
                            {roles &&
                              roles.map(role => (
                                <option key={role.id} value={role.id}>
                                  {role.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="col">
                          <input
                            type="submit"
                            className="btn btn-sm btn-info"
                            value="Attribuer un rôle"
                          />
                        </div>
                      </div>
                    </form>
                  </td>
                  <td>{user.Role?.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

UsersList.propTypes = {
  roles: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  assignRoleToUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
  roles: state.roles,
});

export default connect(mapStateToProps, { getUsers, getRoles, assignRoleToUser })(
  UsersList
);
