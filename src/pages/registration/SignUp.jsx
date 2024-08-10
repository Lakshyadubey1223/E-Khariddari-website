import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/myContext';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';


function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user")

    const context = useContext(myContext);
    const {loading, setLoading} = context;

    const navigate = useNavigate(); 

    const signup = async () => {
        setLoading(true)
        if (name === "" || email === "" || password === "") {
            return toast.error("All fields are required")
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);

            // console.log(users)

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                role:role,
                time : Timestamp.now()
            }
            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user);
            toast.success("Signup Succesfully")
            setName("");
            setEmail("");
            setPassword("");
            setRole("user");
            setLoading(false)
            navigate('/login')
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                  
                <div>
                    <input type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                        name='name'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>
                
                <div>
                    <input type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                    onClick={signup}
                        className=' bg-lime-500 hover:bg-lime-700 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-lime-500  font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup