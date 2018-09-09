function shake (input) {
    let result = [];
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    // each column
    for (let i = 0; i < input; i++) {
        let semiResult = [];

        // each row
        for (let c = 0; c < input; c++) {
            let fate = Math.floor(Math.random() * 26);
            semiResult.push(alphabet[fate]);
        }
        result.push(semiResult);
    }

    console.log(result);
}

shake(4);