import { AppError } from "./AppError.js";

export class ValidationError extends AppError {
  constructor(message = "Error de validación en los datos") {
    super(message, 400);
  }
}
