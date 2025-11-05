import { useState, useCallback, useEffect } from "react";
import ChessBoard from "@/components/ChessBoard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { RotateCcw, Home, Trophy, Heart, Undo2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Square = string;
type Position = { row: number; col: number };

const Game = () => {
  const navigate = useNavigate();
  const [knightPosition, setKnightPosition] = useState<Square>("e4");
  const [visitedSquares, setVisitedSquares] = useState<Set<Square>>(new Set(["e4"]));
  const [moveCount, setMoveCount] = useState<number>(0);
  const [possibleMoves, setPossibleMoves] = useState<Square[]>([]);
  const [moveHistory, setMoveHistory] = useState<Square[]>(["e4"]);
  const [backtracksLeft, setBacktracksLeft] = useState<number>(3);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  // Convertir notación de ajedrez a posición
  const squareToPosition = (square: Square): Position => {
    const col = square.charCodeAt(0) - 97; // 'a' = 0, 'b' = 1, etc.
    const row = 8 - parseInt(square[1]);
    return { row, col };
  };

  // Convertir posición a notación de ajedrez
  const positionToSquare = (pos: Position): Square | null => {
    if (pos.row < 0 || pos.row > 7 || pos.col < 0 || pos.col > 7) return null;
    const col = String.fromCharCode(97 + pos.col);
    const row = (8 - pos.row).toString();
    return col + row;
  };

  // Calcular movimientos posibles del caballo
  const calculatePossibleMoves = useCallback((square: Square): Square[] => {
    const pos = squareToPosition(square);
    const knightMoves = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];

    const moves: Square[] = [];
    knightMoves.forEach(([dr, dc]) => {
      const newPos = { row: pos.row + dr, col: pos.col + dc };
      const newSquare = positionToSquare(newPos);
      if (newSquare && !visitedSquares.has(newSquare)) {
        moves.push(newSquare);
      }
    });

    return moves;
  }, [visitedSquares]);

  // Calcular movimientos posibles al iniciar
  useEffect(() => {
    if (gameStarted) {
      setPossibleMoves(calculatePossibleMoves(knightPosition));
    }
  }, [gameStarted, knightPosition, calculatePossibleMoves]);

  const startGame = () => {
    setGameStarted(true);
    const moves = calculatePossibleMoves("e4");
    setPossibleMoves(moves);
    toast.success("¡Juego iniciado! Buena suerte");
  };

  const handleSquareClick = (square: Square) => {
    if (!gameStarted) return;
    
    if (!possibleMoves.includes(square)) {
      toast.error("Movimiento inválido! El caballo solo puede moverse en forma de L");
      return;
    }

    // Actualizar posición y casillas visitadas
    setKnightPosition(square);
    const newVisited = new Set(visitedSquares);
    newVisited.add(square);
    setVisitedSquares(newVisited);
    setMoveCount(moveCount + 1);
    
    // Agregar al historial
    setMoveHistory([...moveHistory, square]);

    // Calcular nuevos movimientos posibles
    const newMoves = calculatePossibleMoves(square);
    setPossibleMoves(newMoves);

    

    // Verificar si ganó
    if (newVisited.size === 64) {
      toast.success("🎉 ¡Felicidades! Has completado el recorrido del caballo!");
      setGameOver(true);
    } else if (newMoves.length === 0 && backtracksLeft === 0) {
      setGameOver(true);
      toast.error("Game Over! No hay más movimientos posibles y sin retrocesos");
    } else if (newMoves.length === 0) {
      toast.warning("⚠️ Sin movimientos! Usa el botón de Retroceder para continuar");
    }
  };

  const handleBacktrack = () => {
    if (moveHistory.length <= 1 || backtracksLeft === 0) return;

    // Quitar el último movimiento
    const newHistory = [...moveHistory];
    newHistory.pop();
    const previousSquare = newHistory[newHistory.length - 1];
    
    // Actualizar estado
    setMoveHistory(newHistory);
    setKnightPosition(previousSquare);
    setVisitedSquares(new Set(newHistory));
    setMoveCount(newHistory.length - 1);
    setBacktracksLeft(backtracksLeft - 1);
    
    // Recalcular movimientos
    const newMoves = calculatePossibleMoves(previousSquare);
    setPossibleMoves(newMoves);
    
    toast.info(`Retroceso usado. Quedan ${backtracksLeft - 1} retrocesos`);
  };

  const resetGame = () => {
    const initialSquare = "e4";
    setKnightPosition(initialSquare);
    setVisitedSquares(new Set([initialSquare]));
    setMoveCount(0);
    setMoveHistory([initialSquare]);
    setBacktracksLeft(3);
    setGameOver(false);
    setGameStarted(false);
    setPossibleMoves([]);
    toast.info("Juego reiniciado");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-2" />
            Inicio
          </Button>
          <h1 className="text-4xl font-bold text-primary">Recorrido del Caballo</h1>
          <div className="w-24" />
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8 max-w-7xl mx-auto">
          <div>
            <ChessBoard
              knightPosition={knightPosition}
              visitedSquares={visitedSquares}
              possibleMoves={possibleMoves}
              onSquareClick={handleSquareClick}
            />
          </div>

          <div className="space-y-6">
            {!gameStarted && (
              <Card className="p-6 shadow-xl bg-primary/5 border-2 border-primary">
                <h2 className="text-2xl font-bold text-primary mb-4">Backtracking</h2>
                <p className="text-foreground mb-6">
                  En este juego, tienes <strong className="text-accent">3 retrocesos</strong> disponibles. 
                  Si te quedas sin movimientos, puedes retroceder para probar otra ruta.
                </p>
                <Button 
                  className="w-full" 
                  onClick={startGame}
                  size="lg"
                >
                  Iniciar Juego
                </Button>
              </Card>
            )}

            {gameStarted && (
              <>
                <Card className="p-6 shadow-xl bg-gradient-to-br from-destructive/10 to-destructive/5 border-2 border-destructive/30">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-primary">Retrocesos</h3>
                    <div className="flex gap-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <Heart 
                          key={i}
                          className={`w-6 h-6 ${i < backtracksLeft ? 'text-destructive fill-destructive' : 'text-muted-foreground/30'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={handleBacktrack}
                    disabled={moveHistory.length <= 1 || backtracksLeft === 0}
                  >
                    <Undo2 className="w-4 h-4 mr-2" />
                    Retroceder ({backtracksLeft} disponibles)
                  </Button>
                </Card>

                <Card className="p-6 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="w-6 h-6 text-accent" />
                    <h2 className="text-2xl font-bold text-primary">Estadísticas</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground">Movimientos</p>
                      <p className="text-3xl font-bold text-primary">{moveCount}</p>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Casillas Visitadas</p>
                      <p className="text-3xl font-bold text-accent">{visitedSquares.size}/64</p>
                      <div className="mt-2 w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(visitedSquares.size / 64) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground">Movimientos Posibles</p>
                      <p className="text-3xl font-bold text-foreground">{possibleMoves.length}</p>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {gameStarted && (
              <>
                <Card className="p-6 shadow-xl">
                  <h3 className="font-semibold mb-3 text-primary">Instrucciones</h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Las casillas <strong className="text-chess-possible">amarillas</strong> muestran movimientos posibles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Las casillas <strong className="text-chess-visited">verdes</strong> ya fueron visitadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Usa los <strong className="text-destructive">retrocesos</strong> si te quedas sin opciones</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>¡Intenta visitar las 64 casillas!</span>
                    </li>
                  </ul>
                </Card>

                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={resetGame}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reiniciar Juego
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={gameOver} onOpenChange={setGameOver}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl text-center">
              {visitedSquares.size === 64 ? "🎉 ¡Victoria!" : "💀 Game Over"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg pt-4">
              {visitedSquares.size === 64 
                ? `¡Felicidades! Completaste el recorrido del caballo en ${moveCount} movimientos.`
                : `El juego ha terminado. Visitaste ${visitedSquares.size} de 64 casillas.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-2 flex-col sm:flex-col">
            <AlertDialogAction onClick={resetGame} className="w-full">
              Jugar de Nuevo
            </AlertDialogAction>
            <Button onClick={() => navigate("/")} variant="outline" className="w-full">
              Volver al Inicio
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Game;
