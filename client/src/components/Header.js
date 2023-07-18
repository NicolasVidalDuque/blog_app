import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContex } from "../context/UserContext";

export default function Header() {
	const {setUserInfo, userInfo} = useContext(UserContex);
	useEffect(() => {
		fetch("http://localhost:4000/profile", {
			credentials: "include",
		}).then(response => {
			response.json().then(scopeUserInfo => {
				setUserInfo(scopeUserInfo);
			})
		});
	}, []);

	function logout(){
		fetch('http://localhost:4000/logout', {
			credentials: 'include',
			method: 'POST'
		})
		setUserInfo(null);
	}

	const username = userInfo?.username

	return (
		<header>
			<Link
				to="/"
				className="logo">
				MyBlog
			</Link>
			<nav>
				{username ? (
						<>
							<Link className='header-text' to="/create">Create new post</Link>
							<a className='header-text' onClick={logout}>Logout</a>
						</>
					) : (
						<>
							<Link className='header-text' to="/login">Login</Link>
							<Link className='header-text' to="/register">Register</Link>
						</>
					)
				}
			</nav>
		</header>
	);
}
