const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="mx-auto max-w-4xl flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-muted-foreground">
          QuadControl — A course by{" "}
          <a
            href="https://www.insper.edu.br/pt/docentes/fabio-bobrow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Prof. Fabio Bobrow
          </a>{" "}
          at{" "}
          <a
            href="https://www.insper.edu.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Insper
          </a>
        </p>
        <a
          href="https://quadcontrol.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          quadcontrol.io
        </a>
      </div>
    </footer>
  );
};

export default Footer;
