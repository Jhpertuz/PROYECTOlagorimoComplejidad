import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, Zap } from "lucide-react";

const KnightIcon = () => (
  <svg viewBox="0 0 45 45" className="w-8 h-8">
    <g fill="currentColor" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" fill="currentColor" />
      <path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" fill="currentColor" />
      <path d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z" fill="#fff" />
      <path d="M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 z" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)" fill="#fff" />
    </g>
  </svg>
);

type DemoPhase = 'initial' | 'filling' | 'filled' | 'touring';

const WarnsdorffDemo = () => {
  const [phase, setPhase] = useState<DemoPhase>('initial');
  const [accessibility, setAccessibility] = useState<Record<string, number>>({});
  const [currentFillSquare, setCurrentFillSquare] = useState<string>('');
  const [knightPosition, setKnightPosition] = useState<string>('a1');
  const [visitedSquares, setVisitedSquares] = useState<Set<string>>(new Set(['a1']));
  const [tourPath, setTourPath] = useState<string[]>(['a1']);

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const getKnightMoves = (square: string): string[] => {
    const file = square.charCodeAt(0) - 97;
    const rank = parseInt(square[1]) - 1;
    
    const moves = [
      [2, 1], [2, -1], [-2, 1], [-2, -1],
      [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    return moves
      .map(([df, dr]) => {
        const newFile = file + df;
        const newRank = rank + dr;
        if (newFile >= 0 && newFile < 8 && newRank >= 0 && newRank < 8) {
          return String.fromCharCode(97 + newFile) + (newRank + 1);
        }
        return null;
      })
      .filter((move): move is string => move !== null);
  };

  const calculateAccessibility = () => {
    const acc: Record<string, number> = {};
    files.forEach(file => {
      ranks.forEach(rank => {
        const square = file + rank;
        const moves = getKnightMoves(square);
        acc[square] = moves.length;
      });
    });
    return acc;
  };

  const startFilling = async () => {
    setPhase('filling');
    const acc = calculateAccessibility();
    const allSquares = files.flatMap(file => ranks.map(rank => file + rank));
    
    for (let i = 0; i < allSquares.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setCurrentFillSquare(allSquares[i]);
      setAccessibility(prev => ({ ...prev, [allSquares[i]]: acc[allSquares[i]] }));
    }
    
    setCurrentFillSquare('');
    setPhase('filled');
  };

  const startTour = async () => {
    setPhase('touring');
    let current = 'a1';
    const visited = new Set<string>([current]);
    const path = [current];
    
    while (visited.size < 64) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const possibleMoves = getKnightMoves(current).filter(move => !visited.has(move));
      
      if (possibleMoves.length === 0) break;
      
      // Warnsdorff: elegir la casilla con menos movimientos futuros
      let bestMove = possibleMoves[0];
      let minAccessibility = getKnightMoves(bestMove).filter(m => !visited.has(m) && m !== bestMove).length;
      
      for (const move of possibleMoves) {
        const futureAccessibility = getKnightMoves(move).filter(m => !visited.has(m) && m !== move).length;
        if (futureAccessibility < minAccessibility) {
          minAccessibility = futureAccessibility;
          bestMove = move;
        }
      }
      
      current = bestMove;
      visited.add(current);
      path.push(current);
      
      setKnightPosition(current);
      setVisitedSquares(new Set(visited));
      setTourPath([...path]);
    }
  };

  const reset = () => {
    setPhase('initial');
    setAccessibility({});
    setCurrentFillSquare('');
    setKnightPosition('a1');
    setVisitedSquares(new Set(['a1']));
    setTourPath(['a1']);
  };

  const getSquareColor = (file: string, rank: string) => {
    const fileIndex = files.indexOf(file);
    const rankIndex = ranks.indexOf(rank);
    return (fileIndex + rankIndex) % 2 === 0 ? 'bg-[hsl(var(--chess-light))]' : 'bg-[hsl(var(--chess-dark))]';
  };

  const getSquareContent = (square: string) => {
    if (phase === 'initial') return null;
    
    if (phase === 'filling' || phase === 'filled') {
      const isCurrentFill = currentFillSquare === square;
      const acc = accessibility[square];
      
      return (
        <div className={`text-2xl font-bold ${isCurrentFill ? 'text-accent animate-scale-in' : 'text-primary/70'}`}>
          {acc !== undefined ? acc : ''}
        </div>
      );
    }
    
    if (phase === 'touring') {
      const isKnight = knightPosition === square;
      const isVisited = visitedSquares.has(square);
      
      if (isKnight) {
        return <KnightIcon />;
      }
      
      if (isVisited) {
        const moveNumber = tourPath.indexOf(square) + 1;
        return <div className="text-xs font-bold text-primary/50">{moveNumber}</div>;
      }
    }
    
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-4 flex-wrap">
        {phase === 'initial' && (
          <Button onClick={startFilling} size="lg">
            <Zap className="w-4 h-4 mr-2" />
            Calcular Accesibilidad
          </Button>
        )}
        
        {phase === 'filled' && (
          <Button onClick={startTour} size="lg">
            <Play className="w-4 h-4 mr-2" />
            Iniciar Recorrido
          </Button>
        )}
        
        {(phase === 'filling' || phase === 'filled' || phase === 'touring') && (
          <Button onClick={reset} variant="outline" size="lg">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reiniciar
          </Button>
        )}
      </div>

      <div className="flex justify-center">
        <div className="inline-block bg-background/50 p-4 rounded-lg border-2 border-primary/20">
          <div className="grid grid-cols-8 gap-0 border-2 border-primary/30">
            {ranks.map((rank) => (
              files.map((file) => {
                const square = file + rank;
                return (
                  <div
                    key={square}
                    className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center ${getSquareColor(file, rank)} transition-all`}
                  >
                    {getSquareContent(square)}
                  </div>
                );
              })
            ))}
          </div>
        </div>
      </div>

      {phase === 'filling' && (
        <p className="text-center text-foreground/80">
          Calculando cuántos movimientos posibles tiene el caballo desde cada casilla...
        </p>
      )}
      
      {phase === 'filled' && (
        <p className="text-center text-foreground/80">
          Los números muestran cuántos movimientos tiene el caballo desde cada casilla. 
          Warnsdorff elige siempre la casilla con el número más bajo.
        </p>
      )}
      
      {phase === 'touring' && (
        <p className="text-center text-foreground/80">
          El caballo se mueve siempre a la casilla con menos opciones futuras.
          Visitadas: {visitedSquares.size}/64
        </p>
      )}
    </div>
  );
};

export default WarnsdorffDemo;
