import styles from "../styles/heading.module.css";
import typingStyles from "../styles/typing.module.css";

export default function Header() {
	const navItems = ["Summary", "Activity", "Send/Request", "Wallet", "Help"];

	return (
		<header className={styles.header}>
			<div className="d-flex h-100 align-items-center ms-0">
				{/* temporary substitute for potential logo */}
				<div className={typingStyles.fontTypeHeading1}>PayMe</div>
				<ul className={`d-flex h-100 ${typingStyles.fontType6}`}>
					{navItems.map((item, index) => (
						<li key={index} className="d-block mx-3">
							<a className={styles.navItemLink} href={`#${item}`}>
								<span>{item}</span>
							</a>
						</li>
					))}
				</ul>
			</div>
		</header>
	);
}
