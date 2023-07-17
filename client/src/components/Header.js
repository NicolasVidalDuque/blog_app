import { useContext, useEffect, useState } from "react";
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
							<Link to="/create">Create new post</Link>
							<a onClick={logout}>Logout</a>
						</>
					) : (
						<>
							<Link to="/login">Login</Link>
							<Link to="/register">Register</Link>
						</>
					)
				}
			</nav>
		</header>
	);
}
