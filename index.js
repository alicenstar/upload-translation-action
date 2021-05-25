const uploadFiles = async () => {
    const auth = await fetch(`https://jsonplaceholder.typicode.com/todos/1`)
        .then(response => response.json());
    console.log(`Twilio Signal 2021 ${(new Date()).toTimeString()}`, "date time test");
    console.log(`${auth.id} ${auth.title`, "access token test");
    console.log(process.env.SDL_OPTIONS_ID, "options id environment variable test");
};

uploadFiles();
