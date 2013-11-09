Translate command for Tennu.

Uses the Google Translation service to translate IRC as your request.

## Config ##

```javascript
{
    // rest of tennu config

    "translate": {
        "api-key": "your google translate api key",
        "from-language": "default language to assume for !translateto"
        "to-language": "default langauge to translate to for !translatefrom"
        "error-message": "Translation failed."
        }
    }
}
```