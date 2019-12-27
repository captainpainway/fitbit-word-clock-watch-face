Fitbit word clock watch face

[Creating a Fitbit watch face](https://maryknize.com/blog/creating-a-fitbit-watch-face)

You should be able to build with these steps:
```
git clone https://github.com/captainpainway/fitbit-word-clock-watch-face.git
cd fitbit-word-clock-watch-face
npm add --dev @fitbit/sdk
npm add --dev @fitbit/sdk-cli
npx fitbit-build generate-appid
npx fitbit-build
```

This is still a v1 of this project. Eventually I'm going to add some more options and colors.
