import { useCallback, useState } from "react";
import { Field, useFormik, FormikProvider } from 'formik';
import Cleave from 'cleave.js/react';
import { Gender } from "./Types";
import { Subscription } from "./Types";
import "./FormWizard.css"


const Step1 = ({ values, errors, handleChange, touched, handleBlur }) => (
    <>
        <div className="text-field">
            <label for="login" className="text-field__label">Login</label>
            <Field className="text-field__input" label="Login" type="text"
                name="login" id="login" onChange={handleChange} value={values.login} onBlur={handleBlur}>
            </Field>
            {errors.login && touched.login && <div className="text-field__message">{errors.login}</div>}
        </div>
        <div className="text-field">
            <label className="text-field__label" for="password">Password</label>
            <Field className="text-field__input" label="Password" type="password"
                onChange={handleChange} value={values.password} name="password" id="password" onBlur={handleBlur}></Field>
            {errors.password && touched.password && <div className="text-field__message">{errors.password}</div>}
        </div>
        <div className="text-field">
            <label className="text-field__label" for="secondPassword">Repeat password</label>
            <Field className="text-field__input" id="secondPassword" label="Second password" type="password" onChange={handleChange} 
            value={values.secondPassword} name="secondPassword" onBlur={handleBlur}></Field>
            {errors.secondPassword && touched.secondPassword && <div className="text-field__message">{errors.secondPassword}</div>}
        </div>
    </>
);

const Step2 = ({ values, errors, handleChange, touched, handleBlur}) => (
    <div className="text-field">
        <label for="paymentType" className="text-field__label">Payment type</label>
        <Field id="paymentType" className="text-field__input" as="select" name="paymentType" value={values.paymentType} onChange={handleChange} onBlur={handleBlur}>
            <option value={''}>Select payment type</option>
            <option value={Subscription.FREE}>Free</option>
            <option value={Subscription.ANNUAL}>Annual</option>
            <option value={Subscription.MONTHLY}>Monthly</option>
        </Field>
        {errors.paymentType && touched.paymentType && <div className="text-field__message">{errors.paymentType}</div>}
    </div>
);

const Step3 = ({ values, errors, handleChange, touched, handleBlur }) => (
    <>
        <div className="text-field">
            <label className="text-field__label" for="name">Name</label>
            <Field className="text-field__input" id="name" label="Name" type="text" name="name" onChange={handleChange} value={values.name} onBlur={handleBlur}>
            </Field>
            {errors.name && touched.name && <div className="text-field__message">{errors.name}</div>}
        </div>
        <div className="text-field">
            <label className="text-field__label" for="surname">Surname</label>
            <Field className="text-field__input" id="surname" label="Surname" type="text" name="surname" onChange={handleChange} value={values.surname} onBlur={handleBlur}>
            </Field>
            {errors.surname && touched.surname && <div className="text-field__message" >{errors.surname}</div>}
        </div>
        <div className="text-field">
            <label className="text-field__label" for="patronymic">Patronymic</label>
            <Field className="text-field__input" id="patronymic" label="Patronymic" type="text" name="patronymic" onChange={handleChange} value={values.patronymic} onBlur={handleBlur}>
            </Field>
        </div>
        <div className="text-field">
            <label className="text-field__label" for="dateBirthday">Date of birthday</label>
            <Field className="text-field__input" id="dateBirthday" label="Date of birthday" type="date" name="dateBirthday" onChange={handleChange} value={values.dateBirthday}>
            </Field>
        </div>
        <div className="text-field">
            <label className="text-field__label" for="email">Email</label>
            <Field className="text-field__input" id="email" label="Email" type="email" name="email" onChange={handleChange} value={values.email} onBlur={handleBlur}>
            </Field>
            {errors.email && touched.email && <div className="text-field__message">{errors.email}</div>}
        </div>
        <div className="text-field">
            <label className="text-field__label" for="gender">Select gender</label>
            <Field className="text-field__input" id="gender" as="select" name="gender" value={values.gender} onChange={handleChange} onBlur={handleBlur}>
                <option value={''}>Select gender</option>
                <option value={Gender.MALE}>Male</option>
                <option value={Gender.ANNUAL}>Female</option>
            </Field>
            {errors.gender && touched.gender && <div className="text-field__message">{errors.gender}</div>}
        </div>
        <div className="text-field">
            <label className="text-field__label_checkbox" for="ageMore18">More than 18</label>
            <input className="text-field__checkbox" id="ageMore18" type="checkbox" name="ageMore18" onChange={handleChange} value={values.ageMore18} onBlur={handleBlur}></input>
            {errors.ageMore18 && touched.ageMore18 && <div className="text-field__message">{errors.ageMore18}</div>}
        </div>
    </>
);

const Step4 = ({ onChange, error }) => (
    <div className="text-field">
        <label className="text-field__label" for="creditCard">Credit card</label>
        <Cleave className="text-field__input" id="creditCard" placeholder="Enter your credit card number"
            options={{ creditCard: true }}
            onChange={onChange} />
        {error && <div className="text-field__message">{error}</div>}
    </div>
);

