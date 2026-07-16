# SugCar pitch

A small, keyboard-navigable web deck for introducing SugCar as a personal health-product project during an interview.

## Run locally

```bash
npm test
python3 -m http.server 4173
```

Open `http://localhost:4173`. Use the arrow keys, Space, Home, End, or the visible controls to navigate.

## Media

`assets/sugcar-login-mock.png` is an authentic iOS Simulator capture of the mock-only sign-in screen. It contains no personal credentials or readings. Replace it with a mock-mode dashboard screenshot or a short demo video before the interview if desired.

## Deploy

Push to `main`. In repository settings, choose **Pages → Build and deployment → Deploy from a branch → main / (root)**. GitHub Pages then serves this dependency-free static site directly.

## Accuracy commitments

The copy deliberately describes SugCar as a secondary visualization utility. It does not claim a native CarPlay UI, clinical advice, medical-device status, or a no-local-storage design.
