import React, {useEffect, useState} from "react";
import {getListTeam} from "../../services/api/TeamAPI";
import {Link, navigate} from '@reach/router';
import {createOrder, createOrderAuth} from "../../services/api/OrderAPI";
import style from './style.module.scss';
import useAuth from "../../context/auth";
import {setLocalStorage} from "../../utils";
import {TOKEN_KEY} from "../../services/api/APIUtils";
import utils from "../../types/utils";


export default function MainView() {
    const {state: {teams, user}, dispatch} = useAuth();
    const [showModal, setShowModal] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({email: '', fullName: '', phone: ''})
    const [amount, setAmount] = useState(0);
    const [teamId, setTeamId] = useState('')

    useEffect(() => {
        dispatch({type: 'FETCH_TEAM_BEGIN'})
        let ignore = false;

        const fetchTeams = async () => {
            try {
                const res = await getListTeam();
                if (!ignore) {
                    dispatch({type: 'FETCH_TEAM_SUCCESS', payload: {teams: res.data.teams}})
                }
            } catch (error) {
                dispatch({
                    type: 'FETCH_TEAM_ERROR',
                    error
                })
            }
        };
        fetchTeams();
        return () => {
            ignore = true;
        };
    }, [dispatch]);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };


    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);
        let ignore = false;
        const {email, fullName, phone} = form;
        try {
            const res = await createOrder({email, fullName, phone, amount, teamId})
            if (!ignore) {
                const user = res.data.user;
                dispatch({type: "CREATE_ORDER", payload: {orders: res.data.orders}});
                dispatch({type: "LOAD_USER", user})
                setLocalStorage(TOKEN_KEY, user.token)
                navigate('/order')
            }

        } catch (e) {
            console.log(e)
        }
        return () => {
            ignore = true
        };
    }

    const handleSubmitAuth = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);
        let ignore = false;
        const {email, fullName, phone} = form;
        try {
            const res = await createOrderAuth({email, fullName, phone, amount, teamId})
            if (!ignore) {
                dispatch({type: "CREATE_ORDER", payload: {orders: res.data.orders}})
                navigate('/order')
            }

        } catch (e) {
            console.log(e)
        }
        return () => {
            ignore = true
        };
    }

    return (
        <div className={style.MainView}>
            <div className={style.tableView}>
                <table className={style.table}>
                    <thead>
                    <tr>
                        <th scope="col">Captain</th>
                        <th scope="col">Product</th>
                        <th scope="col">Members</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teams.map((k, i) => {
                        return (
                            <tr key={i}>
                                <td>
                                    <Link to={`/detail/${k.id}`}>
                                        {k.email}
                                    </Link>
                                </td>
                                <td>{k.product}</td>
                                <td>{k.members?.length}</td>
                                <td>{utils.formatCurrencyVND(k.amount)}</td>
                                <td>
                                    <button type="button" style={{transition: "all .15s ease"}}
                                            onClick={() => {
                                                setShowModal(!showModal);
                                                setAmount(k.amount);
                                                setTeamId(k.id)
                                            }}>
                                        Join
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            {showModal ? <div className={style.modalView}>
                <form className={style.formModal} onSubmit={user ? handleSubmitAuth : handleSubmit}>
                    <div className={style.modalHeader}>
                        <div className={style.headerTitle}>
                            <h2>Add a New Flow</h2>
                            <p><em>Flows help you better manage your guides by grouping them.</em></p>
                        </div>
                        <div className={style.btnClose}>
                            <button type="button" onClick={() => {
                                setShowModal(false)
                            }}>
                                <svg className="w-7 h-7" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                     stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className={style.modalBody}>
                        <div className={style.inputForm}>
                            <label className={style.label}>
                                <span>Email</span>
                                <input
                                    type="text" name='email' value={form.email} onChange={handleChange}
                                    placeholder="Please enter Email"
                                />
                            </label>
                        </div>
                        <div className={style.inputForm}>
                            <label className={style.label}>
                                <span>Full Name</span>
                                <input
                                    type="text" name='fullName' value={form.fullName} onChange={handleChange}
                                    placeholder="Please enter Full name"
                                />
                            </label>
                        </div>
                        <div className={style.inputForm}>
                            <label className={style.label}>
                                <span>Phone</span>
                                <input
                                    type="text" name='phone' value={form.phone} onChange={handleChange}
                                    placeholder="Please enter Phone"
                                />
                            </label>
                        </div>
                    </div>

                    <div className={style.modalFooter}>
                        <button className={style.btnCancel} type="button" onClick={() => {
                            setShowModal(!showModal)
                        }}>Cancel
                        </button>
                        <button className={style.btnSubmit} type="submit" disabled={loading}>Join Team</button>
                    </div>
                </form>
            </div> : null}
        </div>
    )
}
