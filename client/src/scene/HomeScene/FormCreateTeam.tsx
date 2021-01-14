import React, {useState} from "react";
import useAuth from "../../context/auth";
import {IErrors} from "../../types";
import {createTeam} from "../../services/api/TeamAPI";
import {navigate} from "@reach/router";
import style from './style.module.scss'

export default function FormCreateTeam() {
    const {state: {user}, dispatch} = useAuth();
    const [form, setForm] = useState({
        nameTeam: '',
        captain: user ? user.id : '',
        phone: user ? user.phone : '',
        product: '',
        amount: '',
        limit: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState<IErrors | null>(null);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setLoading(true)
        const {nameTeam, captain, phone, product, amount, limit} = form;
        try {
            const res = await createTeam({nameTeam, product, amount, limit, captain, phone});
            const id = res.data.team.id
            navigate(`/detail/${id}`)
            console.log(res)
        } catch (error) {
            setLoading(false)
            if (error.status === 422) {
                setErrors(error.data.errors)
            }
        }
    }


    return (
        <div className={style.formCreate}>
            {/*{errors && <ListErrors errors={errors}/>}*/}
            <form className='flex' onSubmit={handleSubmit}>
                <div>
                    <input id="name-team" name="nameTeam" type="text" required value={form.nameTeam}
                           onChange={handleChange}
                           className={style.input} placeholder="Name Team"/>
                </div>
                <div>
                    <input id="captain" name="captain" type="text" required value={user ? user.email : form.captain}
                           onChange={handleChange}
                           className={style.input}
                           placeholder="Email"/>
                </div>
                <div>
                    <input id="phone" name="phone" type="text" required value={user ? user.phone : form.phone}
                           onChange={handleChange}
                           className={style.input}
                           placeholder="Phone"/>
                </div>
                <div>
                    <input id="product" name="product" type="text" required value={form.product}
                           onChange={handleChange}
                           className={style.input}
                           placeholder="product"/>
                </div>
                <div>
                    <input id="amount" name="amount" type="text" required value={form.amount}
                           onChange={handleChange}
                           className={style.input}
                           placeholder="amount"/>
                </div>
                <div>
                    <input id="limit" name="limit" type="text" required value={form.limit}
                           onChange={handleChange}
                           className={style.input}
                           placeholder="limit"/>
                </div>
                <div>
                    <button
                        type='submit'
                        disabled={loading}
                        className={style.button}
                    >Create
                    </button>
                </div>
            </form>
        </div>
    )
}
