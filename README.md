# MATEMAGIA

MATEMAGIA es un juego matemático web para practicar sumas, restas, multiplicaciones y divisiones exactas mediante retos rápidos con temática mágica.

## Funciones habilitadas

- Selección de operación: suma, resta, multiplicación, división exacta o reto mixto.
- Selección de dificultad: Aprendiz, Hechicero o Archimago.
- Partidas de 5, 10 o 15 preguntas.
- Validación inmediata de respuestas.
- Racha de aciertos, barra de progreso, puntuación final, porcentaje y estrellas.
- Diseño responsive y accesible con etiquetas visibles y mensajes de estado.

## Desarrollo local

```bash
npm run dev
```

## Scripts

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción en `dist/`.
- `npm run test`: ejecuta las pruebas unitarias.
- `npm run lint`: valida reglas de código.

## Estructura

```txt
src/
├── main.js              # Interfaz y flujo principal del juego
├── game/mathGame.js     # Motor de generación y evaluación matemática
├── game/mathGame.test.js
└── styles.css
```
