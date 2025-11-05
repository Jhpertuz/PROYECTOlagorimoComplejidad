import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [nombres, setNombres] = useState("Jesus David Lorett Macias\nMatteo Benitez\nJorge Hernandez");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4">
              Recorrido del Caballo
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-4">
              Aprende sobre Backtracking de forma interactiva
            </p>
          </div>

          <Card className="p-4 sm:p-6 lg:p-8 shadow-2xl bg-card border-2 border-primary/20 mb-6 sm:mb-8 animate-fade-in hover-scale">
            <div className="space-y-3 sm:space-y-4">
              <Label htmlFor="nombres" className="text-base sm:text-lg font-semibold text-primary block">
                Integrantes del equipo
              </Label>
              <div className="bg-background/50 p-3 sm:p-4 rounded-lg border border-primary/10">
                <div className="space-y-2 text-sm sm:text-base text-foreground">
                  {nombres.split('\n').map((nombre, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <p className="leading-relaxed">{nombre}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 lg:p-8 shadow-2xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 animate-fade-in hover-scale">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-accent flex-shrink-0 sm:mt-1" />
              <div className="w-full">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">
                  ¿Qué es Backtracking?
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-foreground leading-relaxed">
                  El backtracking es una técnica para resolver problemas de forma recursiva, 
                  basada en prueba y error. Consiste en ir construyendo una posible solución 
                  paso a paso, y si en algún momento se detecta que el camino tomado no lleva 
                  a la solución deseada, se retrocede (o "da un paso atrás") para probar otra 
                  alternativa.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 lg:p-8 shadow-2xl bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/20 animate-fade-in hover-scale">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">
              Problema Planteado
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-foreground leading-relaxed mb-4">
              Mover un caballo de ajedrez por el tablero de forma que visite cada celda 
              exactamente una vez.
            </p>
            <div className="bg-background/50 p-4 sm:p-6 rounded-lg border border-primary/10">
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                <strong className="text-primary">Backtracking:</strong> Se prueban los 
                movimientos posibles desde la posición actual, se retrocede si se queda 
                sin opciones válidas.
              </p>
            </div>
          </Card>

          <div className="flex justify-center pt-6 sm:pt-8 pb-4">
            <Button 
              size="lg"
              onClick={() => navigate("/tutorial")}
              className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
            >
              Siguiente
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
