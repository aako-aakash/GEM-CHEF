export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-divider"></div>

            <p className="footer-main">
                © {new Date().getFullYear()} <strong>Gem Chef</strong> · AI-powered recipe generator
            </p>

            <p className="footer-subtext">
                Built with React & Google Gemini
            </p>

            <p className="footer-credit">
                Made by <span>AAKASH KUMAR SAW (AAKO)</span> ·
                <a
                    href="https://github.com/aako-aakash/GEM-CHEF"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
                ·
                <a
                    href="https://www.linkedin.com/in/akash-kumar-saw-bb1630258/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    LinkedIn
                </a>
            </p>
        </footer>
    )
}
