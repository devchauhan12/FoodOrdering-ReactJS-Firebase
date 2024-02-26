import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { app } from '../redux/firebase';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app)

    const initial = {
        name: '',
        email: '',
        password: '',
    }
    const [input, setInput] = useState(initial)
    const [errors, setErrors] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }
    const navigate = useNavigate()

    function validate() {
        let error = {}

        if (input.email.length < 1) {
            error.email = 'Enter Your Email'
        }
        if (input.password.length < 1) {
            error.password = 'Enter Your Password'
        }
        return error;
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const checkErrors = validate()

        if (Object.keys(checkErrors).length > 0) {
            setErrors(checkErrors)
        } else {
            // checkUser()
            setErrors({})
            setInput(initial)
        }
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        setErrors('');

        if (!validate()) {
            return;
        }

        createUserWithEmailAndPassword(auth, input.email, input.password)
            .then((userCredential) => {
                console.log(userCredential);
                navigate('/login')
            })
            .catch((err) => {
                console.error(err);
                setErrors(err.message);
            });
    };
    return (
        <div class="form-container mx-auto mt-4">
            <p class="title">Welcome back</p>
            <form class="form" onSubmit={(e) => handleSignUp(e)}>
                <input type="email" class="input" name='email' placeholder="Email" value={input.email} onChange={handleChange} />
                {errors.email && <span>{errors.email}</span>}
                <input type="password" class="input" name='password' placeholder="Password" value={input.password} onChange={handleChange} />
                {errors.password && <span>{errors.password}</span>}
                <button class="form-btn">Sign up</button>
            </form>
            <p class="sign-up-label d-flex">
                Already have an account?<Nav.Link as={Link} to="/" class="sign-up-link text-success">Sign up</Nav.Link>
            </p>

        </div>
    )
}

export default SignUp