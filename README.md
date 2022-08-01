# fullStack
based on https://youtu.be/GQ_pTmcXNrQ


# setup
```
npm i
```


# configuration
```
.
├── app
│   └── *config.js
└── <...>
```

## config derictory:

#### config.js
```node
export default {
    db: {
        url: 'mongodb://<user>:<password>@<addr>:<port>/<collection>'
    },
    jwtToken: <jwt token>
}
```
