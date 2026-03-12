# [gauth-export](https://kiehnek.github.io/gauth-export/)

Transform Google Authenticator Migration QR Codes to plain otpauth URIs.

## Usage

Navigate to Menu > Transfer accounts > Export accounts.
Make a screenshot and upload it to this website.
Google Authenticator exports up to 10 accounts per QR code, so scan each QR if you exported more than 10.

If the QR Code doesn't work for you, try scanning it with another app and enter the otpauth-migration URI manually.

**All data stays on your PC, everything is computed locally!**

## Related

- [Go CLI](https://github.com/dim13/otpauth)
- [Aegis PR with this functionality](https://github.com/beemdevelopment/Aegis/pull/406/files)
- [Help Request in gAuth-android](https://github.com/google/google-authenticator-android/issues/118)
- [Blog Post by Alexander Bakker](https://alexbakker.me/post/parsing-google-auth-export-qr-code.html)

## License

Copyright (c) 2021 korki / [MIT License](./LICENSE)
