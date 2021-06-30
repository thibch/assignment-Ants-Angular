export class AuthService {

  isAuth = false;

  /**
   * Not really usefull but add a wait of x milliseconds when calling the signIn
   */
  signIn() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            resolve(true);
          }, 500
        );
      }
    );
  }

  signOut() {
    this.isAuth = false;
  }
}
