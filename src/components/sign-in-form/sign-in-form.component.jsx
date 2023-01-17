import { useState } from "react";

import './sign-in-form.styles.scss'

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils.js';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async() => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log('form submitted');
        console.log('formFields:', formFields);

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)
            // .then((userCredential) => {
            //     // Signed in 
            console.log('Success! \n user: ', user);
            resetFormFields();

        } catch (error) {
            console.log('error:', JSON.stringify(error, null, '\t'));
            switch(error.code){
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break
                default:
                    alert('something went wrong');
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    return(
        <div className="sign-in-container">
            <h2>I already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' onChange={handleChange} name='email' value={email} required />
                <FormInput label='Password' type='password' onChange={handleChange} name='password' value={password} required />
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;