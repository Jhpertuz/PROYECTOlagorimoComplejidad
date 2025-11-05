const KnightIcon = () => (
  <svg viewBox="0 0 45 45" className="w-8 h-8">
    <g fill="currentColor" fillRule="evenodd" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" style={{ fill: 'currentColor', stroke: 'currentColor' }} />
      <path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" style={{ fill: 'currentColor', stroke: 'currentColor' }} />
      <path d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z" style={{ fill: 'white', stroke: 'white' }} />
      <path d="M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 z" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)" style={{ fill: 'white', stroke: 'white' }} />
    </g>
  </svg>
);

interface ChessBoardProps {
  knightPosition: string;
  visitedSquares: Set<string>;
  possibleMoves: string[];
  onSquareClick: (square: string) => void;
}

const ChessBoard = ({ knightPosition, visitedSquares, possibleMoves, onSquareClick }: ChessBoardProps) => {
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

  const getSquareColor = (file: string, rank: string): string => {
    const fileIndex = files.indexOf(file);
    const rankIndex = ranks.indexOf(rank);
    return (fileIndex + rankIndex) % 2 === 0 ? 'chess-dark' : 'chess-light';
  };

  const getSquareState = (square: string): string => {
    if (square === knightPosition) return 'current';
    if (possibleMoves.includes(square)) return 'possible';
    if (visitedSquares.has(square)) return 'visited';
    return 'empty';
  };

  const getSquareClasses = (square: string, baseColor: string): string => {
    const state = getSquareState(square);
    const base = `aspect-square flex items-center justify-center cursor-pointer transition-all duration-200`;
    
    switch (state) {
      case 'current':
        return `${base} bg-accent shadow-lg scale-105 z-10`;
      case 'possible':
        return `${base} bg-${baseColor} hover:bg-chess-possible hover:scale-105 ring-2 ring-accent ring-inset`;
      case 'visited':
        return `${base} bg-chess-visited opacity-70`;
      default:
        return `${base} bg-${baseColor}`;
    }
  };

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <div className="bg-card p-4 rounded-lg shadow-2xl">
        {/* Rank labels (left) */}
        <div className="grid grid-cols-[auto_1fr_auto] gap-2">
          <div className="flex flex-col justify-around text-sm font-semibold text-muted-foreground pr-2">
            {ranks.map(rank => (
              <div key={rank} className="aspect-square flex items-center justify-center">
                {rank}
              </div>
            ))}
          </div>

          {/* Board */}
          <div className="grid grid-cols-8 gap-0 border-4 border-primary rounded-lg overflow-hidden">
            {ranks.map(rank =>
              files.map(file => {
                const square = `${file}${rank}`;
                const baseColor = getSquareColor(file, rank);
                const state = getSquareState(square);

                return (
                  <div
                    key={square}
                    onClick={() => onSquareClick(square)}
                    className={getSquareClasses(square, baseColor)}
                  >
                    {state === 'current' && (
                      <KnightIcon />
                    )}
                    {state === 'possible' && (
                      <div className="w-4 h-4 rounded-full bg-accent opacity-60" />
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Right padding */}
          <div className="w-8" />
        </div>

        {/* File labels (bottom) */}
        <div className="grid grid-cols-[auto_1fr_auto] gap-2 mt-2">
          <div className="w-8" />
          <div className="grid grid-cols-8 gap-0">
            {files.map(file => (
              <div
                key={file}
                className="aspect-square flex items-center justify-center text-sm font-semibold text-muted-foreground"
              >
                {file}
              </div>
            ))}
          </div>
          <div className="w-8" />
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
