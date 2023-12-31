export class CustomException extends Error {
  /**
   * @param {{status: number, msg: string}} error
   */
  constructor(error) {
    super();

    Object.assign(this, error);
  }
}
