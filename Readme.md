This is a test page to help verify behaviour around the
[encrypted-media-encryption-scheme](https://github.com/WICG/encrypted-media-encryption-scheme/blob/master/explainer.md)
draft spec.

## Enabling encrypted-media-encryption-scheme

### Firefox

This feature landed in Firefox 69 as part of
[bug 1536102](https://bugzilla.mozilla.org/show_bug.cgi?id=1536102).

To enable:
- In Firefox, navigate to about:config.
- Search for `media.eme.encrypted-media-encryption-scheme.enabled`.
- Ensure that pref is set to to `true`.

### Chrome

enable-blink-features",
        "EncryptedMediaEncryptionSchemeQuery,"

Chrome's
[tracking bug](https://bugs.chromium.org/p/chromium/issues/detail?id=838416)
for this feature is hidden as of writing.

To enable:
- Start Chrome with the
`--enable-blink-features=EncryptedMediaEncryptionSchemeQuery` flag. E.g.
`chrome --enable-blink-features=EncryptedMediaEncryptionSchemeQuery`. Ensure
running instances of Chrome are shutdown in order to start a fresh one with
the feature enabled.
