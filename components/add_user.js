import React, {useState} from 'react';
import Lang from "../src/lang";
import RadioBtn from "./radio_button";

export default function ({lang}) {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthday, setBirthday] = useState('');
    const [birth_place, setBirthPlace] = useState('');
    const [phone, setPhone] = useState('');
    const [sex, setSex] = useState('');
    const [email, setEmail] = useState('');

    return (
        <div className={"app__content pa-4-5"}>
            <div className="app__card">
                <div className="card__header">
                    <div className="title">{'Formulaire de création de compte'}</div>
                </div>
                <div className="card__body">
                    <div className="app__form">
                        <div className="app__form-description">{"Pour la création d'un nouveau compte, vous devez remplir ce" +
                        " formulaire. Les champs marqués d'une étoile ("}<span className="text-danger">*</span>{") sont" +
                        " obligatoire."}</div>
                        <div className="app_form-line">
                            <div className="app__form-group">
                                <label>{Lang.add_account.name[lang]}</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="app__form-group">
                                <label>{Lang.add_account.surname[lang]}</label>
                                <input
                                    className="form-input error"
                                    type="text"
                                    name="surname"
                                    id="surname"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}/>
                            </div>
                        </div>
                        <div className="app_form-line">
                            <div className="app__form-group">
                                <label>{Lang.add_account.birthday[lang]}</label>
                                <input
                                    className="form-input"
                                    type="date"
                                    name="birthday"
                                    id="birthday"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}/>
                            </div>
                            <div className="app__form-group">
                                <label>{Lang.add_account.birth_place[lang]}</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    name="birth_place"
                                    id="birth_place"
                                    value={birth_place}
                                    onChange={(e) => setBirthPlace(e.target.value)}/>
                            </div>
                        </div>
                        <div className="app_form-line">
                            <div className="app__form-group">
                                <label>{Lang.add_account.phone[lang]}</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}/>
                            </div>
                            <div className="app__form-group radio_b">
                                <span>{Lang.add_account.sex[lang]}</span>
                                <RadioBtn
                                    label={'Femme'}
                                    value={'F'}
                                    name={'sex'}
                                    onChecked={() => setSex('F')}/>
                                <RadioBtn
                                    label={'Masculin'}
                                    value={'M'}
                                    name={'sex'}
                                    onChecked={() => setSex('M')}/>
                            </div>
                        </div>
                        <div className="app_form-line">
                            <div className="app__form-group w-100">
                                <label>{Lang.add_account.email[lang]}</label>
                                <input
                                    className="form-input"
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <button
                        style={{marginLeft: '11px'}}
                        className="btn btn-accent">
                        {Lang.add_account.validate[lang]}
                    </button>
                </div>
            </div>
        </div>
    );
}

