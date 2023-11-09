import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContex } from "../context/UserContext";
import { useNavigate } from "react-router-dom"
import { HOST } from "../host.js"
export default function Header() {
	const {setUserInfo, userInfo} = useContext(UserContex);
  const navigate = useNavigate();
	useEffect(() => {
		fetch(HOST + "/profile", {
			credentials: 'include',
		}).then(response => {
			response.json().then(scopeUserInfo => {
				setUserInfo(scopeUserInfo);
			})
		});
	}, []);

	async function logout(){
		await fetch(HOST + '/logout', {
			credentials: 'include',
			method: 'POST'
		})
		setUserInfo(null);
    alert("Bye Bye...");
    navigate('/');
	}

	const username = userInfo?.username

	return (
		<header>
			<Link
				to="/"
				className="logo">
				NV - Blog <span style={
            { fontWeight:'normal',
              fontStyle:'italic'}
          }> {username ? ('- ' + username) : ''} </span>
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
