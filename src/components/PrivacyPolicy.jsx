import { useNavigate } from 'react-router-dom';
import './PrivacyPolicy.css';

function PrivacyPolicy({ darkMode }) {
  const navigate = useNavigate();

  return (
    <div className={`privacy-policy ${darkMode ? 'dark' : ''}`}>
      <header className="policy-header">
        <button onClick={() => navigate(-1)} className="back-btn">← वापस</button>
        <h1>Privacy Policy</h1>
      </header>

      <div className="policy-content">
        <p className="last-updated">Last updated: December 30, 2025</p>

        <section>
          <h2>Introduction</h2>
          <p>
            Welcome to श्रीमद्भगवद्गीता (Shrimad Bhagavad Gita) app. We respect your privacy 
            and are committed to protecting your personal data. This privacy policy explains 
            how we handle information when you use our app.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <p>Our app is designed with privacy in mind. We collect minimal data:</p>
          <ul>
            <li><strong>Bookmarks:</strong> Stored locally on your device only</li>
            <li><strong>Preferences:</strong> Dark mode and font size settings stored locally</li>
            <li><strong>No Personal Data:</strong> We do not collect names, emails, or any personal information</li>
          </ul>
        </section>

        <section>
          <h2>Data Storage</h2>
          <p>
            All your data (bookmarks, preferences) is stored locally on your device using 
            browser localStorage. This data never leaves your device and is not transmitted 
            to any server.
          </p>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>
            Our app uses the Vedic Scriptures API (vedicscriptures.github.io) to fetch 
            Bhagavad Gita verses. This is a public, open-source API. We do not share any 
            of your data with this service.
          </p>
        </section>

        <section>
          <h2>Internet Permission</h2>
          <p>
            The app requires internet access solely to fetch Bhagavad Gita verses from 
            the API. No personal data is transmitted.
          </p>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>
            Our app is suitable for all ages and does not collect any personal information 
            from children or adults.
          </p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Any changes will be 
            reflected in the app with an updated date.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:gauravpurohit409@gmail.com">gauravpurohit409@gmail.com</a>
          </p>
        </section>

        <div className="footer-note">
          <p>🙏 जय श्री कृष्ण 🙏</p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
