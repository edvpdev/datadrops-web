export default function Footer() {
  return (
    <footer className="footer footer-center p-4 text-base-content border-y border-gray-200 bg-white/20 backdrop-blur">
      <div>
        <p>© {new Date().getFullYear()} Datadrops.io</p>
      </div>
    </footer>
  );
}
