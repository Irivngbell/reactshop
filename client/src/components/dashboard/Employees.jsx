import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';

const Employees = ({ register }) => {
  //
  const initialState = {
    email: '',
    password: '',
    password2: '',
  };
  const [formData, setFormData] = useState(initialState);
  const { email, password, password2 } = formData;

  function onChange(e) {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();

    const data = {
      email: formData.email,
      password: formData.password,
      url: '/api/users/employees',
    };

    register(data);
    setFormData(initialState);
  }

  return (
    <Fragment>
      <h2>Employees</h2>

      <section className="mt-5 mb-5">
        <div className="row">
          <div className="col-md-4">
            <h1 className="text-primary">
              <i className="fas fa-user" /> Créez un employé
            </h1>

            <form className="form" onSubmit={e => onSubmit(e)}>
              <div className="input-group input-group-sm mb-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                  className="form-control"
                />
              </div>
              <div className="input-group input-group-sm mb-2">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                  minLength="6"
                  className="form-control"
                />
              </div>
              <div className="input-group input-group-sm mb-2">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={e => onChange(e)}
                  minLength="6"
                  className="form-control"
                />
              </div>
              <input type="submit" className="btn btn-primary" value="Register" />
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Employees.propTypes = {
  register: PropTypes.func.isRequired,
};

export default connect(null, { register })(Employees);
