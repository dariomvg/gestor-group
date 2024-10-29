export const generatePassword = () =>  {
    const symbols: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password: string = '';
  
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * symbols.length);
      password += symbols[randomIndex];
    }

    return password;
}