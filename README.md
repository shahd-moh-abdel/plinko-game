# Plinko Score Challenge

A browser-based Plinko-style game built with p5.js and Matter.js physics engine. Players drop balls through a field of pegs to score points in bins with different values.

## 🎮 Game Features

- Physics-based ball movement and collisions
- Interactive ball dropping mechanism
- Score multipliers ranging from 50 to 5000 points
- Sound effects and background music
- Visual feedback for ball-peg collisions
- Real-time score tracking

## 🛠️ Technical Details

### Dependencies

- p5.js (for rendering and input handling)
- Matter.js (for physics simulation)
- p5.sound (for audio playback)

### Game Constants

- Ball Radius: 10px
- Peg Radius: 8px
- Bin Width: 60px
- Grid Rows: 8
- Peg Spacing: 60px

### Scoring System

Bins are arranged at the bottom with the following point values:

```
50 - 100 - 500 - 1000 - 5000 - 1000 - 500 - 100 - 50
```

## 🎯 How to Play

1. Click anywhere on the game screen to drop a ball
2. Watch as the ball bounces through the pegs
3. Score points based on which bin the ball lands in
4. Try to aim for the high-value center bins!

## 🎨 Customization

The game can be customized by modifying these constants:

- `BALL_RADIUS`: Changes the size of the dropped balls
- `PEG_RADIUS`: Adjusts the size of the pegs
- `BIN_WIDTH`: Modifies the width of scoring bins
- `ROWS`: Changes the number of peg rows
- `SPACING`: Adjusts the distance between pegs

Color scheme:

- Background: `#f5e7ca`
- Pegs: `#2e2108`
- Balls: `#28a499`
- Bins: Alternating `#f7865c` and `#f16e3a`

## 🔧 Physics Configuration

- Gravity: 0.6 (reduced from default 1.0)
- Ball Properties:
  - Restitution: 0.8
  - Friction: 0.5
  - Density: 0.1

## 🤝 Contributing

Feel free to fork this project and submit pull requests for:

- New features
- Bug fixes
- Performance improvements
- Additional sound effects or visual feedback
- UI/UX enhancements
