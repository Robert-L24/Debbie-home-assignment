## Prerequisites:
- npm
- Android emulator
- EAS account

## Clone repo:
```bash
git clone https://github.com/Robert-L24/Debbie-home-assignment.git
```

## Start Server:
```bash
cd ./server
npm install
npm run start
```

Make sure Android emulator is open.

## Start app (in a new terminal):
```bash
cd ./MyApp
npm install
eas build -p android --profile development
npx expo start --android # (or --web)
adb reverse tcp:3000 tcp:3000 # (if on Android)
```
