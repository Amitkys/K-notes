import { useEffect, useState } from "react"

export function Navbar() {
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3000/user')
        .then((response) =>{
            setUserData(response.data);
        });
    }, [])
    return(
        <>
            <div className="navbar text-white bg-black">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">{userData.msg}</a>
                </div>
                <div className="flex-none gap-2">
                    <div>
                        <h3>{userData.age}</h3>
                    </div>
                    <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-black rounded-box  mt-3  p-2 shadow">                        
                        <li><a className="btn btn-xs border-none">Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                    </div>
                </div>
            </div>
        
        </>
    )
}