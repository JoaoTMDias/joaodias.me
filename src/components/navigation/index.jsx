import React from 'react';
import {Link} from 'gatsby';


/**
 * Import Styling
 **/
import styles from './styles.module.css';


const Navigation= ({ active, onMenuClick }) => {
    const linkProps: {
        onClick: onMenuClick,
    };

    return (
        <nav>
            <ul>
                <li className={styles.item}>
                <Link {...linkProps} to="/">Home</Link>
                </li>
                <li className={styles.item}>
                <Link {...linkProps} to="/about">About</Link>
                </li>
                <li className={styles.item}>
                <Link {...linkProps} to="/work">Work</Link>
                </li>
                <li className={styles.item}>
                <Link {...linkProps} to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;