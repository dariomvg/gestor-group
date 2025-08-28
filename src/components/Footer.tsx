import "../styles/footer.css";
import iconGithub from "../assets/icons/github.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <p className="title-footer">© GestorGroup 2025</p>
      <a
        href="https://github.com/dariomvg/gestor-group"
        className="link-footer"
        target="_blank"
        rel="norreferer">
        <img
          src={iconGithub.src}
          alt="github link"
          width={25}
          height={25}
          className="icon-github"
          loading="lazy"
        />
      </a>
    </footer>
  );
};
