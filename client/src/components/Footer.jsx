function Footer() {
    const newDate = new Date();
    const year = newDate.getFullYear();
    return (
      <footer className="h-[10vh] py-5 flex items-center justify-center text-white bg-cyan-950">
        <section className="text-lg">
          VotersChain Copyright {year} | All rights reserved
        </section>
      </footer>
    );
  }
  
  export default Footer;