# SuperAwesome Vue.js API Boilerplate

Boilerplate/Starter project for building [SuperAwesome API](https://doc.superawesome.tv/sa-kws-docs/latest/getting-started.html) using [Vue.js](https://vuejs.org/) and [Parcel](https://parceljs.org/)

> I'm using as example the configuration for the platform I'm testing at [Bright Little Labs](https://brightlittlelabs.org/)

## SuperAwesome set-up

Once you have access to the dashboard

1. Select your app or [create an app](https://kwsguides.superawesome.com/implement)
2. Go to Integration
3. Switch ON the `Implicit flow`
4. Add your `OAuth redirect URLs`. In my case `localhost` for local testing and `firebase` for production. **Remember** the OAuth URL has to be `https`.
5. Take the configuration settings and add them to `.env` and `.env.production` files
6. Set the [display name feature](https://kwsguides.superawesome.com/get-started/2-brand-your-app#h.p_LBEhs3BYNgc0) otherwise you can't create an account

> **Important.** Replace `account` for `sso` on SSO URL, otherwise you can't create an account or login.

Example:

```sh
VUE_APP_CLIENT_ID=test-app
VUE_APP_API_HOST=https://bright-little-labs-a9d1fe26.api.kws.superawesome.tv
VUE_APP_SSO=https://bright-little-labs-a9d1fe26.sso.kws.superawesome.tv
VUE_APP_LANGUAGE=en
VUE_APP_CALLBACK_HOST=https://localhost:1234
```

I'm using the prefix `VUE_APP` in case you want use [Vue CLI](https://cli.vuejs.org/) instead of [Parcel](https://parceljs.org/)

## Register

Go to the following link and create a user with the form

```sh
{{API_HOST}}/{{LANGUAGE}}/register?clientId={{CLIENT_ID}}&redirectUri={{CALLBACK_HOST}}
```

| parameter       | description                               |
| --------------- | ----------------------------------------- |
| `API_HOST`      | the API host from the Integration section |
| `LANGUAGE`      | by default english: `en`                  |
| `CLIENT_ID`     | the client ID from Integration            |
| `CALLBACK_HOST` | the redirection added on Integration      |

Example:

`https://bright-little-labs-a9d1fe26.sso.kws.superawesome.tv/en/register?clientId=test-app&redirectUri=http//localhost:1234`

## Test Login with CURL/Postman/Others

```
curl -X POST \
  {{API_HOST}}/oauth/token \
 -H 'Content-Type: application/x-www-form-urlencoded' \
 -H 'Authorization: Basic c3VwZXJhd2Vzb21lY2x1YjpzdXBlcmF3ZXNvbWVjbHVi' \
 -H 'Accept: application/json' \
 -d 'grant_type=password&username={{USERNAME}}&password={{PASSWORD}}'
```

| parameter  | description                        |
| ---------- | ---------------------------------- |
| `API_HOST` | the API host from Integration      |
| `USERNAME` | username used on the register form |
| `PASSWORD` | password used on the register form |

Example:

```
curl -X POST \
 https://bright-little-labs-a9d1fe26.api.kws.superawesome.tv/oauth/token \
 -H 'Content-Type: application/x-www-form-urlencoded' \
 -H 'Authorization: Basic c3VwZXJhd2Vzb21lY2x1YjpzdXBlcmF3ZXNvbWVjbHVi' \
 -H 'Accept: application/json' \
 -d 'grant_type=password&username={{USERNAME}}&password={{PASSWORD}}'
```

> The value for the Authorization header is `superawesome:superawesome` encrypted in base 64.

## SuperAwesome API

If you want learn how to use SuperAwesome API [go to their documentation](https://doc.superawesome.tv/sa-kws-docs/latest/api-spec.html#introduction)

## Contribuiting

Pull requests are welcome!
