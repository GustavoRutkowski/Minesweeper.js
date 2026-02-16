// Exemplo de Uso:
// await wait(1000); // Espera 1 segundo

// Como cancelar:
// const waiting = wait(9999999999999999).then();
// waiting.cancel(); // Cancela a espera

function wait(ms) {
    let cancel;
    const promise = new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, ms);
        cancel = () => {
            clearTimeout(timeout);
            reject(new Error('Cancelled'));
        };
    });
    promise.cancel = cancel;
    return promise;
}

export default wait;
