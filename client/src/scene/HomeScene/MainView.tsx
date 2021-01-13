import React, {useEffect, useState} from "react";
import {getListTeam} from "../../services/api/TeamAPI";
import useTeam from "../../context/team";
import {Link, navigate} from '@reach/router';
import {createOrder} from "../../services/api/OrderAPI";


export default function MainView() {
    const {state: {teams}, dispatch} = useTeam();
    const [showModal, setShowModal] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({email: '', fullName: '', phone: ''})
    const [amount, setAmount] = useState('');
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
        const {email, fullName, phone} = form;
        try {
            const res = await createOrder({email, fullName, phone, amount, teamId})
            if (res.data) {
                dispatch({type: "CREATE_ORDER", payload: {orders: res.data}})
                navigate('/order')
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name team
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Members
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Limit
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Captain
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {teams.map((k, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link to={`/detail/${k.id}`}>
                                                    {k.nameTeam}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{k.product}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">0</td>

                                            <td className="px-6 py-4 whitespace-nowrap">{k.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{k.limit}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{k.captain}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button type="button"
                                                        style={{transition: "all .15s ease"}}
                                                        onClick={() => {
                                                            setShowModal(!showModal);
                                                            setAmount(k.amount);
                                                            setTeamId(k.id)
                                                        }}
                                                        className=" flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                                                    Join
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {showModal ? <div className="modal  fixed w-full h-full top-0 left-0 flex items-center justify-center">
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"/>
                <div
                    className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="modal-content py-4 text-left px-6">
                        <div className="flex justify-between items-center pb-3">
                            <p className="text-2xl font-bold">Simple Modal!</p>
                            <div className="modal-close cursor-pointer z-50">
                                <button type='button' onClick={() => setShowModal(!showModal)}>
                                    <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg"
                                         width="18" height="18" viewBox="0 0 18 18">
                                        <path
                                            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {/*body modal*/}
                        <div className='ant-modal-body'>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <input id="email" name="email" type="text" required onChange={handleChange}
                                           className="form-input mt-1 block w-full border-2 h-12 p-5"
                                           placeholder="Email"/>
                                </div>

                                <div>
                                    <input id="fullName" name="fullName" type="text" required onChange={handleChange}
                                           className="form-input mt-1 block w-full border-2 h-12 p-5"
                                           placeholder="Full Name"/>
                                </div>

                                <div>
                                    <input id="phone" name="phone" type="text" required onChange={handleChange}
                                           className="form-input mt-1 block w-full border-2 h-12 p-5"
                                           placeholder="Phone"/>
                                </div>

                                <div>
                                    <button type='submit'
                                            disabled={loading}>join
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-end pt-2">
                            <button
                                className="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2">
                                Action
                            </button>
                            <button
                                onClick={() => setShowModal(!showModal)}
                                className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}
