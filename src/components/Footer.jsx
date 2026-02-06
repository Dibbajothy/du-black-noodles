import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-social-row">
                <a href="mailto:blacknoodles29@gmail.com" className="footer-social-link" aria-label="Email">
                    <i className="fa-solid fa-envelope"></i>
                </a>
                <a href="https://github.com/Abs-Futy7/DU_Black_Noodles" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="GitHub">
                    <i className="fa-brands fa-github"></i>
                </a>
                <a href="https://ctftime.org/team/279896" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="CTFtime">
                    <i className="fa-solid fa-flag"></i>
                </a>
                <a href="#" className="footer-social-link" aria-label="LinkedIn">
                    <i className="fa-brands fa-linkedin"></i>
                </a>
                <a href="#" className="footer-social-link" aria-label="Twitter">
                    <i className="fa-brands fa-twitter"></i>
                </a>
            </div>

            <div className="footer-copyright">
                DU_Black_Noodles • © {new Date().getFullYear()} • University of Dhaka
            </div>
        </footer>
    )
}
