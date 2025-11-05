\*\*Integrantes:\*\* Jesus David Lorett Macias, Matteo Benitez, Jorge Hernandez

\*\*Profesor:\*\* Carlos Cortez



\# 🐴 Caballo de Ajedrez – Aplicación Interactiva



Este aplicativo muestra el recorrido del \*\*caballo de ajedrez\*\* sobre un tablero tipo 8×8.

El objetivo es marcar las casillas que el caballo va visitando, mostrando de forma visual cuáles movimientos son posibles desde cada posición.



El sistema está dividido en dos secciones:



\* `/` → Presentación del proyecto y sus integrantes.

\* `/home` → Aplicación interactiva con el tablero y el caballo en movimiento.



El tablero se renderiza usando una librería de React especializada para ajedrez, y el estado va registrando cada casilla visitada para resaltarla visualmente.



\## 🧠 Funcionamiento General



1\. Se dibuja un tablero 8×8.

2\. El caballo comienza en una posición inicial.

3\. Se calculan los \*\*movimientos válidos\*\* dependiendo de la posición (no siempre serán 8; en esquinas, solo 2).

4\. Cada vez que el jugador mueve el caballo:



&nbsp;  \* Se marca la casilla como \*\*visitada\*\*.

&nbsp;  \* Se actualizan las nuevas casillas disponibles para mover.



No se usa backtracking automático — el usuario decide el recorrido paso a paso.



---



\## ⚙️ Requisitos Previos



Necesitas tener instalado:



\* \*\*Node.js\*\* (Recomendado: versión 18 o superior)



Comprobar instalación:



```bash

node -v

```



---



\## 📦 Instalación



```bash

npm install

```



---



\## 🚀 Ejecutar la Aplicación



```bash

npm run dev

```



Luego abrir:



```

http://localhost:3000

```



---



\## ✅ Navegación



\* `/` → Presentación

\* `/home` → Juego del caballo



---



\*\*Autor:\*\* Jesus David Lorett Macias, Matteo Benitez, Jorge Hernandez



\*\*Profesor:\*\* Carlos Cortez



