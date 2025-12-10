# Mohamed Dharik Ali — Portfolio (Dark Theme)

This is a simple, dark-themed static portfolio showcasing:
- About section (name + current study)
- Skills with animated progress bars (HTML, CSS, JavaScript, React and soft skills)
- Academic performance (Current CGPA, 10th, 12th grades)
- Contact section with a form and placeholder contact info

Files:
- `index.html` — main page
- `styles.css` — styling (dark theme)
- `script.js` — small interactive behaviors and form validation

Local usage
-----------
Open `index.html` in your browser. For a simple local server (recommended):

PowerShell (Windows):

```powershell
# from the project folder
python -m http.server 8000; Start-Process "http://localhost:8000"
```

Or install VS Code Live Server extension and click "Go Live".

Customize
---------
- Replace the placeholder email and phone in `index.html` (search for `mohdharik1731@gmail.com` and `+91-7339509051`).
- To wire the contact form to actually send messages, integrate a backend endpoint or a service like EmailJS / Formspree and update `script.js` submit handler.
 - To wire the contact form to actually send messages, integrate a backend endpoint or a service like EmailJS / Formspree and update `script.js` submit handler.

EmailJS setup (quick)
1. Create an account at https://www.emailjs.com and log in.
2. Add an email service (e.g., Gmail, Yahoo) in the EmailJS dashboard — you'll get a `service_id`.
3. Create an email template and note the `template_id`. Use template variables that match your form fields (e.g., `from_name`, `from_email`, `message`, `phone`).
4. Get your EmailJS public key (Integration -> API Keys) and replace `YOUR_EMAILJS_PUBLIC_KEY` in `index.html`.
5. Replace `YOUR_SERVICE_ID` and `YOUR_TEMPLATE_ID` in `script.js` with the values from the dashboard.
6. Test the form locally (the README's simple local server command is fine). The form will call `emailjs.sendForm(service_id, template_id, '#contact-form')`.

Notes:
- The project currently loads the EmailJS SDK from `https://cdn.emailjs.com/dist/email.min.js`. If EmailJS updates their CDN, update the script URL accordingly.
- The `script.js` will gracefully warn you if EmailJS is not configured.

New UX features added
- Theme toggle (dark/light) — persists your choice in `localStorage`.
- Typing intro in hero — dynamically types your full name.
- Projects section — (removed upon request) use project placeholders or add a new section later.
- Resume download link — add `resume.pdf` to the project root or change the `href` in `index.html`.

Profile image
-------------
- I've added a placeholder image at `assets/profile.svg` and the hero uses a `picture` element that prefers `assets/profile.jpg`.
- To use your real photo, add your image file named `profile.jpg` into the `assets/` folder (same directory as the placeholder). When you deploy to Vercel the static `assets` folder will be served and your photo will be available at `/assets/profile.jpg`.
- Alternatively, you can replace `assets/profile.svg` with your actual image (same filename) or update the `src`/`srcset` in `index.html` to point to a hosted URL.

Vercel deployment note
----------------------
- Vercel serves static files from the repository root. The `assets/` folder and files inside it will be published automatically when you push your repository to Git and connect it to Vercel.
- After deployment, your profile image will be reachable at `https://<your-deployment-url>/assets/profile.jpg` (or `.svg` if you keep the placeholder).
- Back-to-top floating button for faster navigation.

If you'd like, I can:
- replace project placeholders with real project cards and links
- wire the contact form to EmailJS for you if you provide the `service_id`, `template_id`, and public key
- implement a serverless relay (Netlify/Vercel) for an even more secure contact flow

Tell me which next step you want and I'll implement it.