const Step5 = ({ values, errors, handleChange, touched , handleBlur}) => (
    <>
        <div className="text-field">
            <label className="text-field__label" for="login2">Login</label>
            <input className="text-field__input" id="login2" value={values.login} disabled readOnly></input>
        </div>
        <div className="text-field">
            <label className="text-field__label" for="email2">Email</label>
            <input className="text-field__input" id="email2" value={values.email} disabled readOnly></input>
        </div>
        <div className="text-field">
            <label className="text-field__label_checkbox" for="personalData">Accept to the processing of personal data </label>
            <input className="text-field__checkbox" id="personalData" type="checkbox" name="personalData" onChange={handleChange} value={values.personalData} onBlur={handleBlur}></input>
            {errors.personalData && touched.personalData && <div className="text-field__message">{errors.personalData}</div>}<br />
        </div>
        <div className="text-field">
            <label className="text-field__label_checkbox" for="cookie">Accept to the using cookie</label>
            <input className="text-field__checkbox" id="cookie" type="checkbox" name="cookie" onChange={handleChange} value={values.cookie} onBlur={handleBlur}></input>
            {errors.cookie && touched.cookie && <div className="text-field__message">{errors.cookie}</div>}
        </div>
    </>
);

export function FormWizard() {
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [formValues, setFormValues] = useState({
        login: '', password: '', secondPassword: '', paymentType: '', name: '', surname: '', dateBirthday: '',
        email: '', gender: '', ageMore18: false, creditCard: '', personalData: '', cookie: ''
    })

    const onChangeCard = useCallback((event) => {
        let newFormValues = { ...formValues, creditCard: event.target.value };
        setFormValues(newFormValues);
    }, [formValues]);

    const validateCard = () => {
        if (!formValues.creditCard) {
            setError('Required');
            return 'Required';
        }
        if (formValues.creditCard.length !== 19) {
            setError('Not valid credit card');
            return 'Not valid credit card';
        }
        setError('');
        return ''
    }

    const validateRequired = (values, field, errors) => {
        if (!values[field]) {
            errors[field] = 'Required';
        }
    }

    const validatePassword = (values, errors) => {
        if (!values.password) {
            errors.password = 'Required';
            return;
        }
        if (!/^(?=.*?[a-z])(?=.*?[0-9]).{5,}$/.test(values.password)) {
            errors.password = 'The password must contain at least one digit and letter and must be more than five characters long';
        }
    }

    const validateSecondPassword = (values, errors) => {
        if (!values.secondPassword) {
            errors.secondPassword = 'Required'
            return;
        }
        if (!(values.secondPassword === values.password)) {
            errors.secondPassword = 'Second password and password must be equal';
        }
    }

    const validateLogin = (values, errors) => {
        if (!values.login) {
            errors.login = 'Required';
            return;
        }
        if (!/^[a-z]+$/.test(values.login)) {
            errors.login = 'The letters must be lowercase and Latin alphabet'
        }
    }

    const validateEmail = (values, errors) => {
        if (!values.email) {
            errors.email = 'Required';
            return;
        }
        if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(values.email)) {
            errors.email = 'Not valid email address';
        }
    }

    const validate = {
        1: values => {
            const errors = {};
            validateLogin(values, errors)
            validatePassword(values, errors);
            validateSecondPassword(values, errors);
            return errors;
        },
        2: values => {
            const errors = {};
            validateRequired(values, 'paymentType', errors)
            return errors;
        },
        3: values => {
            const errors = {};
            validateRequired(values, 'name', errors);
            validateRequired(values, 'surname', errors);
            validateEmail(values, errors);
            validateRequired(values, 'gender', errors);
            validateRequired(values, 'ageMore18', errors);
            return errors;
        },
        5: values => {
            const errors = {};
            validateRequired(values, 'personalData', errors);
            validateRequired(values, 'cookie', errors);
            return errors;
        }

    }

    const formik = useFormik({
        initialValues: formValues,
        validate: validate[step],
        onSubmit: handleSubmit
    });


    function next(formValues) {
        setStep(step => step + 1);
        if (step !== 4) {
            setFormValues(formValues);
        }
    };

    function onSubmit(values) {
        alert(JSON.stringify(values, null, 2));
    };

    function handleSubmit(values, actions) {
        if (step === 5) {
            return onSubmit({ ...values, creditCard: formValues.creditCard });
        }
        if (step === 4) {
            let errorMsg = validateCard();
            if (errorMsg) {
                return;
            }
        }
        next(values);
        actions.setSubmitting(false);
        actions.setTouched({})
    };


    return (
        <div className="form-card">
            <h3>Form</h3>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} >
                    {step === 1 && <Step1 values={formik.values} errors={formik.errors} handleChange={formik.handleChange} touched={formik.touched} handleBlur={formik.handleBlur}/>}
                    {step === 2 && <Step2 values={formik.values} errors={formik.errors} handleChange={formik.handleChange} touched={formik.touched} handleBlur={formik.handleBlur}/>}
                    {step === 3 && <Step3 values={formik.values} errors={formik.errors} handleChange={formik.handleChange} touched={formik.touched} handleBlur={formik.handleBlur}/>}
                    {step === 4 && <Step4 onChange={ev => onChangeCard(ev)} error={error} />}
                    {step === 5 && <Step5 values={formik.values} errors={formik.errors} handleChange={formik.handleChange} touched={formik.touched} handleBlur={formik.handleBlur}/>}

                    {step < 5 && <button type="submit" disabled={!(formik.isValid)}>Next</button>}
                    {step === 5 && <button type="submit" disabled={!(formik.isValid)}>Submit</button>}
                </form>
            </FormikProvider>
        </div>
    );
}