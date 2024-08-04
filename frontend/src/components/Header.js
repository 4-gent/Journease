import Logo from '../public/Logo.png';
export default function Header() {
    return (
      <header>
        <nav>
          <ul>
            <li>Features</li>
            <li>Testimonials</li>
            <li><img src={Logo} alt="Logo" /></li> {/* Use the imported image module */}
            <li>Pricing</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
    );
  }
  