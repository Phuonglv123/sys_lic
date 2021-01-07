import React from 'react';
import {Link, navigate, RouteComponentProps, Redirect} from '@reach/router';
import {IErrors} from "../../types";
import useAuth from "../../context/auth";
import {register} from "../../services/api/AuthAPI";
import ListErrors from "../../components/common/ListErrors";

export default function RegisterScene(_: RouteComponentProps) {
    const [form, setForm] = React.useState({
        email: '',
        fullName: '',
        phone: '',
        password: '',
    });

    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState<IErrors | null>(null);
    const {
        state: {user},
        dispatch,
    } = useAuth();

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);
        const {email, password, fullName, phone} = form;
        try {
            const user = await register({email, password, fullName, phone});
            console.log(user)
            dispatch({type: 'LOAD_USER', user});
            navigate('/');
        } catch (error) {
            console.log(error);
            setLoading(false);
            if (error.status === 422) {
                setErrors(error.data.errors);
            }
        }
    };

    if (user) {
        return <Redirect to="/" noThrow/>;
    }

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <Link to="/login">Have an account?</Link>
                        </p>
                        {errors && <ListErrors errors={errors}/>}
                        <form onSubmit={handleSubmit}>
                            <fieldset className="form-group">
                                <input
                                    name="email"
                                    className="form-control form-control-lg"
                                    type="email"
                                    value={form.email}
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    name="fullName"
                                    className="form-control form-control-lg"
                                    type="text"
                                    value={form.fullName}
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    name="phone"
                                    className="form-control form-control-lg"
                                    type="number"
                                    value={form.phone}
                                    placeholder="Phone"
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    name="password"
                                    className="form-control form-control-lg"
                                    type="password"
                                    value={form.password}
                                    placeholder="Password"
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <button
                                className="btn btn-lg btn-primary pull-xs-right"
                                disabled={loading}
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
