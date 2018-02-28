#  bss-rct-build-release

## Requirements
```
- node v7.x+
- npm 4.x+
- react-native-cli: 2.0.1
- react-native: 0.50.4
- OS: MACOS
```

## Usage

- Clone source
- Copy 'Script' to project
- Update gitignore of project
```
  ios-config.json
  Script/**/*.apk
  Script/**/*.ipa
  Script/**/*.plist
```
- Install dependencies
```
  "express": "^4.16.2",
  "open": "0.0.5",
  "request": "^2.83.0"
```
- Add script to project's package.json
```
  "ios-version": "./Script/src/ios-version.sh",
  "ios-release": "./Script/src/ios-release.sh && node ./Script/server/index.js",
  "android-release": "./Script/src/android-release.sh && node ./Script/server/index.js"
```
- Copy `Script/src/ios-config-example.json` to `Script/src/ios-config.json`
- Update config ios build in `Script/src/ios-config.json`. Don't change BUILD_HOST if you want to host on your local. Manifest generated with ipa url like: ${BUILD_HOST}/dist/ios/IOS.ipa and apk: ${BUILD_HOST}/dist/android/ANDROID.apk

## Process build
For iOS
```
  npm run ios-release
```
For Android
```
  npm run android-release
```

## Custom config file in CI (Jenkins)
Execute shell script below to update new config before process
```
#!/bin/bash
cat <<EOF > Script/src/ios-config.json
{
    "BUILD_ENVIRONMENT":"staging",
    "NEED_RESET_CACHE":false,
    "BUNDLE_ID":"com.app.apptest",
    "DEVELOPMENT_TEAM":"xxxxxxxxxx",
    "PROVISIONING_PROFILE_NAME":"Provision Profile Name",
    "CODE_SIGN_IDENTITY":"iPhone Developer: Nhan Cao (xxxxxxxxxx)",
    "BUILD_HOST":"IPA_HOST"
}
EOF
```

## Screenshot
Screenshot after build success
![Preview](screenshot.jpg)