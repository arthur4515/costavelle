import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="pt-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">404</p>
      <h1 className="font-heading text-4xl sm:text-5xl font-light mb-4">Página não encontrada</h1>
      <p className="font-body text-sm text-muted-foreground mb-8">O endereço acessado não existe.</p>
      <Link to="/" className="bg-foreground text-background font-body text-xs tracking-widest uppercase px-8 py-4">Voltar ao Início</Link>
    </div>
  );
}
