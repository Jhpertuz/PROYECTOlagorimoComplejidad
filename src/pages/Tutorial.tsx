import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Play, Lightbulb, Zap } from "lucide-react";
import WarnsdorffDemo from "@/components/WarnsdorffDemo";

const Tutorial = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-2" />
            Inicio
          </Button>
          <h1 className="text-4xl font-bold text-primary">Heurísticas</h1>
          <div className="w-24" />
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          <Card className="p-8 shadow-2xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
            <div className="flex items-start gap-4 mb-6">
              <Lightbulb className="w-10 h-10 text-accent flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">
                  ¿Qué es una Heurística?
                </h2>
                <p className="text-lg text-foreground leading-relaxed">
                  Una heurística es una estrategia cognitiva que un individuo pone en 
                  práctica para solucionar un problema complejo, como tomar una decisión 
                  o formarse un juicio. Las heurísticas permiten a los individuos reducir 
                  el tiempo y el esfuerzo necesarios para resolver un problema.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-8 shadow-2xl bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/20">
            <div className="flex items-start gap-4 mb-6">
              <Zap className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Heurística de Warnsdorff
                </h2>
                <p className="text-lg text-foreground leading-relaxed mb-4">
                  Es una regla para resolver el problema del recorrido del caballo, que 
                  establece que este debe moverse siempre a una casilla de ajedrez con el 
                  menor número de movimientos posibles hacia adelante.
                </p>
                <div className="bg-background/50 p-6 rounded-lg border border-primary/10 space-y-3">
                  <p className="text-foreground">
                    <strong className="text-primary">Estrategia:</strong> Prioriza las 
                    casillas con menos opciones de avance, lo que ayuda a evitar callejones 
                    sin salida.
                  </p>
                  <p className="text-foreground">
                    <strong className="text-accent">Ventaja:</strong> Aumenta la probabilidad 
                    de completar el recorrido en menos pasos, ya que intenta llenar primero 
                    las casillas de los bordes, que son las más difíciles de alcanzar.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 shadow-2xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 mt-8">
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">
              Demostración Visual de Warnsdorff
            </h3>
            <WarnsdorffDemo />
          </Card>

          <div className="flex justify-center pt-8">
            <Button 
              size="lg"
              onClick={() => navigate("/game")}
              className="text-lg px-8 py-6"
            >
              <Play className="w-5 h-5 mr-2" />
              Juega Ahora
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
