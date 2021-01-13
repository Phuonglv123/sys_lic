import React, {useState} from "react";
import {RouteComponentProps} from "@reach/router";
import useAuth from "../../context/auth";

export default function MyAccount(_: RouteComponentProps) {
    const {state: {user}} = useAuth();
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({email: '', fullName: '', phone: ''})


    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };
    return (
        <div className='p-10'>
            <form action="">
                <div>
                    <input id="email" name="email" type="text" required value={user?.email}
                           onChange={handleChange}
                           className="form-input mt-1 block w-full border-2 h-12 p-5" placeholder="Name Team"/>
                </div>

                <div>
                    <input id="fullName" name="fullName" type="text" required value={user?.fullName}
                           onChange={handleChange}
                           className="form-input mt-1 block w-full border-2 h-12 p-5" placeholder="Name Team"/>
                </div>

                <div>
                    <input id="phone" name="phone" type="text" required value={user?.phone}
                           onChange={handleChange}
                           className="form-input mt-1 block w-full border-2 h-12 p-5" placeholder="Name Team"/>
                </div>
                <div>
                    <button type='submit'
                            disabled={loading}
                            className='mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-16'>Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
