import styles from "../styles/heading.module.css";
import typingStyles from "../styles/typing.module.css";

import LoginForm from "./Overlay/LoginForm";
import RegisterForm from "./Overlay/RegisterForm";

import { LoginOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Header({ loggedIn, account, handleLogout }) {
	const router = useRouter();

	const [forms, setForms] = useState({ loginFormOpen: false, registerFormOpen: false });
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const dropdownRef = useRef(null);

	const navItems = ["Summary", "Activity", "Send/Request", "Wallet", "Help"];

	const openForm = (form, event) => {
		event?.stopPropagation();
		setForms((prevForms) => ({ ...prevForms, [form]: true }));
	};

	const closeForm = (form) => {
		setForms((prevForms) => ({ ...prevForms, [form]: false }));
	};

	const openLoginForm = (event) => {
		openForm("loginFormOpen", event);
	};

	const closeLoginForm = () => {
		closeForm("loginFormOpen");
	};

	const openRegisterForm = (event) => {
		openForm("registerFormOpen", event);
	};

	const closeRegisterForm = () => {
		closeForm("registerFormOpen");
	};

	const toggleDropdown = (event, forcedToggle = !dropdownOpen) => {
		event?.stopPropagation();
		setDropdownOpen(forcedToggle);
	};

	useEffect(() => {
		const hashFragment = router.asPath.split("#")[1];
		console.log(hashFragment, loggedIn);

		const handleDropdownClick = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				toggleDropdown(event, false);
			}
		};

		document.addEventListener("click", handleDropdownClick);

		return () => {
			document.removeEventListener("click", handleDropdownClick);
		};
	}, []);

	return (
		<header className={clsx("headerContainer py-3 py-md-2 px-md-3 px-xl-5", styles.header)}>
			{/* <div className={clsx("hoverAnimation position-absolute w-100 bottom-0 start-0", styles.headerUnderline)} /> */}
			<div className="headerWrapper d-flex flex-row h-100 w-100 justify-content-between justify-content-md-start align-items-center px-2">
				{/* temporary substitute for potential logo */}
				<div className={clsx("headerTitle position-relative", styles.headerTitle, typingStyles.fontTypeHeading1)}>PayMe</div>
				<input id="navListInput" type="checkbox" className={clsx("d-none", styles.navListInput)} />
				<label htmlFor="navListInput" className={styles.navListLabel}>
					<span className={clsx("d-md-none position-relative", styles.navListIcon)}>
						<span className={clsx(styles.navHamburger)} />
					</span>
				</label>
				<div className={clsx("blankContainer d-block position-absolute w-100 top-0 end-0", styles.blankContainer)} />
				<ul className={clsx("headerNavItems d-flex flex-column flex-md-row h-100 ps-0 ps-md-2", styles.headerNavItems, typingStyles.fontType5)}>
					{navItems.map((item, index) => (
						<li key={index} className={clsx("headerNavItem d-flex h-100 mx-0 mx-md-3", styles.headerNavItem)}>
							<a className={clsx("navItemLink d-flex p-3 p-md-0", styles.navItemLink)} href={`#${item}`}>
								<span className="d-flex h-100 w-100 align-items-center justify-content-center">{item}</span>
							</a>
						</li>
					))}
				</ul>
				<div className={clsx("d-none d-md-block ms-auto", styles.loginWrapper)}>
					{!loggedIn && (
						<div className={clsx("position-relative", styles.loginContainer)} onClick={openLoginForm}>
							<a className={clsx("d-inline-block", styles.loginButton)}>
								<span className={clsx(typingStyles.fontType7)}>Login</span>
							</a>
						</div>
					)}
					{loggedIn && (
						<button type="button" className={clsx("d-flex position-relative", styles.loginButton, styles.profileWrapper, { [styles.active]: dropdownOpen })} onClick={toggleDropdown} ref={dropdownRef}>
							<span className={clsx(styles.profileNameWrapper, typingStyles.fontType7)}>{account.name}</span>
							<span className={clsx("align-self-center", styles.dropdownArrow)} />
							{dropdownOpen && (
								<ul className={clsx("w-100 px-2", styles.dropdownItems)}>
									<li>
										<div className={clsx("d-flex justify-content-center", styles.dropdownItem)} onClick={handleLogout}>
											<LoginOutlined className={clsx("pe-1 justify-content-center align-self-center", typingStyles.fontType7)} />
											<span className={clsx(typingStyles.fontType7)}>Logout</span>
										</div>
									</li>
								</ul>
							)}
						</button>
					)}
				</div>
				{forms["loginFormOpen"] && <LoginForm onRelease={closeLoginForm} onAltRelease={openRegisterForm} />}
				{forms["registerFormOpen"] && <RegisterForm apply={closeRegisterForm} applyAlt={openLoginForm} />}
			</div>
		</header>
	);
}
