import { useState } from "react"
import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { Link, useNavigate } from "react-router-dom"
import { Button, Logo, Input } from '../index'
import { login } from "../../store/authSlice"
import { useForm } from "react-hook-form"

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const signUp = async (data) => {
        setError("");
        try {
            const user = await authService.createAccount(data);

            if (user) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData));
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="flex justify-center items-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p>Don&apos;t have an account? &nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">
                    {error}
                </p>}
                <form onSubmit={handleSubmit(signUp)}>
                    <div className="space-y-5">
                        <Input
                            label="Name: "
                            placeholder="Enter your full name"
                            {...register("Name", {
                                required: true
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Enter a valid email address"
                                }
                            })} />
                        <Input
                            label="Password: "
                            placeholder="Enter password"
                            type="password"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Create Account</Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp