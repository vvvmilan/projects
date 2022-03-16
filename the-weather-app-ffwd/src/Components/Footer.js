import React from 'react';
import './Footer.css'

function Footer() {
    return (
        <div className="footer">
            <ul>
                <li><a href="https://www.linkedin.com/in/milanexpo/">LinkedIn</a></li>
                <li><a href="https://github.com/vvvmilan">GitHub</a></li>
                <li><a href="mailto:milan@expostudio.rs">e-mail</a></li>
            </ul>
            <p>&copy; Milan Videnović - 2022. All rights reserved.</p>
        </div>
    );
}

export default Footer;