import React from 'react';
import './Footer.css'
import { LinkedIn, GitHub,  } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
    return (
        <div className="footer">
            <ul>
                <li>
                    <a href="https://www.linkedin.com/in/milanexpo/">
                        <LinkedIn fontSize="small" /> Milan Videnović
                    </a>
                </li>
                <li>
                    <a href="https://github.com/vvvmilan">
                        <GitHub fontSize="small" /> vvvmilan
                    </a>
                </li>
                <li>
                    <a href="mailto:milan@expostudio.rs">
                        <EmailIcon fontSize="small" /> milan@expostudio.rs
                    </a>
                </li>
            </ul>
            <p>&copy; Milan Videnović - 2022. All rights reserved.</p>
        </div>
    );
}

export default Footer;