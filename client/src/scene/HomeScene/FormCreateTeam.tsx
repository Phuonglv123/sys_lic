import React, {useState} from "react";
import useAuth from "../../context/auth";
import {IErrors} from "../../types";
import {createTeam} from "../../services/api/TeamAPI";
import {navigate} from "@reach/router";
import style from './style.module.scss'
import {dataURLToBlob} from "cypress/types/blob-util";

export default function FormCreateTeam() {
    const {state: {user}, dispatch} = useAuth();
    const [form, setForm] = useState({
        email: user ? user.email : '',
        phone: user ? user.phone : '',
        product: '',
        amount: '',
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
        let ignore = false;
        const {email, phone, product, amount} = form;
        try {
            const res = await createTeam({product, amount, email, phone});
            if (!ignore) {
                const user = res.data.user;
                dispatch({type: "LOAD_USER", user})
                const id = res.data.team.id
                navigate(`/detail/${id}`)
                console.log(res)
            }

        } catch (error) {
            setLoading(false)
            if (error.status === 422) {
                setErrors(error.data.errors)
            }
        }

        return () => {
            ignore = true
        };
    }


    return (
        <div className={style.formCreate}>
            {/*{errors && <ListErrors errors={errors}/>}*/}
            <form className={style.formGroup} onSubmit={handleSubmit}>
                <div className={style.inputGroup}>
                    <input id="email" name="email" type="text" required value={user ? user.email : form.email}
                           onChange={handleChange}
                           className={style.input}
                           placeholder="Email"/>
                </div>
                <div className={style.inputGroup}>
                    <input id="phone" name="phone" type="text" required value={user ? user.phone : form.phone}
                           onChange={handleChange}
                           className={style.input}
                           placeholder="Phone"/>
                </div>
                <div className={style.inputGroup}>
                    <input id="product" name="product" type="text" required value={form.product}
                           onChange={handleChange}
                           className={style.input}
                           placeholder="product"/>
                </div>
                <div className={style.inputGroup}>
                    <input id="amount" name="amount" type="text" required value={form.amount}
                           onChange={handleChange}
                           className={style.input}
                           placeholder="amount"/>
                </div>
                <div className={style.inputGroup}>
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
