const uploadFiles = async () => {
    // hit auth endpoint and get access token
    const auth = await fetch(`https://languagecloud.sdl.com/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: {
            grant_type: 'password',
            client_id: `${process.env.SDL_CLIENT_ID}`,
            client_secret: `${process.env.SDL_SECRET}`,
            username: `${process.env.SDL_USERNAME}`,
            password: `${process.env.SDL_PASSWORD}`,
        }
    })
    .then(response => response.json());
    const accessToken = `${auth.token_type} ${auth.access_token}`;

    // read from en.json file, upload file, create project
    fs.readFile('./locals/en.json', (err, jsonString) => {
        if (err) {
            throw err;
        }
        
        fetch(`https://languagecloud.sdl.com/files/${process.env.SDL_OPTIONS_ID}`, {
            method: 'POST',
            headers: {
                'Authorization': `${accessToken}`,
                'Content-Type': 'text/json'
            },
            body: {
                file: jsonString
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.isTranslatable) {
                // create project
                await fetch(`https://languagecloud.sdl.com/projects`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        'Name': `Twilio Signal 2021 ${(new Date()).toTimeString()}`,
                        'ProjectOptionsId': `${process.env.SDL_OPTIONS_ID}`,
                        'SrcLang': 'EN-US'
                    }
                });
            } else {
                throw new Error("File is not translatable");
            }
        })
        .catch(error => console.error(error));
    });    
};

uploadFiles();